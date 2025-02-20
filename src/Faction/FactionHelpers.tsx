import { StaticAugmentations } from "../Augmentation/StaticAugmentations";
import { Augmentation } from "../Augmentation/Augmentation";
import { PlayerOwnedAugmentation } from "../Augmentation/PlayerOwnedAugmentation";
import { AugmentationNames } from "../Augmentation/data/AugmentationNames";
import { BitNodeMultipliers } from "../BitNode/BitNodeMultipliers";

import { Faction } from "./Faction";
import { Factions } from "./Factions";
import { Player } from "@player";
import { Settings } from "../Settings/Settings";
import {
  getHackingWorkRepGain,
  getFactionSecurityWorkRepGain,
  getFactionFieldWorkRepGain,
} from "../PersonObjects/formulas/reputation";

import { dialogBoxCreate } from "../ui/React/DialogBox";
import { InvitationEvent } from "./ui/InvitationModal";
import { FactionNames } from "./data/FactionNames";
import { SFC32RNG } from "../Casino/RNG";
import { isFactionWork } from "../Work/FactionWork";

export function inviteToFaction(faction: Faction): void {
  Player.receiveInvite(faction.name);
  faction.alreadyInvited = true;
  if (!Settings.SuppressFactionInvites) {
    InvitationEvent.emit(faction);
  }
}

export function joinFaction(faction: Faction): void {
  if (faction.isMember) return;
  faction.isMember = true;
  Player.factions.push(faction.name);
  const allFactions = Object.values(FactionNames).map((faction) => faction as string);
  Player.factions.sort((a, b) => allFactions.indexOf(a) - allFactions.indexOf(b));
  const factionInfo = faction.getInfo();

  //Determine what factions you are banned from now that you have joined this faction
  for (const enemy of factionInfo.enemies) {
    if (Factions[enemy]) Factions[enemy].isBanned = true;
  }
  for (let i = 0; i < Player.factionInvitations.length; ++i) {
    if (Player.factionInvitations[i] == faction.name || Factions[Player.factionInvitations[i]].isBanned) {
      Player.factionInvitations.splice(i, 1);
      i--;
    }
  }
}

//Returns a boolean indicating whether the player has the prerequisites for the
//specified Augmentation
export function hasAugmentationPrereqs(aug: Augmentation): boolean {
  return aug.prereqs.every((aug) => Player.hasAugmentation(aug));
}

export function purchaseAugmentation(aug: Augmentation, fac: Faction, sing = false): string {
  const hasPrereqs = hasAugmentationPrereqs(aug);
  const augCosts = aug.getCost();
  if (!hasPrereqs) {
    const txt = `Vous devez d'abord acheter ou installer ${aug.prereqs
        .filter((req) => !Player.hasAugmentation(req))
        .join(",")} avant de pouvoir acheter celui-ci.`;
    if (sing) {
      return txt;
    } else {
      dialogBoxCreate(txt);
    }
  } else if (augCosts.moneyCost !== 0 && Player.money < augCosts.moneyCost) {
    const txt = "Vous n'avez pas assez d'argent pour acheter " + aug.name;
    if (sing) {
      return txt;
    }
    dialogBoxCreate(txt);
  } else if (fac.playerReputation < augCosts.repCost) {
    const txt = "Vous n'avez pas une réputation de faction suffisante pour acheter " + aug.name;
    if (sing) {
      return txt;
    }
    dialogBoxCreate(txt);
  } else if (augCosts.moneyCost === 0 || Player.money >= augCosts.moneyCost) {
    const queuedAugmentation = new PlayerOwnedAugmentation(aug.name);
    if (aug.name == AugmentationNames.NeuroFluxGovernor) {
      queuedAugmentation.level = aug.getLevel();
    }
    Player.queuedAugmentations.push(queuedAugmentation);

    Player.loseMoney(augCosts.moneyCost, "augmentations");

    if (sing) {
      return "You purchased " + aug.name;
    } else if (!Settings.SuppressBuyAugmentationConfirmation) {
      dialogBoxCreate(
        "Vous avez acheté ${aug.name}. Ses améliorations ne prendront effet que lorsqu'elles seront installées. Pour installer vos augmentations, allez dans l'onglet 'Augmentations' dans le menu de navigation à gauche. L'achat d'augmentations supplémentaires sera désormais plus cher.",
      );
    }
  } else {
    dialogBoxCreate(
      "Hmm, une erreur s'est produite lors de la tentative d'achat d'une Augmentation. Veuillez signaler ceci au développeur du jeu avec une explication de la manière de reproduire cette erreur.",
    );
  }
  return "";
}

export function processPassiveFactionRepGain(numCycles: number): void {
  if (Player.bitNodeN === 2) return;
  for (const name of Object.keys(Factions)) {
    if (isFactionWork(Player.currentWork) && name === Player.currentWork.factionName) continue;
    if (!Factions.hasOwnProperty(name)) continue;
    const faction = Factions[name];
    if (!faction.isMember) continue;
    // No passive rep for special factions
    const info = faction.getInfo();
    if (!info.offersWork()) continue;
    // No passive rep for gangs.
    if (Player.getGangName() === name) continue;
    // 0 favor = 1%/s
    // 50 favor = 6%/s
    // 100 favor = 11%/s
    const favorMult = Math.min(0.1, faction.favor / 1000 + 0.01);
    // Find the best of all possible favor gain, minimum 1 rep / 2 minute.
    const hRep = getHackingWorkRepGain(Player, faction.favor);
    const sRep = getFactionSecurityWorkRepGain(Player, faction.favor);
    const fRep = getFactionFieldWorkRepGain(Player, faction.favor);
    const rate = Math.max(hRep * favorMult, sRep * favorMult, fRep * favorMult, 1 / 120);

    faction.playerReputation += rate * numCycles * Player.mults.faction_rep * BitNodeMultipliers.FactionPassiveRepGain;
  }
}

export const getFactionAugmentationsFiltered = (faction: Faction): string[] => {
  // If player has a gang with this faction, return (almost) all augmentations
  if (Player.hasGangWith(faction.name)) {
    let augs = Object.values(StaticAugmentations);

    // Remove special augs
    augs = augs.filter((a) => !a.isSpecial && a.name !== AugmentationNames.CongruityImplant);

    if (Player.bitNodeN === 2) {
      // TRP is not available outside of BN2 for Gangs
      augs.push(StaticAugmentations[AugmentationNames.TheRedPill]);
    }

    const rng = SFC32RNG(`BN${Player.bitNodeN}.${Player.sourceFileLvl(Player.bitNodeN)}`);
    // Remove faction-unique augs that don't belong to this faction
    const uniqueFilter = (a: Augmentation): boolean => {
      // Keep all the non-unique one
      if (a.factions.length > 1) {
        return true;
      }
      // Keep all the ones that this faction has anyway.
      if (faction.augmentations.includes(a.name)) {
        return true;
      }

      return rng() >= 1 - BitNodeMultipliers.GangUniqueAugs;
    };
    augs = augs.filter(uniqueFilter);

    return augs.map((a) => a.name);
  }

  return faction.augmentations.slice();
};
