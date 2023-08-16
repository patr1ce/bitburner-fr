import React from "react";
import { Message } from "./Message";
import { AugmentationNames } from "../Augmentation/data/AugmentationNames";
import { Router } from "../ui/GameRoot";
import { Programs } from "../Programs/Programs";
import { Player } from "@player";
import { Page } from "../ui/Router";
import { GetServer } from "../Server/AllServers";
import { SpecialServers } from "../Server/data/SpecialServers";
import { Settings } from "../Settings/Settings";
import { dialogBoxCreate } from "../ui/React/DialogBox";
import { FactionNames } from "../Faction/data/FactionNames";
import { Server } from "../Server/Server";

//Sends message to player, including a pop up
function sendMessage(msg: Message, forced = false): void {
  if (forced || !Settings.SuppressMessages) {
    showMessage(msg.filename);
  }
  addMessageToServer(msg);
}

function showMessage(name: MessageFilenames): void {
  const msg = Messages[name];
  if (!(msg instanceof Message)) throw new Error("trying to display nonexistent message");
  dialogBoxCreate(
    <>
      Message reçu d'un expéditeur inconnu :
      <br />
      <br />
      <i>{msg.msg}</i>
      <br />
      <br />
      Ce message a été enregistré sous le nom {msg.filename} sur ton ordinateur personnel.
    </>,
  );
}

//Adds a message to a server
function addMessageToServer(msg: Message): void {
  //Short-circuit if the message has already been saved
  if (recvd(msg)) {
    return;
  }
  const server = GetServer("home");
  if (server == null) {
    throw new Error("Le serveur home n'existe pas. Tu as fait une erreur.");
  }
  server.messages.push(msg.filename);
}

//Returns whether the given message has already been received
function recvd(msg: Message): boolean {
  const server = GetServer("home");
  if (server == null) {
    throw new Error("Le serveur home n'existe pas. Tu as fait une erreur.");
  }
  return server.messages.includes(msg.filename);
}

//Checks if any of the 'timed' messages should be sent
function checkForMessagesToSend(): void {
  if (Router.page() === Page.BitVerse) return;
  const jumper0 = Messages[MessageFilenames.Jumper0];
  const jumper1 = Messages[MessageFilenames.Jumper1];
  const jumper2 = Messages[MessageFilenames.Jumper2];
  const jumper3 = Messages[MessageFilenames.Jumper3];
  const jumper4 = Messages[MessageFilenames.Jumper4];
  const cybersecTest = Messages[MessageFilenames.CyberSecTest];
  const nitesecTest = Messages[MessageFilenames.NiteSecTest];
  const bitrunnersTest = Messages[MessageFilenames.BitRunnersTest];
  const truthGazer = Messages[MessageFilenames.TruthGazer];
  const redpill = Messages[MessageFilenames.RedPill];

  if (Player.hasAugmentation(AugmentationNames.TheRedPill, true)) {
    //Get the world daemon required hacking level
    const worldDaemon = GetServer(SpecialServers.WorldDaemon);
    if (!(worldDaemon instanceof Server)) {
      throw new Error("The world daemon is not a server???? Please un-break reality");
    }
    //If the daemon can be hacked, send the player icarus.msg
    if (Player.skills.hacking >= worldDaemon.requiredHackingSkill) {
      sendMessage(redpill, Player.sourceFiles.length === 0);
    }
    //If the daemon cannot be hacked, send the player truthgazer.msg a single time.
    else if (!recvd(truthGazer)) {
      sendMessage(truthGazer);
    }
  } else if (!recvd(jumper0) && Player.skills.hacking >= 25) {
    sendMessage(jumper0);
    const flightName = Programs.Flight.name;
    const homeComp = Player.getHomeComputer();
    if (!homeComp.programs.includes(flightName)) {
      homeComp.programs.push(flightName);
    }
  } else if (!recvd(jumper1) && Player.skills.hacking >= 40) {
    sendMessage(jumper1);
  } else if (!recvd(cybersecTest) && Player.skills.hacking >= 50) {
    sendMessage(cybersecTest);
  } else if (!recvd(jumper2) && Player.skills.hacking >= 175) {
    sendMessage(jumper2);
  } else if (!recvd(nitesecTest) && Player.skills.hacking >= 200) {
    sendMessage(nitesecTest);
  } else if (!recvd(jumper3) && Player.skills.hacking >= 350) {
    sendMessage(jumper3);
  } else if (!recvd(jumper4) && Player.skills.hacking >= 490) {
    sendMessage(jumper4);
  } else if (!recvd(bitrunnersTest) && Player.skills.hacking >= 500) {
    sendMessage(bitrunnersTest);
  }
}

export enum MessageFilenames {
  Jumper0 = "j0.msg",
  Jumper1 = "j1.msg",
  Jumper2 = "j2.msg",
  Jumper3 = "j3.msg",
  Jumper4 = "j4.msg",
  CyberSecTest = "csec-test.msg",
  NiteSecTest = "nitesec-test.msg",
  BitRunnersTest = "19dfj3l1nd.msg",
  TruthGazer = "truthgazer.msg",
  RedPill = "icarus.msg",
}

//Reset
const Messages: Record<MessageFilenames, Message> = {
  //jump3R Messages
  [MessageFilenames.Jumper0]: new Message(
    MessageFilenames.Jumper0,
    "Je sais que tu peux le ressentir. Je sais que tu le cherches. " +
    "C'est pourquoi tu passes nuit après " +
    "nuit devant ton ordinateur. \n\nC'est réel, je l'ai vu. Et je peux " +
    "t'aider à le trouver. Mais pas tout de suite. Tu n'es pas encore prêt·e.\n\n" +
    "Utilise ce programme pour suivre ta progression\n\n" +
    "Le programme fl1ght.exe a été ajouté à ton ordinateur personnel.\n\n" +
    "-jump3R",
  ),

  [MessageFilenames.Jumper1]: new Message(
    MessageFilenames.Jumper1,
    "Bientôt, tu seras contacté par un groupe de hackers connu sous le nom de ${FactionNames.CyberSec}. " +
    "Ils peuvent t'aider dans ta recherche. \n\n" +
    "Tu devrais les rejoindre, gagner leur faveur, et " +
    "les exploiter pour leurs Améliorations. Mais ne leur fais pas confiance. " +
    "Ils ne sont pas ce qu'ils semblent être. Personne ne l'est.\n\n" +
    "-jump3R",
  ),

  [MessageFilenames.Jumper2]: new Message(
    MessageFilenames.Jumper2,
    "N'essaie pas de sauver le monde. Il n'y a pas de monde à sauver. Si tu veux trouver la vérité, préoccupe-toi seulement de toi-même. L'éthique et les + " +
    "morales te tueront. \n\nMéfie-toi d'un groupe de piratage connu sous le nom de ${FactionNames.NiteSec}." +
    "\n\n-jump3R,",
  ),

  [MessageFilenames.Jumper3]: new Message(
    MessageFilenames.Jumper3,
    "Tu dois apprendre à marcher avant de pouvoir courir. Et tu dois " +
    "courir avant de pouvoir voler. Cherche ${FactionNames.TheBlackHand}. \n\n" +
    "I.I.I.I \n\n-jump3R",
  ),

  [MessageFilenames.Jumper4]: new Message(
    MessageFilenames.Jumper4,
    "Pour trouver ce que tu recherches, tu dois comprendre les bits. " +
    "Les bits sont tout autour de nous. Les runners vont t'aider.\n\n" +
    "-jump3R",
  ),

  //Messages from hacking factions
  [MessageFilenames.CyberSecTest]: new Message(
    MessageFilenames.CyberSecTest,
    "Nous te surveillons. Tes compétences sont très impressionnantes. Mais tu gaspilles " +
      "ton talent. Si tu te joins à nous, tu pourras mettre tes compétences à bon usage et changer " +
      "le monde pour le meilleur. Si tu nous rejoins, nous pourrons débloquer ton plein potentiel. \n\n" +
      "Mais d'abord, tu dois passer notre test. Trouve et installe la porte dérobée sur notre serveur. \n\n" +
      `-${FactionNames.CyberSec}`,
  ),

  [MessageFilenames.NiteSecTest]: new Message(
    MessageFilenames.NiteSecTest,
    "Les gens disent que les gouvernements et les entreprises corrompus dirigent le monde. " +
      "Oui, peut-être le font-ils. Mais sais-tu qui tout le monde craint vraiment ? Des personnes " +
      "comme nous. Parce qu'ils ne peuvent pas se cacher de nous. Parce qu'ils ne peuvent pas combattre les ombres " +
      "et les idées avec des balles. \n\n" +
      "Rejoins-nous, et les gens te craindront aussi. \n\n" +
      "Trouve et installe la porte dérobée sur notre serveur, avmnite-02h. Ensuite, nous te recontacterons." +
      `\n\n-${FactionNames.NiteSec}`,
  ),

  [MessageFilenames.BitRunnersTest]: new Message(
    MessageFilenames.BitRunnersTest,
    "Nous savons ce que tu fais. Nous savons ce qui te pousse. Nous savons " +
      "ce que tu cherches. \n\n " +
      "Nous pouvons t'aider à trouver les réponses.\n\n" +
      "run4theh111z",
  ),

  //Messages to guide players to the daemon
  [MessageFilenames.TruthGazer]: new Message(
    MessageFilenames.TruthGazer,
    //"THE TRUTH CAN NO LONGER ESCAPE YOUR GAZE"
    "@&*($#@&__TH3__#@A&#@*)__TRU1H__(*)&*)($#@&()E&R)W&\n" +
      "%@*$^$()@&$)$*@__CAN__()(@^#)@&@)#__N0__(#@&#)@&@&(\n" +
      "*(__LON6ER__^#)@)(()*#@)@__ESCAP3__)#(@(#@*@()@(#*$\n" +
      "()@)#$*%)$#()$#__Y0UR__(*)$#()%(&(%)*!)($__GAZ3__#(",
  ),

  [MessageFilenames.RedPill]: new Message(
    MessageFilenames.RedPill,
    //"FIND THE-CAVE"
    "@)(#V%*N)@(#*)*C)@#%*)*V)@#(*%V@)(#VN%*)@#(*%\n" +
      ")@B(*#%)@)M#B*%V)____FIND___#$@)#%(B*)@#(*%B)\n" +
      "@_#(%_@#M(BDSPOMB__THE-CAVE_#)$(*@#$)@#BNBEGB\n" +
      "DFLSMFVMV)#@($*)@#*$MV)@#(*$V)M#(*$)M@(#*VM$)",
  ),
};

export { Messages, checkForMessagesToSend, showMessage };
