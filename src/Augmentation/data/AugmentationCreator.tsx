import { Augmentation, IConstructorParams } from "../Augmentation";
import { AugmentationNames } from "./AugmentationNames";
import { Player } from "@player";
import { Programs } from "../../Programs/Programs";
import { WHRNG } from "../../Casino/RNG";
import React from "react";
import { FactionNames } from "../../Faction/data/FactionNames";
import { CONSTANTS } from "../../Constants";

interface CircadianBonus {
  bonuses: {
    [key: string]: number | undefined;
    agility?: number;
    agility_exp?: number;
    charisma?: number;
    charisma_exp?: number;
    company_rep?: number;
    crime_money?: number;
    crime_success?: number;
    defense?: number;
    defense_exp?: number;
    dexterity?: number;
    dexterity_exp?: number;
    faction_rep?: number;
    hacking?: number;
    hacking_chance?: number;
    hacking_exp?: number;
    hacking_grow?: number;
    hacking_money?: number;
    hacking_speed?: number;
    hacknet_node_core_cost?: number;
    hacknet_node_level_cost?: number;
    hacknet_node_money?: number;
    hacknet_node_purchase_cost?: number;
    hacknet_node_ram_cost?: number;
    strength?: number;
    strength_exp?: number;
    work_money?: number;
  };
  description: string;
}

function getRandomBonus(): CircadianBonus {
    const bonuses = [
    {
      bonuses: {
        hacking_chance: 1.25,
        hacking_speed: 1.1,
        hacking_money: 1.25,
        hacking_grow: 1.1,
      },
      description:
        "Augmente la chance de piratage du joueur de 25%.<br>" +
        "Augmente la vitesse de piratage du joueur de 10%.<br>" +
        "Augmente la quantité d'argent que le joueur gagne en piratage de 25%.<br>" +
        "Améliore grow() de 10%.",
    },
    {
      bonuses: {
        hacking: 1.15,
        hacking_exp: 2,
      },
      description:
        "Augmente la compétence de piratage du joueur de 15%.<br>" +
        "Augmente le taux de gain d'expérience de piratage du joueur de 100%.",
    },
    {
      bonuses: {
        strength: 1.25,
        strength_exp: 2,
        defense: 1.25,
        defense_exp: 2,
        dexterity: 1.25,
        dexterity_exp: 2,
        agility: 1.25,
        agility_exp: 2,
      },
      description:
        "Augmente toutes les statistiques de combat du joueur de 25%.<br>" +
        "Augmente le taux de gain d'expérience de toutes les statistiques de combat du joueur de 100%.",
    },
    {
      bonuses: {
        charisma: 1.5,
        charisma_exp: 2,
      },
      description:
        "Cette augmentation augmente le charisme du joueur de 50%.<br>" +
        "Augmente le taux de gain d'expérience de charisme du joueur de 100%.",
    },
    {
      bonuses: {
        hacknet_node_money: 1.2,
        hacknet_node_purchase_cost: 0.85,
        hacknet_node_ram_cost: 0.85,
        hacknet_node_core_cost: 0.85,
        hacknet_node_level_cost: 0.85,
      },
      description:
        "Augmente la quantité d'argent produite par les nœuds Hacknet de 20%.<br>" +
        "Diminue tous les coûts liés aux nœuds Hacknet de 15%.",
    },
    {
      bonuses: {
        company_rep: 1.25,
        faction_rep: 1.15,
        work_money: 1.7,
      },
      description:
        "Augmente la quantité d'argent que le joueur gagne en travaillant de 70%.<br>" +
        "Augmente la quantité de réputation que le joueur gagne en travaillant pour une entreprise de 25%.<br>" +
        "Augmente la quantité de réputation que le joueur gagne pour une faction de 15%.",
    },
    {
      bonuses: {
        crime_success: 2,
        crime_money: 2,
      },
      description:
        "Augmente le taux de réussite des crimes du joueur de 100%.<br>" +
        "Augmente la quantité d'argent que le joueur gagne en commettant des crimes de 100%.",
    },
  ];

  const randomNumber = new WHRNG(Math.floor(Player.lastUpdate / 3600000));
  for (let i = 0; i < 5; i++) randomNumber.step();

  return bonuses[Math.floor(bonuses.length * randomNumber.random())];
}

export const initSoAAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.WKSharmonizer,
    repCost: 1e4,
    moneyCost: 1e6,
    info:
      `Une copie de l'harmoniseur WKS du leader MIA des ${FactionNames.ShadowsOfAnarchy} ` +
      "injecte des cellules à base de *Γ qui fournissent une amélioration générale du corps.",
    stats: (
      <>
        Cette augmentation facilite de nombreux aspects de l'infiltration et les rend plus productifs. Comme le temps augmenté,
        les récompenses, les dégâts réduits, etc.
      </>
    ),
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.MightOfAres,
    repCost: 1e4,
    moneyCost: 1e6,
    info:
      "Neurones extra-oculaires prélevés sur un ancien maître d'arts martiaux. Les injecter donne à l'utilisateur la capacité de " +
      "prédire l'attaque de l'ennemi avant même qu'il ne le sache lui-même.",
    stats: (
      <>Cette augmentation facilite le mini-jeu Slash en vous montrant, via un indicateur, quand le coup de sabre arrive.</>
    ),
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.WisdomOfAthena,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Un implant cérébral connecté à SASHA qui se concentre sur la reconnaissance de motifs et la création de modèles prédictifs.",
    stats: <>Cette augmentation facilite le mini-jeu Bracket en supprimant tous les '[' et ']'</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.ChaosOfDionysus,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Implant opto-occipital pour traiter les signaux visuels avant l'interprétation cérébrale.",
    stats: <>Cette augmentation rend le mini-jeu Backwards plus facile en inversant les mots.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.BeautyOfAphrodite,
    repCost: 1e4,
    moneyCost: 1e6,
    info:
      "Injecteur de phéromones injecté dans le nerf thoracodorsal. Émet un parfum agréable garanti pour " + 
      "rendre les interlocuteurs plus conciliants.",
    stats: <>Cette augmentation facilite le mini-jeu de corruption en indiquant les chemins incorrects.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.TrickeryOfHermes,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Valve penta-dynamo-neurovasculaire insérée dans le ligament carpien, améliore la dextérité.",
    stats: <>Cette augmentation rend le mini-jeu Cheat Code plus facile en permettant au personnage opposé.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.FloodOfPoseidon,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Transtinatium VVD reticulator utilisé dans la reconnaissance optico-sterbing.",
    stats: <>Cette augmentation rend le mini-jeu de correspondance de symboles plus facile en indiquant le choix correct.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.HuntOfArtemis,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "magnéto-turboencabulateur basé sur la technologie de Micha Eike Siemon, augmente la sensibilité électromagnétique de l'utilisateur.",
    stats: (
      <>
        Cette augmentation rend le jeu de démineur plus facile en montrant l'emplacement de toutes les mines et en les conservant
        position.
      </>
    ),
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.KnowledgeOfApollo,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Rétention néodyne fjengeln spoofer utilisant -φ karmions, effet net positif sur les ondes delta de l'implanté.",
    stats: <>Cette augmentation rend le mini-jeu de Coupe de fils plus facile en indiquant les fils incorrects.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
];

export const initGeneralAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.HemoRecirculator,
    moneyCost: 4.5e7,
    repCost: 1e4,
    info: "Un implant cardiaque qui augmente considérablement la capacité du corps à utiliser et à pomper efficacement le sang.",
    strength: 1.08,
    defense: 1.08,
    agility: 1.08,
    dexterity: 1.08,
    factions: [FactionNames.Tetrads, FactionNames.TheDarkArmy, FactionNames.TheSyndicate],
  }),
  new Augmentation({
    name: AugmentationNames.Targeting1,
    moneyCost: 1.5e7,
    repCost: 5e3,
    info:
      "Un implant crânien qui est intégré aux structures de l'oreille interne et aux nerfs optiques. Il régule " +
      "et améliore l'équilibre et la coordination main-œil.",
    dexterity: 1.1,
    factions: [
      FactionNames.SlumSnakes,
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Sector12,
      FactionNames.Ishima,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.Targeting2,
    moneyCost: 4.25e7,
    repCost: 8.75e3,
    info:
      "Cette version améliorée de l'implant 'Ciblage augmenté' est capable d'améliorer " + 
      "la réalité en affichant numériquement les faiblesses et les signes vitaux des menaces.",
    prereqs: [AugmentationNames.Targeting1],
    dexterity: 1.2,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Sector12,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.Targeting3,
    moneyCost: 1.15e8,
    repCost: 2.75e4,
    info: "La dernière version de l'implant 'Ciblage augmenté' ajoute la capacité de verrouiller et de suivre les menaces.",
    prereqs: [AugmentationNames.Targeting2, AugmentationNames.Targeting1],
    dexterity: 1.3,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
      FactionNames.TheCovenant,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SyntheticHeart,
    moneyCost: 2.875e9,
    repCost: 7.5e5,
    info:
      "Ce cœur artificiel avancé, créé à partir de plasteel et de graphène, est capable de pomper le sang " +
      "plus efficacement qu'un cœur organique.",
    agility: 1.5,
    strength: 1.5,
    factions: [
      FactionNames.KuaiGongInternational,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.SpeakersForTheDead,
      FactionNames.NWO,
      FactionNames.TheCovenant,
      FactionNames.Daedalus,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SynfibrilMuscle,
    repCost: 4.375e5,
    moneyCost: 1.125e9,
    info:
      "Les myofibrilles des muscles humains sont injectées avec des produits chimiques spéciaux qui réagissent avec les protéines à l'intérieur " +
      "des myofibrilles, modifiant leur structure sous-jacente. Le résultat final est des muscles plus forts et plus élastiques. " +
      "Les scientifiques ont nommé ces unités artificiellement améliorées 'synfibrilles'.",
    strength: 1.3,
    defense: 1.3,
    factions: [
      FactionNames.KuaiGongInternational,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.SpeakersForTheDead,
      FactionNames.NWO,
      FactionNames.TheCovenant,
      FactionNames.Daedalus,
      FactionNames.Illuminati,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.CombatRib1,
    repCost: 7.5e3,
    moneyCost: 2.375e7,
    info:
      "La cage thoracique est augmentée pour libérer en continu des propulseurs dans le flux sanguin " +
      "ce qui augmente la capacité de transport de l'oxygène dans le sang.",
    strength: 1.1,
    defense: 1.1,
    factions: [
      FactionNames.SlumSnakes,
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Volhaven,
      FactionNames.Ishima,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.CombatRib2,
    repCost: 1.875e4,
    moneyCost: 6.5e7,
    info:
      "Une version améliorée de l'augmentation 'Combat Rib' qui ajoute des stimulants puissants " +
      "qui améliorent la concentration et l'endurance tout en diminuant le temps de réaction et la fatigue.",
    prereqs: [AugmentationNames.CombatRib1],
    strength: 1.14,
    defense: 1.14,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Volhaven,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.CombatRib3,
    repCost: 3.5e4,
    moneyCost: 1.2e8,
    info:
      "La dernière version de l'augmentation 'Combat Rib' libère des stéroïdes anabolisants avancés qui améliorent la masse musculaire et les performances physiques tout en étant sûrs et sans effets secondaires.",
    prereqs: [AugmentationNames.CombatRib2, AugmentationNames.CombatRib1],
    strength: 1.18,
    defense: 1.18,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
      FactionNames.TheCovenant,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.NanofiberWeave,
    repCost: 3.75e4,
    moneyCost: 1.25e8,
    info:
      "Des nanofibres synthétiques sont tissées dans la matrice extracellulaire de la peau à l'aide de l'électrofilage, " +
      "ce qui améliore ses capacités de régénération et d'homéostasie extracellulaire.",
    strength: 1.2,
    defense: 1.2,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.OmniTekIncorporated,
      FactionNames.BladeIndustries,
      FactionNames.TianDiHui,
      FactionNames.SpeakersForTheDead,
      FactionNames.FulcrumSecretTechnologies,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SubdermalArmor,
    repCost: 8.75e5,
    moneyCost: 3.25e9,
    info:
      "Le NEMEAN Subdermal Weave est un revêtement en graphène mince et léger qui contient un fluide dilatant. " +
      "Le matériau est implanté sous la peau et est la forme la plus avancée d'amélioration défensive " +
      "qui ait jamais été créée. Le fluide dilatant, malgré sa finesse et sa légèreté, est extrêmement efficace " +
      "pour arrêter les coups perforants et réduire les traumatismes contondants. Les propriétés du graphène permettent au revêtement de " +
      "atténuer les dommages causés par les traumatismes par le feu ou l'électricité.",
    defense: 2.2,
    factions: [
      FactionNames.TheSyndicate,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.Illuminati,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.WiredReflexes,
    repCost: 1.25e3,
    moneyCost: 2.5e6,
    info:
      "Des améliorations synthétiques des nerfs sont injectées dans toutes les principales parties du système nerveux somatique, " +
      "amplifiant la propagation des signaux neuronaux et augmentant la vitesse des réflexes.",
    agility: 1.05,
    dexterity: 1.05,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.SlumSnakes,
      FactionNames.Sector12,
      FactionNames.Volhaven,
      FactionNames.Aevum,
      FactionNames.Ishima,
      FactionNames.TheSyndicate,
      FactionNames.TheDarkArmy,
      FactionNames.SpeakersForTheDead,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBoneLacings,
    repCost: 1.125e6,
    moneyCost: 4.25e9,
    info: "Le graphène est greffé et fusionné dans la structure squelettique, améliorant la densité osseuse et la résistance à la traction.",
    strength: 1.7,
    defense: 1.7,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.TheCovenant],
  }),
  new Augmentation({
    name: AugmentationNames.BionicSpine,
    repCost: 4.5e4,
    moneyCost: 1.25e8,
    info:
      "La colonne vertébrale est reconstruite en utilisant du plasteel et des fibres de carbone. " +
      "Elle est désormais capable de stimuler et de réguler les signaux neuronaux " +
      "passant par la moelle épinière, améliorant ainsi les sens et la vitesse de réaction. " +
      "La 'Colonnes Vertébrale Bionique' interagit également avec tous les autres implants 'Bioniques'.",
    strength: 1.15,
    defense: 1.15,
    agility: 1.15,
    dexterity: 1.15,
    factions: [
      FactionNames.SpeakersForTheDead,
      FactionNames.TheSyndicate,
      FactionNames.KuaiGongInternational,
      FactionNames.OmniTekIncorporated,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBionicSpine,
    repCost: 1.625e6,
    moneyCost: 6e9,
    info:
      "Une amélioration de l'augmentation 'Bionic Spine'. La colonne vertébrale est fusionnée avec du graphène " +
      "ce qui améliore la durabilité et surcharge toutes les fonctions corporelles.",
    prereqs: [AugmentationNames.BionicSpine],
    strength: 1.6,
    defense: 1.6,
    agility: 1.6,
    dexterity: 1.6,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.ECorp],
  }),
  new Augmentation({
    name: AugmentationNames.BionicLegs,
    repCost: 1.5e5,
    moneyCost: 3.75e8,
    info: "Jambes cybernétiques, créées à partir de plasteel et de fibres de carbone, améliorent la vitesse de course.",
    agility: 1.6,
    factions: [
      FactionNames.SpeakersForTheDead,
      FactionNames.TheSyndicate,
      FactionNames.KuaiGongInternational,
      FactionNames.OmniTekIncorporated,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBionicLegs,
    repCost: 7.5e5,
    moneyCost: 4.5e9,
    info:
      "Une amélioration de l'augmentation 'Bionic Legs'. Les jambes sont fusionnées " +
      "avec du graphène, ce qui améliore considérablement la capacité de saut.",
    prereqs: [AugmentationNames.BionicLegs],
    agility: 2.5,
    factions: [FactionNames.MegaCorp, FactionNames.ECorp, FactionNames.FulcrumSecretTechnologies],
  }),
  new Augmentation({
    name: AugmentationNames.SpeechProcessor,
    repCost: 7.5e3,
    moneyCost: 5e7,
    info:
      "Un implant cochléaire avec un ordinateur intégré qui analyse la parole entrante. " +
      "L'ordinateur intégré traite les caractéristiques de la parole entrante, telles que le ton " +
      "et l'intonation, pour détecter des indices subtils et aider dans les interactions sociales.",
    charisma: 1.2,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.Chongqing,
      FactionNames.Sector12,
      FactionNames.NewTokyo,
      FactionNames.Aevum,
      FactionNames.Ishima,
      FactionNames.Volhaven,
      FactionNames.Silhouette,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.TITN41Injection,
    repCost: 2.5e4,
    moneyCost: 1.9e8,
    info:
      "TITN est une série de virus qui cible et modifie les séquences de l'ADN humain dans les gènes qui " +
      "contrôlent la personnalité. La souche TITN-41 modifie ces gènes de sorte que le sujet devienne plus " +
      "extraverti et sociable.",
    charisma: 1.15,
    charisma_exp: 1.15,
    factions: [FactionNames.Silhouette],
  }),
  new Augmentation({
    name: AugmentationNames.EnhancedSocialInteractionImplant,
    repCost: 3.75e5,
    moneyCost: 1.375e9,
    info:
      "Un implant crânien qui aide grandement l'utilisateur à analyser les situations sociales " +
      "et les interactions. Le système utilise une grande variété de facteurs tels que l'expression faciale, le langage corporel, le ton de voix et l'intonation pour déterminer la meilleure action à prendre lors des situations sociales. L'implant utilise également un logiciel d'apprentissage profond pour apprendre en continu de nouveaux comportements et la meilleure façon d'y répondre.",
    charisma: 1.6,
    charisma_exp: 1.6,
    factions: [
      FactionNames.BachmanAssociates,
      FactionNames.NWO,
      FactionNames.ClarkeIncorporated,
      FactionNames.OmniTekIncorporated,
      FactionNames.FourSigma,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.BitWire,
    repCost: 3.75e3,
    moneyCost: 1e7,
    info:
      "Un petit implant cérébral intégré dans le cerveau. Cela régule et améliore les capacités de calcul du cerveau.",
    hacking: 1.05,
    factions: [FactionNames.CyberSec, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.ArtificialBioNeuralNetwork,
    repCost: 2.75e5,
    moneyCost: 3e9,
    info:
      "Un réseau composé de millions de nanoprocesseurs est intégré dans le cerveau. " +
      "Le réseau vise à imiter la façon dont un cerveau biologique résout un problème, chaque " +
      "nanoprocesseur agissant de manière similaire à un neurone dans un réseau neuronal. Cependant, ces " +
      "nanoprocesseurs sont programmés pour effectuer des calculs beaucoup plus rapidement que les neurones organiques, " +
      "permettant à l'utilisateur de résoudre des problèmes beaucoup plus complexes à un rythme beaucoup plus rapide.",
    hacking_speed: 1.03,
    hacking_money: 1.15,
    hacking: 1.12,
    factions: [FactionNames.BitRunners, FactionNames.FulcrumSecretTechnologies],
  }),
  new Augmentation({
    name: AugmentationNames.ArtificialSynapticPotentiation,
    repCost: 6.25e3,
    moneyCost: 8e7,
    info:
      "Le corps est injecté avec un produit chimique qui induit artificiellement une potentiation synaptique, " +
      "également connue sous le nom de renforcement des synapses. Cela entraîne une amélioration des capacités cognitives.",
    hacking_speed: 1.02,
    hacking_chance: 1.05,
    hacking_exp: 1.05,
    factions: [FactionNames.TheBlackHand, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.EnhancedMyelinSheathing,
    repCost: 1e5,
    moneyCost: 1.375e9,
    info:
      "Les signaux électriques sont utilisés pour induire une nouvelle forme artificielle de myélinogenèse dans le corps humain. " +
      "Ce processus entraîne la prolifération de nouvelles gaines de myéline synthétiques dans le système nerveux. " +
      "Ces gaines de myéline peuvent propager les neuro-signaux beaucoup plus rapidement que leurs homologues organiques, " +
      "ce qui entraîne une vitesse de traitement accrue et une meilleure fonction cérébrale.",
    hacking_speed: 1.03,
    hacking_exp: 1.1,
    hacking: 1.08,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.BitRunners, FactionNames.TheBlackHand],
  }),
  new Augmentation({
    name: AugmentationNames.SynapticEnhancement,
    repCost: 2e3,
    moneyCost: 7.5e6,
    info:
      "Un petit implant crânien qui utilise en continu de faibles signaux électriques pour stimuler le cerveau et " +
      "induire une activité synaptique plus forte. Cela améliore les capacités cognitives de l'utilisateur.",
    hacking_speed: 1.03,
    factions: [FactionNames.CyberSec, FactionNames.Aevum],
  }),
  new Augmentation({
    name: AugmentationNames.NeuralRetentionEnhancement,
    repCost: 2e4,
    moneyCost: 2.5e8,
    info:
      "Les injections chimiques sont utilisées pour modifier et renforcer de manière permanente les circuits neuronaux du cerveau, renforçant ainsi la capacité de mémorisation des informations.",
    hacking_exp: 1.25,
    factions: [FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.DataJack,
    repCost: 1.125e5,
    moneyCost: 4.5e8,
    info:
      "Un implant cérébral qui fournit une interface pour une communication directe et sans fil entre la mémoire principale d'un ordinateur et l'esprit. Cet implant permet à l'utilisateur non seulement d'accéder à la mémoire d'un ordinateur, mais aussi de la modifier et de la supprimer.",
    hacking_money: 1.25,
    factions: [
      FactionNames.BitRunners,
      FactionNames.TheBlackHand,
      FactionNames.NiteSec,
      FactionNames.Chongqing,
      FactionNames.NewTokyo,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENM,
    repCost: 1.5e4,
    moneyCost: 2.5e8,
    info:
      "Un dispositif mince intégré dans le bras contenant un module sans fil capable de se connecter " +
      "aux réseaux environnants. Une fois connecté, le module Netburner est capable de capturer et " +
      "traiter tout le trafic sur ce réseau. En soi, le module Netburner intégré ne fait pas grand-chose, " +
      "mais une variété de mises à niveau très puissantes peuvent être installées pour vous permettre de " +
      "contrôler pleinement le trafic sur un réseau.",
    hacking: 1.08,
    factions: [
      FactionNames.BitRunners,
      FactionNames.TheBlackHand,
      FactionNames.NiteSec,
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMCore,
    repCost: 175e3,
    moneyCost: 2.5e9,
    info:
      "La bibliothèque Core est un implant qui améliore le micrologiciel du module Embedded Netburner. " +
      "Cette mise à niveau permet au module Embedded Netburner de générer ses propres données sur un réseau.",
    prereqs: [AugmentationNames.ENM],
    hacking_speed: 1.03,
    hacking_money: 1.1,
    hacking_chance: 1.03,
    hacking_exp: 1.07,
    hacking: 1.07,
    factions: [
      FactionNames.BitRunners,
      FactionNames.TheBlackHand,
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMCoreV2,
    repCost: 1e6,
    moneyCost: 4.5e9,
    info:
      "La bibliothèque Core V2 est un implant qui met à niveau le micrologiciel du module Embedded Netburner. " +
      "Ce micrologiciel amélioré permet au module Embedded Netburner de contrôler les informations sur " +
      "un réseau en réacheminant le trafic, en usurpant des adresses IP et en modifiant les données à l'intérieur des paquets réseau.",
    prereqs: [AugmentationNames.ENMCore, AugmentationNames.ENM],
    hacking_speed: 1.05,
    hacking_money: 1.3,
    hacking_chance: 1.05,
    hacking_exp: 1.15,
    hacking: 1.08,
    factions: [
      FactionNames.BitRunners,
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.BladeIndustries,
      FactionNames.OmniTekIncorporated,
    FactionNames.KuaiGongInternational,
  ],
}),       
  new Augmentation({
    name: AugmentationNames.ENMCoreV3,
    repCost: 1.75e6,
    moneyCost: 7.5e9,
    info:
      "La bibliothèque Core V3 est un implant qui met à niveau le micrologiciel du module Embedded Netburner. " +
      "Ce micrologiciel amélioré permet au module Embedded Netburner d'injecter de manière transparente du code dans " +
      "n'importe quel appareil sur un réseau.",
    prereqs: [AugmentationNames.ENMCoreV2, AugmentationNames.ENMCore, AugmentationNames.ENM],
    hacking_speed: 1.05,
    hacking_money: 1.4,
    hacking_chance: 1.1,
    hacking_exp: 1.25,
    hacking: 1.1,
    factions: [
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMAnalyzeEngine,
    repCost: 6.25e5,
    moneyCost: 6e9,
    info:
      "Installe le Moteur d'Analyse pour le Module Netburner Intégré, qui est un cluster de CPU " +
      "qui surpasse largement le processeur monocœur natif du Module Netburner.",
    prereqs: [AugmentationNames.ENM],
    hacking_speed: 1.1,
    factions: [
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMDMA,
    repCost: 1e6,
    moneyCost: 7e9,
    info:
      "Cet implant installe un contrôleur d'accès direct à la mémoire (DMA) dans le " +
      "Module Netburner intégré. Cela permet au Module d'envoyer et de recevoir des données " +
      "directement depuis la mémoire principale des appareils sur un réseau.",
    prereqs: [AugmentationNames.ENM],
    hacking_money: 1.4,
    hacking_chance: 1.2,
    factions: [
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.Neuralstimulator,
    repCost: 5e4,
    moneyCost: 3e9,
    info:
      "Un implant crânien qui stimule intelligemment certaines zones du cerveau " +
      "afin d'améliorer les fonctions cognitives.",
    hacking_speed: 1.02,
    hacking_chance: 1.1,
    hacking_exp: 1.12,
    factions: [
      FactionNames.TheBlackHand,
      FactionNames.Chongqing,
      FactionNames.Sector12,
      FactionNames.NewTokyo,
      FactionNames.Aevum,
      FactionNames.Ishima,
      FactionNames.Volhaven,
      FactionNames.BachmanAssociates,
      FactionNames.ClarkeIncorporated,
      FactionNames.FourSigma,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.NeuralAccelerator,
    repCost: 2e5,
    moneyCost: 1.75e9,
    info:
      "Un microprocesseur qui accélère la vitesse de traitement des réseaux neuronaux biologiques. Il s'agit d'un implant crânien qui est intégré à l'intérieur du cerveau.",
    hacking: 1.1,
    hacking_exp: 1.15,
    hacking_money: 1.2,
    factions: [FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG1,
    repCost: 1e4,
    moneyCost: 7e7,
    info:
      "La première génération de Processeurs de Signaux Crâniens. Les Processeurs de Signaux Crâniens " +
      "sont un ensemble de microprocesseurs spécialisés qui sont attachés aux " +
      "neurones du cerveau. Ces puces traitent les signaux neuronaux pour effectuer rapidement et automatiquement des calculs spécifiques " +
      "afin que le cerveau n'ait pas à le faire.",
    hacking_speed: 1.01,
    hacking: 1.05,
    factions: [FactionNames.CyberSec, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG2,
    repCost: 1.875e4,
    moneyCost: 1.25e8,
    info:
      "La deuxième génération de Processeurs de Signaux Crâniens. Les Processeurs de Signaux Crâniens " +
      "sont un ensemble de microprocesseurs spécialisés qui sont attachés aux " +
      "neurones du cerveau. Ces puces traitent les signaux neuronaux pour effectuer rapidement et automatiquement des calculs spécifiques " +
      "afin que le cerveau n'ait pas à le faire.",
    prereqs: [AugmentationNames.CranialSignalProcessorsG1],
    hacking_speed: 1.02,
    hacking_chance: 1.05,
    hacking: 1.07,
    factions: [FactionNames.CyberSec, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG3,
    repCost: 5e4,
    moneyCost: 5.5e8,
    info:
      "La troisième génération de Processeurs de Signaux Crâniens. Les Processeurs de Signaux Crâniens " +
      "sont un ensemble de microprocesseurs spécialisés qui sont attachés aux " +
      "neurones du cerveau. Ces puces traitent les signaux neuronaux pour effectuer rapidement et automatiquement des calculs spécifiques " +
      "afin que le cerveau n'ait pas à le faire.",
    prereqs: [AugmentationNames.CranialSignalProcessorsG2, AugmentationNames.CranialSignalProcessorsG1],
    hacking_speed: 1.02,
    hacking_money: 1.15,
    hacking: 1.09,
    factions: [FactionNames.NiteSec, FactionNames.TheBlackHand, FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG4,
    repCost: 1.25e5,
    moneyCost: 1.1e9,
    info:
      "La quatrième génération de processeurs de signaux crâniens. Les processeurs de signaux crâniens " +
      "sont un ensemble de microprocesseurs spécialisés qui sont attachés aux " +
      "neurones du cerveau. Ces puces traitent les signaux neuronaux pour effectuer rapidement et automatiquement des calculs spécifiques " +
      "afin que le cerveau n'ait pas à le faire.",
    prereqs: [
      AugmentationNames.CranialSignalProcessorsG3,
      AugmentationNames.CranialSignalProcessorsG2,
      AugmentationNames.CranialSignalProcessorsG1,
    ],
    hacking_speed: 1.02,
    hacking_money: 1.2,
    hacking_grow: 1.25,
    factions: [FactionNames.TheBlackHand, FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG5,
    repCost: 2.5e5,
    moneyCost: 2.25e9,
    info:
      "La cinquième génération de Processeurs de Signaux Crâniens. Les Processeurs de Signaux Crâniens " +
      "sont un ensemble de microprocesseurs spécialisés qui sont attachés aux " +
      "neurones du cerveau. Ces puces traitent les signaux neuronaux pour effectuer rapidement et automatiquement des calculs spécifiques " +
      "afin que le cerveau n'ait pas à le faire.",
    prereqs: [
      AugmentationNames.CranialSignalProcessorsG4,
      AugmentationNames.CranialSignalProcessorsG3,
      AugmentationNames.CranialSignalProcessorsG2,
      AugmentationNames.CranialSignalProcessorsG1,
    ],
    hacking: 1.3,
    hacking_money: 1.25,
    hacking_grow: 1.75,
    factions: [FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.NeuronalDensification,
    repCost: 1.875e5,
    moneyCost: 1.375e9,
    info:
      "Le cerveau est chirurgicalement ré-ingénieré pour avoir une densité neuronale accrue " +
      "en diminuant la jonction des neurones. Ensuite, le corps est génétiquement modifié " +
      "pour améliorer la production et les capacités de ses cellules souches neurales.",
    hacking: 1.15,
    hacking_exp: 1.1,
    hacking_speed: 1.03,
    factions: [FactionNames.ClarkeIncorporated],
  }),
  new Augmentation({
    name: AugmentationNames.NuoptimalInjectorImplant,
    repCost: 5e3,
    moneyCost: 2e7,
    info:
      "Cet implant de torse injecte automatiquement des suppléments nootropiques dans " +
      "le flux sanguin pour améliorer la mémoire, augmenter la concentration et fournir d'autres " +
      "améliorations cognitives.",
    company_rep: 1.2,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.Volhaven,
      FactionNames.NewTokyo,
      FactionNames.Chongqing,
      FactionNames.ClarkeIncorporated,
      FactionNames.FourSigma,
      FactionNames.BachmanAssociates,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SpeechEnhancement,
    repCost: 2.5e3,
    moneyCost: 1.25e7,
    info:
      "Un implant neural avancé qui améliore vos capacités de parole, vous rendant plus convaincant et aimable dans les conversations et améliorant globalement vos interactions sociales.",
    company_rep: 1.1,
    charisma: 1.1,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.SpeakersForTheDead,
      FactionNames.FourSigma,
      FactionNames.KuaiGongInternational,
      FactionNames.ClarkeIncorporated,
      FactionNames.BachmanAssociates,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.FocusWire,
    repCost: 7.5e4,
    moneyCost: 9e8,
    info: "Un implant crânien qui arrête la procrastination en bloquant des voies neurales spécifiques dans le cerveau.",
    hacking_exp: 1.05,
    strength_exp: 1.05,
    defense_exp: 1.05,
    dexterity_exp: 1.05,
    agility_exp: 1.05,
    charisma_exp: 1.05,
    company_rep: 1.1,
    work_money: 1.2,
    factions: [
      FactionNames.BachmanAssociates,
      FactionNames.ClarkeIncorporated,
      FactionNames.FourSigma,
      FactionNames.KuaiGongInternational,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.PCDNI,
    repCost: 3.75e5,
    moneyCost: 3.75e9,
    info:
      "Installe une prise d'interface neuronale directe dans votre bras compatible avec la plupart des " +
      "ordinateurs. En vous connectant à un ordinateur via cette prise, vous pouvez interagir avec " +
      "lui en utilisant les signaux électrochimiques du cerveau.",
    company_rep: 1.3,
    hacking: 1.08,
    factions: [
      FactionNames.FourSigma,
      FactionNames.OmniTekIncorporated,
      FactionNames.ECorp,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.PCDNIOptimizer,
    repCost: 5e5,
    moneyCost: 4.5e9,
    info:
      "Il s'agit d'une mise à niveau du sous-module de l'augmentation de l'interface neuronale directe au PC. " +
      "Il améliore les performances de l'interface et offre à l'utilisateur plus d'options de contrôle " +
      "pour un ordinateur connecté.",
    prereqs: [AugmentationNames.PCDNI],
    company_rep: 1.75,
    hacking: 1.1,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.ECorp, FactionNames.BladeIndustries],
  }),
  new Augmentation({
    name: AugmentationNames.PCDNINeuralNetwork,
    repCost: 1.5e6,
    moneyCost: 7.5e9,
    info:
      "Il s'agit d'une installation supplémentaire qui améliore les fonctionnalités de l'augmentation de l'interface neuronale directe du PC. Lorsqu'il est connecté à un ordinateur, la mise à niveau du réseau neuronal permet à l'utilisateur d'utiliser la puissance de traitement de son propre cerveau pour aider l'ordinateur dans les tâches de calcul.",
    prereqs: [AugmentationNames.PCDNI],
    company_rep: 2,
    hacking: 1.1,
    hacking_speed: 1.05,
    factions: [FactionNames.FulcrumSecretTechnologies],
  }),
  new Augmentation({
    name: AugmentationNames.ADRPheromone1,
    repCost: 3.75e3,
    moneyCost: 1.75e7,
    info:
      "Le corps est génétiquement ré-ingénieré de manière à produire la phéromone ADR-V1, " +
      "une phéromone artificielle découverte par des scientifiques. La phéromone ADR-V1, lorsqu'elle est excrétée, " +
      "déclenche des sentiments d'admiration et d'approbation chez les autres personnes.",
    company_rep: 1.1,
    faction_rep: 1.1,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.TheSyndicate,
      FactionNames.NWO,
      FactionNames.MegaCorp,
      FactionNames.FourSigma,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ADRPheromone2,
    repCost: 6.25e4,
    moneyCost: 5.5e8,
    info:
      "Le corps est génétiquement ré-ingénieré de manière à produire la phéromone ADR-V2, " +
      "qui est similaire mais plus puissante que l'ADR-V1. Cette phéromone, lorsqu'elle est excrétée, " +
      "déclenche des sentiments d'admiration, d'approbation et de respect chez les autres.",
    company_rep: 1.2,
    faction_rep: 1.2,
    factions: [
      FactionNames.Silhouette,
      FactionNames.FourSigma,
      FactionNames.BachmanAssociates,
      FactionNames.ClarkeIncorporated,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ShadowsSimulacrum,
    repCost: 3.75e4,
    moneyCost: 4e8,
    info:
      "Un module de déphasage de la matière rudimentaire mais fonctionnel qui est intégré " +
      "dans le tronc cérébral et le cervelet. Cette augmentation a été développée par " +
      "des organisations criminelles et permet à l'utilisateur de projeter et de contrôler des " +
      "simulacres holographiques dans un large rayon. Ces simulacres sont couramment utilisés pour " +
      "des missions d'espionnage et de surveillance.",
    company_rep: 1.15,
    faction_rep: 1.15,
    factions: [FactionNames.TheSyndicate, FactionNames.TheDarkArmy, FactionNames.SpeakersForTheDead],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeCPUUpload,
    repCost: 3.75e3,
    moneyCost: 1.1e7,
    info:
      "Télécharge l'architecture et les détails de conception du CPU d'un nœud Hacknet dans " +
      "le cerveau. Cela permet à l'utilisateur de concevoir du matériel et des logiciels personnalisés " +
      "pour le nœud Hacknet qui offrent de meilleures performances.",
    hacknet_node_money: 1.15,
    hacknet_node_purchase_cost: 0.85,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeCacheUpload,
    repCost: 2.5e3,
    moneyCost: 5.5e6,
    info:
      "Télécharge l'architecture et les détails de conception du cache de la mémoire principale d'un nœud Hacknet " +
      "dans le cerveau. Cela permet à l'utilisateur de concevoir du matériel de cache personnalisé pour le " +
      "nœud Hacknet qui offre de meilleures performances.",
    hacknet_node_money: 1.1,
    hacknet_node_level_cost: 0.85,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeNICUpload,
    repCost: 1.875e3,
    moneyCost: 4.5e6,
    info:
      "Télécharge l'architecture et les détails de conception d'une carte d'interface réseau (NIC) " +
      "d'un nœud Hacknet dans le cerveau. Cela permet à l'utilisateur de concevoir une NIC personnalisée pour le nœud Hacknet qui " +
      "offre de meilleures performances.",
    hacknet_node_money: 1.1,
    hacknet_node_purchase_cost: 0.9,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeKernelDNI,
    repCost: 7.5e3,
    moneyCost: 4e7,
    info:
      "Installe une prise d'interface neuronale directe dans le bras qui est capable de se connecter à un " +
      "Noeud Hacknet. Cela permet à l'utilisateur d'accéder et de manipuler le noyau du Noeud en utilisant " +
      "des signaux électrochimiques.",
    hacknet_node_money: 1.25,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeCoreDNI,
    repCost: 1.25e4,
    moneyCost: 6e7,
    info:
      "Installe une prise d'interface neuronale directe dans le bras qui est capable de se connecter " +
      "à un Nœud Hacknet. Cela permet à l'utilisateur d'accéder et de manipuler la logique de traitement du Nœud " +
      "en utilisant des signaux électrochimiques.",
    hacknet_node_money: 1.45,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.Neurotrainer1,
    repCost: 1e3,
    moneyCost: 4e6,
    info:
      "Un implant crânien décentralisé qui améliore la capacité du cerveau à apprendre. Il est " +
      "installé en libérant des millions de nanorobots dans le cerveau humain, chacun d'entre eux " +
      "se fixant sur une voie neuronale différente pour améliorer la capacité du cerveau à retenir " +
      "et récupérer des informations.",
    hacking_exp: 1.1,
    strength_exp: 1.1,
    defense_exp: 1.1,
    dexterity_exp: 1.1,
    agility_exp: 1.1,
    charisma_exp: 1.1,
    factions: [FactionNames.CyberSec, FactionNames.Aevum],
  }),
  new Augmentation({
    name: AugmentationNames.Neurotrainer2,
    repCost: 1e4,
    moneyCost: 4.5e7,
    info:
      "Un implant crânien décentralisé qui améliore la capacité du cerveau à apprendre. " +
      "Il s'agit d'une version plus puissante de l'augmentation Neurotrainer I, mais elle ne " +
      "nécessite pas l'installation préalable de Neurotrainer I.",
    hacking_exp: 1.15,
    strength_exp: 1.15,
    defense_exp: 1.15,
    dexterity_exp: 1.15,
    agility_exp: 1.15,
    charisma_exp: 1.15,
    factions: [FactionNames.BitRunners, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.Neurotrainer3,
    repCost: 2.5e4,
    moneyCost: 1.3e8,
    info:
      "Un implant crânien décentralisé qui améliore la capacité du cerveau à apprendre. " +
      "Il s'agit d'une version plus puissante de l'augmentation Neurotrainer I et Neurotrainer II, " +
      "mais elle ne nécessite pas l'installation préalable de l'une ou l'autre.",
    hacking_exp: 1.2,
    strength_exp: 1.2,
    defense_exp: 1.2,
    dexterity_exp: 1.2,
    agility_exp: 1.2,
    charisma_exp: 1.2,
    factions: [FactionNames.NWO, FactionNames.FourSigma],
  }),
  new Augmentation({
    name: AugmentationNames.Hypersight,
    repCost: 1.5e5,
    moneyCost: 2.75e9,
    info:
      "Un implant oculaire bionique qui confère des capacités de vision bien au-delà de celles d'un être humain naturel. " +
      "La circuit intégré intégré à l'implant permet de détecter la chaleur et les mouvements " +
      "à travers des objets solides tels que les murs, offrant ainsi des capacités similaires à la 'vision aux rayons X'.",
    dexterity: 1.4,
    hacking_speed: 1.03,
    hacking_money: 1.1,
    factions: [FactionNames.BladeIndustries, FactionNames.KuaiGongInternational],
  }),
  new Augmentation({
    name: AugmentationNames.LuminCloaking1,
    repCost: 1.5e3,
    moneyCost: 5e6,
    info:
      "Un implant cutané qui renforce la peau avec des cellules synthétiques hautement avancées. Ces " +
      "cellules, lorsqu'elles sont alimentées, ont un indice de réfraction négatif. En conséquence, elles plient la lumière " +
      "autour de la peau, rendant l'utilisateur beaucoup plus difficile à voir à l'œil nu.",
    agility: 1.05,
    crime_money: 1.1,
    factions: [FactionNames.SlumSnakes, FactionNames.Tetrads],
  }),
  new Augmentation({
    name: AugmentationNames.LuminCloaking2,
    repCost: 5e3,
    moneyCost: 3e7,
    info:
      "Il s'agit d'une version plus avancée de l'augmentation LuminCloaking-V1. Cet implant cutané " +
      "renforce la peau avec des cellules synthétiques hautement avancées. Ces " +
      "cellules, lorsqu'elles sont alimentées, sont capables non seulement de plier la lumière mais aussi de plier la chaleur, " +
      "rendant l'utilisateur plus résistant et furtif.",
    prereqs: [AugmentationNames.LuminCloaking1],
    agility: 1.1,
    defense: 1.1,
    crime_money: 1.25,
    factions: [FactionNames.SlumSnakes, FactionNames.Tetrads],
  }),
  new Augmentation({
    name: AugmentationNames.SmartSonar,
    repCost: 2.25e4,
    moneyCost: 7.5e7,
    info: "Un implant cochléaire qui aide le joueur à détecter et localiser les ennemis en utilisant la propagation du son.",
    dexterity: 1.1,
    dexterity_exp: 1.15,
    crime_money: 1.25,
    factions: [FactionNames.SlumSnakes],
  }),
  new Augmentation({
    name: AugmentationNames.PowerRecirculator,
    repCost: 2.5e4,
    moneyCost: 1.8e8,
    info:
      "Les nerfs du corps sont attachés à des nanocircuits de polypyrrole " +
      "capables de capturer l'énergie gaspillée, sous forme de chaleur, " +
      "et de la convertir en énergie utilisable.",
    hacking: 1.05,
    strength: 1.05,
    defense: 1.05,
    dexterity: 1.05,
    agility: 1.05,
    charisma: 1.05,
    hacking_exp: 1.1,
    strength_exp: 1.1,
    defense_exp: 1.1,
    dexterity_exp: 1.1,
    agility_exp: 1.1,
    charisma_exp: 1.1,
    factions: [FactionNames.Tetrads, FactionNames.TheDarkArmy, FactionNames.TheSyndicate, FactionNames.NWO],
  }),
  new Augmentation({
    name: AugmentationNames.QLink,
    repCost: 1.875e6,
    moneyCost: 2.5e13,
    info:
      `Un implant cérébral qui vous connecte sans fil à l'ordinateur quantique de ${FactionNames.Illuminati}, ` +
      "vous permettant d'accéder et d'utiliser sa puissance de calcul incroyable.",
    hacking: 1.75,
    hacking_speed: 2,
    hacking_chance: 2.5,
    hacking_money: 4,
    factions: [FactionNames.Illuminati],
  }),
  new Augmentation({
    name: AugmentationNames.SPTN97,
    repCost: 1.25e6,
    moneyCost: 4.875e9,
    info:
      "Le gène SPTN-97 est injecté dans le génome. Le gène SPTN-97 est un " +
      "gène artificiellement synthétisé qui a été développé par DARPA pour créer " +
      "des super-soldats grâce à la modification génétique. Le gène a été interdit en " +
      "2056.",
    strength: 1.75,
    defense: 1.75,
    dexterity: 1.75,
    agility: 1.75,
    hacking: 1.15,
    factions: [FactionNames.TheCovenant],
  }),
  new Augmentation({
    name: AugmentationNames.HiveMind,
    repCost: 1.5e6,
    moneyCost: 5.5e9,
    info:
      `Un implant cérébral développé par ${FactionNames.ECorp}. Ils ne révèlent pas ce que ` +
      "fait exactement l'implant, mais ils promettent qu'il améliorera grandement " +
      "vos capacités.",
    hacking_grow: 3,
    stats: null,
    factions: [FactionNames.ECorp],
  }),
  new Augmentation({
    name: AugmentationNames.TheRedPill,
    repCost: 2.5e6,
    moneyCost: 0,
    info: "Il est temps de quitter la caverne.",
    stats: null,
    isSpecial: true,
    factions: [FactionNames.Daedalus],
  }),
  new Augmentation({
    name: AugmentationNames.CordiARCReactor,
    repCost: 1.125e6,
    moneyCost: 5e9,
    info:
      "La cavité thoracique est équipée d'une petite chambre conçue " +
      "pour contenir et maintenir un plasma d'hydrogène. Le plasma est utilisé pour générer " +
      "de l'énergie de fusion grâce à la fusion nucléaire, fournissant des quantités illimitées d'énergie propre " +
      "pour le corps.",
    strength: 1.35,
    defense: 1.35,
    dexterity: 1.35,
    agility: 1.35,
    strength_exp: 1.35,
    defense_exp: 1.35,
    dexterity_exp: 1.35,
    agility_exp: 1.35,
    factions: [FactionNames.MegaCorp],
  }),
  new Augmentation({
    name: AugmentationNames.SmartJaw,
    repCost: 3.75e5,
    moneyCost: 2.75e9,
    info:
      "Une mâchoire bionique qui contient du matériel et des logiciels avancés " +
      "capables de psychoanalyser et de profiler la personnalité " +
      "d'autres personnes en utilisant des logiciels d'imagerie optique.",
    charisma: 1.5,
    charisma_exp: 1.5,
    company_rep: 1.25,
    faction_rep: 1.25,
    factions: [FactionNames.BachmanAssociates],
  }),
  new Augmentation({
    name: AugmentationNames.Neotra,
    repCost: 5.625e5,
    moneyCost: 2.875e9,
    info:
      "Un médicament techno-organique hautement avancé qui est injecté dans le système squelettique et tégumentaire. Le médicament modifie de manière permanente l'ADN des cellules de la peau et des os du corps, leur conférant la capacité de se réparer et de se restructurer.",
    strength: 1.55,
    defense: 1.55,
    factions: [FactionNames.BladeIndustries],
  }),
  new Augmentation({
    name: AugmentationNames.Xanipher,
    repCost: 8.75e5,
    moneyCost: 4.25e9,
    info:
      "Une concoction de nanorobots avancés qui est ingérée par voie orale dans le " +
      "corps. Ces nanorobots induisent des changements physiologiques et améliorent considérablement " +
      "le fonctionnement du corps dans tous les aspects.",
    hacking: 1.2,
    strength: 1.2,
    defense: 1.2,
    dexterity: 1.2,
    agility: 1.2,
    charisma: 1.2,
    hacking_exp: 1.15,
    strength_exp: 1.15,
    defense_exp: 1.15,
    dexterity_exp: 1.15,
    agility_exp: 1.15,
    charisma_exp: 1.15,
    factions: [FactionNames.NWO],
  }),
  new Augmentation({
    name: AugmentationNames.HydroflameLeftArm,
    repCost: 1.25e6,
    moneyCost: 2.5e12,
    info:
      "Le bras gauche d'un BitRunner légendaire qui est monté au-delà de ce monde. " +
      "Il projette un bouclier d'énergie bleu clair qui protège les parties internes exposées. " +
      "Bien qu'il ne contienne aucune arme, l'alliage avancé de tungstène et de titane " +
      "augmente la force de l'utilisateur à des niveaux incroyables.",
    strength: 2.8,
    factions: [FactionNames.NWO],
  }),
  new Augmentation({
    name: AugmentationNames.nextSENS,
    repCost: 4.375e5,
    moneyCost: 1.925e9,
    info:
      "Le corps est génétiquement ré-ingénieré pour maintenir un état " +
      "de sénescence négligeable, empêchant le corps de " +
      "se détériorer avec l'âge.",
    hacking: 1.2,
    strength: 1.2,
    defense: 1.2,
    dexterity: 1.2,
    agility: 1.2,
    charisma: 1.2,
    factions: [FactionNames.ClarkeIncorporated],
  }),
  new Augmentation({
    name: AugmentationNames.OmniTekInfoLoad,
    repCost: 6.25e5,
    moneyCost: 2.875e9,
    info:
      "Le référentiel de données et d'informations d'OmniTek est téléchargé " +
      "dans votre cerveau, améliorant vos compétences en programmation et " +
      "piratage.",
    hacking: 1.2,
    hacking_exp: 1.25,
    factions: [FactionNames.OmniTekIncorporated],
  }),
  new Augmentation({
    name: AugmentationNames.PhotosyntheticCells,
    repCost: 5.625e5,
    moneyCost: 2.75e9,
    info:
      "Les chloroplastes sont ajoutés aux cellules souches épidermiques et sont appliqués " +
      "au corps à l'aide d'une greffe de peau. Le résultat est des cellules cutanées photosynthétiques, " +
      "permettant aux utilisateurs de générer leur propre énergie " +
      "et nutrition en utilisant l'énergie solaire.",
    strength: 1.4,
    defense: 1.4,
    agility: 1.4,
    factions: [FactionNames.KuaiGongInternational],
  }),
  new Augmentation({
    name: AugmentationNames.Neurolink,
    repCost: 8.75e5,
    moneyCost: 4.375e9,
    info:
      "Un implant cérébral qui fournit une liaison neuronale directe à haut débit entre votre " +
      `esprit et les serveurs de données de ${FactionNames.BitRunners}, qui contiennent ` +
      "apparemment la plus grande base de données d'outils de piratage et d'informations au monde.",
    hacking: 1.15,
    hacking_exp: 1.2,
    hacking_chance: 1.1,
    hacking_speed: 1.05,
    programs: [Programs.FTPCrackProgram.name, Programs.RelaySMTPProgram.name],
    factions: [FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.TheBlackHand,
    repCost: 1e5,
    moneyCost: 5.5e8,
    info:
      "Une main bionique très avancée. Cette prothèse non seulement " +
      "améliore la force et la dextérité, mais elle est également équipée " +
      "d'un matériel et d'un micrologiciel qui permet à l'utilisateur de se connecter, d'accéder et de pirater " +
      "des appareils et des machines en les touchant simplement.",
    strength: 1.15,
    dexterity: 1.15,
    hacking: 1.1,
    hacking_speed: 1.02,
    hacking_money: 1.1,
    factions: [FactionNames.LaMainNoire],
  }),
  new Augmentation({
    name: AugmentationNames.CRTX42AA,
    repCost: 4.5e4,
    moneyCost: 2.25e8,
    info:
      "Le gène CRTX42-AA est injecté dans le génome. " +
      "Le CRTX42-AA est un gène artificiellement synthétisé qui cible le cortex visuel et préfrontal " +
      "et améliore les capacités cognitives.",
    hacking: 1.08,
    hacking_exp: 1.15,
    factions: [FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.Neuregen,
    repCost: 3.75e4,
    moneyCost: 3.75e8,
    info:
      "Un médicament qui modifie génétiquement les neurones dans le cerveau " +
      "résultant en des neurones qui ne meurent jamais, se régénèrent en continu " +
      "et se renforcent.",
    hacking_exp: 1.4,
    factions: [FactionNames.Chongqing],
  }),
  new Augmentation({
    name: AugmentationNames.CashRoot,
    repCost: 1.25e4,
    moneyCost: 1.25e8,
    info: (
      <>
        Une collection d'actifs numériques enregistrés sur une petite puce. La puce est implantée dans votre poignet. Une petite prise dans la puce vous permet de la connecter à un ordinateur et de télécharger les actifs.
      </>
    ),
    startingMoney: 1e6,
    programs: [Programs.BruteSSHProgram.name],
    factions: [FactionNames.Sector12],
  }),
  new Augmentation({
    name: AugmentationNames.NutriGen,
    repCost: 6.25e3,
    moneyCost: 2.5e6,
    info:
      "Un générateur de nutrition artificielle alimenté par la chaleur. Synthétise endogènement du glucose, des acides aminés et des vitamines et les redistribue à travers le corps. L'appareil est alimenté par l'énergie naturellement gaspillée du corps sous forme de chaleur.",
    strength_exp: 1.2,
    defense_exp: 1.2,
    dexterity_exp: 1.2,
    agility_exp: 1.2,
    factions: [FactionNames.NewTokyo],
  }),
  new Augmentation({
    name: AugmentationNames.PCMatrix,
    repCost: 100e3,
    moneyCost: 2e9,
    info:
      "Une 'Matrice de Calcul de Probabilité' est installée dans le cortex frontal. Cet implant " +
      "utilise des algorithmes mathématiques avancés pour identifier et calculer rapidement les " +
      "résultats statistiques de presque toutes les situations.",
    charisma: 1.0777,
    charisma_exp: 1.0777,
    work_money: 1.777,
    faction_rep: 1.0777,
    company_rep: 1.0777,
    crime_success: 1.0777,
    crime_money: 1.0777,
    programs: [Programs.DeepscanV1.name, Programs.AutoLink.name],
    factions: [FactionNames.Aevum],
  }),
  new Augmentation({
    name: AugmentationNames.INFRARet,
    repCost: 7.5e3,
    moneyCost: 3e7,
    info: "Une petite puce qui se trouve derrière la rétine. Cet implant permet à l'utilisateur de détecter visuellement le rayonnement infrarouge.",
    crime_success: 1.25,
    crime_money: 1.1,
    dexterity: 1.1,
    factions: [FactionNames.Ishima],
  }),
  new Augmentation({
    name: AugmentationNames.DermaForce,
    repCost: 1.5e4,
    moneyCost: 5e7,
    info:
      "Peau synthétique greffée sur le corps. Cette peau est composée de " +
      "millions de nanorobots capables de projeter des faisceaux de muons à haute densité, " +
      "créant une barrière énergétique autour de l'utilisateur.",
    defense: 1.4,
    factions: [FactionNames.Volhaven],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBrachiBlades,
    repCost: 2.25e5,
    moneyCost: 2.5e9,
    info:
      "Une amélioration de l'augmentation BrachiBlades. Elle infuse " +
      "les lames rétractables avec un matériau en graphène avancé " +
      "les rendant plus solides et plus légères.",
    prereqs: [AugmentationNames.BrachiBlades],
    strength: 1.4,
    defense: 1.4,
    crime_success: 1.1,
    crime_money: 1.3,
    factions: [FactionNames.SpeakersForTheDead],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBionicArms,
    repCost: 5e5,
    moneyCost: 3.75e9,
    info:
      "Une amélioration de l'augmentation des Bras Bioniques. Elle infuse les " +
      "bras prothétiques avec un matériau avancé en graphène " +
      "pour les rendre plus forts et plus légers.",
    prereqs: [AugmentationNames.BionicArms],
    strength: 1.85,
    dexterity: 1.85,
    factions: [FactionNames.TheDarkArmy],
  }),
  new Augmentation({
    name: AugmentationNames.BrachiBlades,
    repCost: 1.25e4,
    moneyCost: 9e7,
    info: "Un ensemble de lames en plasteel rétractables qui sont implantées dans le bras, sous la peau.",
    strength: 1.15,
    defense: 1.15,
    crime_success: 1.1,
    crime_money: 1.15,
    factions: [FactionNames.TheSyndicate],
  }),
  new Augmentation({
    name: AugmentationNames.BionicArms,
    repCost: 6.25e4,
    moneyCost: 2.75e8,
    info: "Bras bioniques créés à partir de plasteel et de fibres de carbone qui remplacent complètement les bras organiques de l'utilisateur.",
    strength: 1.3,
    dexterity: 1.3,
    factions: [FactionNames.Tetrads],
  }),
  new Augmentation({
    name: AugmentationNames.SNA,
    repCost: 6.25e3,
    moneyCost: 3e7,
    info:
      "Un implant crânien qui affecte la personnalité de l'utilisateur, le rendant meilleur " +
      "en négociation dans les situations sociales.",
    work_money: 1.1,
    company_rep: 1.15,
    faction_rep: 1.15,
    factions: [FactionNames.TianDiHui],
  }),
  new Augmentation({
    name: AugmentationNames.NeuroreceptorManager,
    repCost: 0.75e5,
    moneyCost: 5.5e8,
    info:
      "Un implant cérébral soigneusement assemblé autour des synapses, qui " +
      "gère de manière microscopique l'activité et les niveaux de divers produits chimiques neurorécepteurs " +
      "et module l'activité électrique pour optimiser la concentration, " +
      "permettant à l'utilisateur de réaliser plusieurs tâches de manière beaucoup plus efficace.",
    stats: (
      <>
        Cette augmentation supprime la pénalité pour ne pas se concentrer sur des actions telles que travailler dans un emploi ou travailler pour une " +
        "faction.
      </>
    ),
    factions: [FactionNames.TianDiHui],
  }),

// new Augmentation({
//   name: AugmentationNames.UnnamedAug2,
//   repCost: 500e3,
//   moneyCost: 5e9,
//   info: "Undecided description",
//   startingMoney: 100e6,
//   programs: [Programs.HTTPWormProgram.name, Programs.SQLInjectProgram.name],
//   factions: [FactionNames.OmniTekIncorporated],
// }),

// Grafting-exclusive Augmentation
  new Augmentation({
    name: AugmentationNames.CongruityImplant,
    repCost: Infinity,
    moneyCost: 50e12,
    info: (
      <>
        Développé par un pionnier de la recherche sur la Greffe, cet implant génère des impulsions de stabilité qui semblent avoir un effet neutralisant contre le virus Entropy.
        <br />
        <br />
        <b>Note:</b> Pour des raisons inconnues, la minuscule <code>n</code> semble être un composant intégral de sa fonctionnalité.
      </>
    ),
    stats: <>Cette Augmentation élimine le virus Entropy et l'empêche de vous affecter à nouveau.</>,
    factions: [],
  }),

// Sleeve exclusive augmentations
  new Augmentation({
    name: AugmentationNames.ZOE,
    isSpecial: true,
    repCost: Infinity,
    moneyCost: 1e12,
    info:
      "L'Amélioration Zoë's Omnicerebrum Ënhancer pour manches insère un omnicerebrum dans votre manche. " +
      "Un omnicerebrum est une simulation quasi parfaite du cerveau humain, ce qui lui permet de bénéficier d'une plus grande variété d'améliorations. " +
      "Mais vous devriez en savoir plus sur ce BitRunner, puisque vous en avez un vous-même!",
    stats: <>Permet aux manches de bénéficier du Don de Stanek, mais il est moins puissant s'il y en a plusieurs installés.</>,
    factions: [
      /*Techniquement dans FactionNames.ChurchOfTheMachineGod mais pas vraiment pour des raisons d'affichage */
    ],
  }),
];

export const initBladeburnerAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.EsperEyewear,
    repCost: 1.25e3,
    moneyCost: 1.65e8,
    info:
      "Lunettes de protection rétractables de qualité balistique conçues spécifiquement " +
      "pour les unités Bladeburner. Celles-ci " +
      "sont implantées en installant une monture mécanique dans l'orbite du crâne. " +
      "Cette monture interagit avec le cerveau et permet à l'utilisateur de " +
      "déployer et de rétracter automatiquement les lunettes. Les lunettes protègent " +
      "contre les débris, les éclats, les lasers, les flashs éblouissants et les gaz. Elles sont également " +
      "incorporées avec une puce de traitement des données qui peut être programmée pour afficher une " +
      "interface utilisateur en réalité augmentée (AR HUD) afin d'aider l'utilisateur lors des missions sur le terrain.",
    bladeburner_success_chance: 1.03,
    dexterity: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.EMS4Recombination,
    repCost: 2.5e3,
    moneyCost: 2.75e8,
    info:
      "Une recombinaison de l'ADN du gène EMS-4. Cette technique de génie génétique " +
      "a été initialement utilisée sur les Bladeburners pendant la révolte des Synthoïdes " +
      "pour induire l'éveil et la concentration, supprimer la peur, réduire l'empathie, " +
      "améliorer les réflexes et la mémoire, entre autres choses.",
    bladeburner_success_chance: 1.03,
    bladeburner_analysis: 1.05,
    bladeburner_stamina_gain: 1.02,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.OrionShoulder,
    repCost: 6.25e3,
    moneyCost: 5.5e8,
    info:
      "Un augmentation bionique pour l'épaule droite. Utilisant la cybernétique, " +
      "l'épaule ORION-MKIV améliore la force et la dextérité " +
      "du bras droit de l'utilisateur. Elle offre également une protection grâce à son " +
      "revêtement en graphène cristallisé.",
    defense: 1.05,
    strength: 1.05,
    dexterity: 1.05,
    bladeburner_success_chance: 1.04,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.HyperionV1,
    repCost: 1.25e4,
    moneyCost: 2.75e9,
    info:
      "Une paire de mini canons à plasma intégrés dans les mains. L'Hyperion est capable " +
      "de tirer rapidement des projectiles de plasma à haute densité. Cette arme est conçue " +
      "pour être utilisée contre des ennemis augmentés car la nature ionisée " +
      "du plasma perturbe les systèmes électriques des augmentations. Cependant, " +
      "elle peut également être efficace contre des ennemis non-augmentés en raison de sa température élevée " +
      "et de sa force concussive.",
    bladeburner_success_chance: 1.06,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.HyperionV2,
    repCost: 2.5e4,
    moneyCost: 5.5e9,
    info:
      "Une paire de mini canons à plasma intégrés dans les mains. Cette augmentation " +
      "est plus avancée et puissante que le modèle V1 original. Ce modèle V2 est " +
      "plus économe en énergie, plus précis et peut tirer des projectiles de plasma à une " +
      "vitesse beaucoup plus élevée que le modèle V1.",
    prereqs: [AugmentationNames.HyperionV1],
    bladeburner_success_chance: 1.08,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.GolemSerum,
    repCost: 3.125e4,
    moneyCost: 1.1e10,
    info:
      "Un sérum qui améliore de manière permanente de nombreux aspects des capacités humaines, " +
      "y compris la force, la vitesse, les améliorations du système immunitaire et l'efficacité mitochondriale. Le " +
      "sérum a été initialement développé par l'armée chinoise dans le but de " +
      "créer des super soldats.",
    strength: 1.07,
    defense: 1.07,
    dexterity: 1.07,
    agility: 1.07,
    bladeburner_stamina_gain: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.VangelisVirus,
    repCost: 1.875e4,
    moneyCost: 2.75e9,
    info:
      "Un virus symbiotique synthétique qui est injecté dans les tissus cérébraux humains. Le virus Vangelis " +
      "amplifie les sens et la concentration de son hôte, et améliore également son intuition.",
    dexterity_exp: 1.1,
    bladeburner_analysis: 1.1,
    bladeburner_success_chance: 1.04,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.VangelisVirus3,
    repCost: 3.75e4,
    moneyCost: 1.1e10,
    info:
      "Une version améliorée de Vangelis, un virus symbiotique synthétique qui est " +
      "injecté dans les tissus cérébraux humains. En plus des avantages du virus " +
      "original, cela confère également une guérison accélérée et des " +
      "réflexes améliorés.",
    prereqs: [AugmentationNames.VangelisVirus],
    defense_exp: 1.1,
    dexterity_exp: 1.1,
    bladeburner_analysis: 1.15,
    bladeburner_success_chance: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.INTERLINKED,
    repCost: 2.5e4,
    moneyCost: 5.5e9,
    info:
      "L'ADN est génétiquement modifié pour améliorer la matrice extracellulaire (ECM) du corps humain. Cela améliore la capacité de l'ECM à soutenir structurellement le corps et confère une force et une durabilité accrues.",
    strength_exp: 1.05,
    defense_exp: 1.05,
    dexterity_exp: 1.05,
    agility_exp: 1.05,
    bladeburner_max_stamina: 1.1,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeRunner,
    repCost: 2e4,
    moneyCost: 8.25e9,
    info:
      `Un augmentation du pied cybernétique qui a été spécialement créée pour ${FactionNames.Bladeburners} ` +
      "pendant l'Insurrection des Synthoïdes. La musculature organique du pied humain " +
      "est améliorée avec des matrices de nanotubes de carbone flexibles contrôlées par " +
      "des servo-moteurs intelligents.",
    agility: 1.05,
    bladeburner_max_stamina: 1.05,
    bladeburner_stamina_gain: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmor,
    repCost: 1.25e4,
    moneyCost: 1.375e9,
    info:
      `Une combinaison exosquelette alimentée conçue comme une armure pour les unités ${FactionNames.Bladeburners}. Cette ` +
      "exosquelette est incroyablement adaptable et peut protéger le porteur contre les traumatismes contondants, perforants, " +
      "concussionnels, thermiques, chimiques et électriques. Il améliore également les capacités physiques de l'utilisateur.",
    strength: 1.04,
    defense: 1.04,
    dexterity: 1.04,
    agility: 1.04,
    bladeburner_stamina_gain: 1.02,
    bladeburner_success_chance: 1.03,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorPowerCells,
    repCost: 1.875e4,
    moneyCost: 2.75e9,
    info:
      "Améliore l'armure Tesla BLADE-51b avec des cellules d'énergie ionique, capables de " +
      "stocker et d'utiliser l'énergie de manière plus efficace.",
    prereqs: [AugmentationNames.BladeArmor],
    bladeburner_success_chance: 1.05,
    bladeburner_stamina_gain: 1.02,
    bladeburner_max_stamina: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorEnergyShielding,
    repCost: 2.125e4,
    moneyCost: 5.5e9,
    info:
      "Améliore l'armure Tesla BLADE-51b avec un système de propulsion à plasma " +
      "capable de projeter un champ de force de bouclier énergétique.",
    prereqs: [AugmentationNames.BladeArmor],
    defense: 1.05,
    bladeburner_success_chance: 1.06,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorUnibeam,
    repCost: 3.125e4,
    moneyCost: 1.65e10,
    info:
      "Améliore l'armure Tesla BLADE-51b avec un laser de deutérium-fluorure " +
      "concentré. Sa précision et sa précision en font un outil utile pour neutraliser rapidement " +
      "les menaces tout en minimisant les pertes.",
    prereqs: [AugmentationNames.BladeArmor],
    bladeburner_success_chance: 1.08,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorOmnibeam,
    repCost: 6.25e4,
    moneyCost: 2.75e10,
    info:
      "Améliore l'augmentation BLADE-51b Tesla Armor Unibeam en utilisant un " +
      "système à fibres multiples. Cette arme améliorée utilise plusieurs modules " +
      "laser à fibres qui se combinent pour former un seul faisceau plus puissant " +
      "pouvant atteindre jusqu'à 2000MW.",
    prereqs: [AugmentationNames.BladeArmorUnibeam],
    bladeburner_success_chance: 1.1,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorIPU,
    repCost: 1.5e4,
    moneyCost: 1.1e9,
    info:
      "Améliore l'armure Tesla BLADE-51b avec une unité de traitement d'informations " +
      "IA spécialement conçue pour analyser les données et informations liées aux Synthoïdes.",
    prereqs: [AugmentationNames.BladeArmor],
    bladeburner_analysis: 1.15,
    bladeburner_success_chance: 1.02,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladesSimulacrum,
    repCost: 1.25e3,
    moneyCost: 1.5e11,
    info:
      "Un module de déphasage de matière hautement avancé qui est intégré " +
      "dans le tronc cérébral et le cervelet. Cette augmentation permet " +
      "à l'utilisateur de projeter et de contrôler un simulacre holographique dans un " +
      "rayon extrêmement large. Ces hologrammes spécialement modifiés ont été spécifiquement " +
      "armés par les unités Bladeburner pour être utilisés contre les Synthoïdes.",
    stats: (
      <>
        Cette augmentation vous permet d'effectuer des actions de Bladeburner et d'autres actions (comme travailler, commettre
        des crimes, etc.) en même temps.
      </>
    ),
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
];

export const initChurchOfTheMachineGodAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.StaneksGift1,
    repCost: 0,
    moneyCost: 0,
    info:
      'Allison "Mother" Stanek vous fait don de son cadeau. Une ' +
      "Augmentation expérimentale implantée à la base du cou. " +
      "Elle vous permet de surcadencer l'ensemble de votre système en modifiant soigneusement " +
      "la configuration.",
    isSpecial: true,
    hacking_chance: 0.9,
    hacking_speed: 0.9,
    hacking_money: 0.9,
    hacking_grow: 0.9,
    hacking: 0.9,
    strength: 0.9,
    defense: 0.9,
    dexterity: 0.9,
    agility: 0.9,
    charisma: 0.9,
    hacking_exp: 0.9,
    strength_exp: 0.9,
    defense_exp: 0.9,
    dexterity_exp: 0.9,
    agility_exp: 0.9,
    charisma_exp: 0.9,
    company_rep: 0.9,
    faction_rep: 0.9,
    crime_money: 0.9,
    crime_success: 0.9,
    hacknet_node_money: 0.9,
    hacknet_node_purchase_cost: 1.1,
    hacknet_node_ram_cost: 1.1,
    hacknet_node_core_cost: 1.1,
    hacknet_node_level_cost: 1.1,
    work_money: 0.9,
    stats: <>Its unstable nature decreases all your stats by 10%</>,
    factions: [FactionNames.ChurchOfTheMachineGod],
  }),
  new Augmentation({
    name: AugmentationNames.StaneksGift2,
    repCost: 1e6,
    moneyCost: 0,
    info:
      "La prochaine évolution est proche, une fusion de l'homme et de la machine. Une synthèse plus grande que la naissance de l'organisme humain. Le temps passé avec le cadeau a permis de s'habituer à l'augmentation invasive et au tribut qu'elle prend sur votre corps, ce qui accorde une réduction de 5% de la pénalité à toutes les statistiques.",
    prereqs: [AugmentationNames.StaneksGift1],
    isSpecial: true,
    hacking_chance: 0.95 / 0.9,
    hacking_speed: 0.95 / 0.9,
    hacking_money: 0.95 / 0.9,
    hacking_grow: 0.95 / 0.9,
    hacking: 0.95 / 0.9,
    strength: 0.95 / 0.9,
    defense: 0.95 / 0.9,
    dexterity: 0.95 / 0.9,
    agility: 0.95 / 0.9,
    charisma: 0.95 / 0.9,
    hacking_exp: 0.95 / 0.9,
    strength_exp: 0.95 / 0.9,
    defense_exp: 0.95 / 0.9,
    dexterity_exp: 0.95 / 0.9,
    agility_exp: 0.95 / 0.9,
    charisma_exp: 0.95 / 0.9,
    company_rep: 0.95 / 0.9,
    faction_rep: 0.95 / 0.9,
    crime_money: 0.95 / 0.9,
    crime_success: 0.95 / 0.9,
    hacknet_node_money: 0.95 / 0.9,
    hacknet_node_purchase_cost: 1.05 / 1.1,
    hacknet_node_ram_cost: 1.05 / 1.1,
    hacknet_node_core_cost: 1.05 / 1.1,
    hacknet_node_level_cost: 1.05 / 1.1,
    work_money: 0.95 / 0.9,
    stats: <>The penalty for the gift is reduced to 5%</>,
    factions: [FactionNames.ChurchOfTheMachineGod],
  }),
  new Augmentation({
    name: AugmentationNames.StaneksGift3,
    repCost: 1e8,
    moneyCost: 0,
    info:
      "La synthèse de l'homme et de la machine n'est rien à craindre. C'est notre destin. " +
      "Vous deviendrez plus grand que la somme de nos parties. Comme Un. Embrassez votre cadeau " +
      "pleinement et totalement libéré de son péage maudit. La sérénité apporte la tranquillité sous la forme " +
      "de ne plus subir de pénalité de statistiques. ",
    prereqs: [AugmentationNames.StaneksGift2, AugmentationNames.StaneksGift1],
    isSpecial: true,
    hacking_chance: 1 / 0.95,
    hacking_speed: 1 / 0.95,
    hacking_money: 1 / 0.95,
    hacking_grow: 1 / 0.95,
    hacking: 1 / 0.95,
    strength: 1 / 0.95,
    defense: 1 / 0.95,
    dexterity: 1 / 0.95,
    agility: 1 / 0.95,
    charisma: 1 / 0.95,
    hacking_exp: 1 / 0.95,
    strength_exp: 1 / 0.95,
    defense_exp: 1 / 0.95,
    dexterity_exp: 1 / 0.95,
    agility_exp: 1 / 0.95,
    charisma_exp: 1 / 0.95,
    company_rep: 1 / 0.95,
    faction_rep: 1 / 0.95,
    crime_money: 1 / 0.95,
    crime_success: 1 / 0.95,
    hacknet_node_money: 1 / 0.95,
    hacknet_node_purchase_cost: 1 / 1.05,
    hacknet_node_ram_cost: 1 / 1.05,
    hacknet_node_core_cost: 1 / 1.05,
    hacknet_node_level_cost: 1 / 1.05,
    work_money: 1 / 0.95,
    stats: <>Stanek's Gift has no penalty.</>,
    factions: [FactionNames.ChurchOfTheMachineGod],
  }),
  new Augmentation({
    name: AugmentationNames.BigDsBigBrain,
    isSpecial: true,
    factions: [],
    repCost: Infinity,
    moneyCost: Infinity,
    info:
      "Une puce contenant la psyché du plus grand BitRunner qui ait jamais existé. " +
      "L'installation de ce relique augmente considérablement TOUS vos statistiques. " +
      "Cependant, cela peut avoir des conséquences imprévues sur le bien-être mental de l'utilisateur.",
    stats: <>Accorde un accès à un pouvoir inimaginable.</>,
    hacking: 2,
    strength: 2,
    defense: 2,
    dexterity: 2,
    agility: 2,
    charisma: 2,
    hacking_exp: 2,
    strength_exp: 2,
    defense_exp: 2,
    dexterity_exp: 2,
    agility_exp: 2,
    charisma_exp: 2,
    hacking_chance: 2,
    hacking_speed: 2,
    hacking_money: 2,
    hacking_grow: 2,
    company_rep: 2,
    faction_rep: 2,
    crime_money: 2,
    crime_success: 2,
    work_money: 2,
    hacknet_node_money: 2,
    hacknet_node_purchase_cost: 0.5,
    hacknet_node_ram_cost: 0.5,
    hacknet_node_core_cost: 0.5,
    hacknet_node_level_cost: 0.5,
    bladeburner_max_stamina: 2,
    bladeburner_stamina_gain: 2,
    bladeburner_analysis: 2,
    bladeburner_success_chance: 2,

    startingMoney: 1e12,
    programs: [
      Programs.BruteSSHProgram.name,
      Programs.FTPCrackProgram.name,
      Programs.RelaySMTPProgram.name,
      Programs.HTTPWormProgram.name,
      Programs.SQLInjectProgram.name,
      Programs.DeepscanV1.name,
      Programs.DeepscanV2.name,
      Programs.ServerProfiler.name,
      Programs.AutoLink.name,
      Programs.Formulas.name,
    ],
  }),
];

export function initNeuroFluxGovernor(): Augmentation {
  const donationBonus = CONSTANTS.Donations / 1e6 / 100; // 1 millionth of a percent per donation
  return new Augmentation({
    name: AugmentationNames.NeuroFluxGovernor,
    repCost: 500,
    moneyCost: 750e3,
    info: "Nanobots d'adamantium indétectables injectés dans le système sanguin de l'utilisateur. Le Gouverneur NeuroFlux surveille et régule tous les aspects du corps humain, essentiellement en 'gouvernant' le corps. En faisant cela, il améliore les performances de l'utilisateur pour la plupart des actions.",
    stats: (
      <>
        Cette augmentation spéciale peut être améliorée à l'infini. Chaque niveau de cette augmentation augmente les multiplicateurs MOST de 1 % (+{(donationBonus * 100).toFixed(6)} %), s'empilant de manière multiplicative.
      </>
    ),
    isSpecial: true,
    hacking_chance: 1.01 + donationBonus,
    hacking_speed: 1.01 + donationBonus,
    hacking_money: 1.01 + donationBonus,
    hacking_grow: 1.01 + donationBonus,
    hacking: 1.01 + donationBonus,
    strength: 1.01 + donationBonus,
    defense: 1.01 + donationBonus,
    dexterity: 1.01 + donationBonus,
    agility: 1.01 + donationBonus,
    charisma: 1.01 + donationBonus,
    hacking_exp: 1.01 + donationBonus,
    strength_exp: 1.01 + donationBonus,
    defense_exp: 1.01 + donationBonus,
    dexterity_exp: 1.01 + donationBonus,
    agility_exp: 1.01 + donationBonus,
    charisma_exp: 1.01 + donationBonus,
    company_rep: 1.01 + donationBonus,
    faction_rep: 1.01 + donationBonus,
    crime_money: 1.01 + donationBonus,
    crime_success: 1.01 + donationBonus,
    hacknet_node_money: 1.01 + donationBonus,
    hacknet_node_purchase_cost: 1 / (1.01 + donationBonus),
    hacknet_node_ram_cost: 1 / (1.01 + donationBonus),
    hacknet_node_core_cost: 1 / (1.01 + donationBonus),
    hacknet_node_level_cost: 1 / (1.01 + donationBonus),
    work_money: 1.01 + donationBonus,
    factions: Object.values(FactionNames).filter(
      (factionName) =>
        ![FactionNames.ShadowsOfAnarchy, FactionNames.Bladeburners, FactionNames.ChurchOfTheMachineGod].includes(
          factionName,
        ),
    ),
  });
}

export function initUnstableCircadianModulator(): Augmentation {
  //Time-Based Augment Test
  const randomBonuses = getRandomBonus();

  const UnstableCircadianModulatorParams: IConstructorParams = {
    name: AugmentationNames.UnstableCircadianModulator,
    moneyCost: 5e9,
    repCost: 3.625e5,
    info:
      "Une injection expérimentale de nanobots. Sa nature instable conduit à des résultats imprévisibles en fonction de votre rythme circadien.",
    factions: [FactionNames.SpeakersForTheDead],
  };
  Object.keys(randomBonuses.bonuses).forEach(
    (key) => ((UnstableCircadianModulatorParams as any)[key] = randomBonuses.bonuses[key]),
  );

  return new Augmentation(UnstableCircadianModulatorParams);
}
