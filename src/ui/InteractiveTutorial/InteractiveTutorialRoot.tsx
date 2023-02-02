import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { ITutorialEvents } from "./ITutorialEvents";
import { CopyableText } from "../React/CopyableText";

import ListItem from "@mui/material/ListItem";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LastPageIcon from "@mui/icons-material/LastPage";
import HelpIcon from "@mui/icons-material/Help";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

import {
  iTutorialPrevStep,
  iTutorialNextStep,
  ITutorial,
  iTutorialSteps,
  iTutorialEnd,
} from "../../InteractiveTutorial";

interface IContent {
  content: React.ReactElement;
  canNext: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      borderBottom: "1px solid " + theme.palette.primary.main,
    },
    code: {
      whiteSpace: "pre",
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export function InteractiveTutorialRoot(): React.ReactElement {
  const classes = useStyles();

  const tutorialScriptName = `n00dles.js`;

  const contents: { [number: string]: IContent | undefined } = {
    [iTutorialSteps.Start as number]: {
      content: (
        <>
          <Typography>
            Bienvenu à Bitburner, un RPG incrémental sur le thème cyberpunk! Le jeu à lieu dans un futur noir et distopique... En l'an 2077...
            <br />
            <br />
            Ce tutoriel va te montrer les bases du jeu. Tu peux sauter le tutoriel à n'importe quel moment.
            <br />
            <br />
            Tu peux aussi fermer cette fenetre ou cacher temporairement ce tutoriel.
          </Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.GoToCharacterPage as number]: {
      content: (
        <>
          <Typographie>Commençons par nous diriger vers la page des statistiques. Cliquez</Typographie>
          <ListItem>
            <EqualizerIcon color={"error"} />
            <Typography color={"error"}>Statistiques</Typography>
          </ListItem>

          <Typography>dans le menu de navigation principal (côté gauche de l'écran)</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.CharacterPage as number]: {
      content: (
        <>
          <ListItem>
            <EqualizerIcon color={"primary"} />
            <Typography color={"primary"}>Statistiques</Typography>
          </ListItem>
          <Typographie>
            affiche de nombreuses informations importantes sur votre progression, telles que vos compétences, votre argent et vos bonus.
          </Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.CharacterGoToTerminalPage as number]: {
      content: (
        <>
          <Typography>Allons au terminal de votre ordinateur en cliquant sur</Typography>
          <ListItem>
            <LastPageIcon color={"error"} />
            <Typography color={"error"}>Terminal</Typography>
          </ListItem>
          <Typographie>dans le menu de navigation principal.</Typographie>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalIntro as number]: {
      content: (
        <>
          <ListItem>
            <LastPageIcon color={"primary"} />
            <Typography color={"primary"}>Terminal</Typography>
          </ListItem>
          <Typography>
            est utilisé pour s'interfacer avec votre ordinateur personnel ainsi qu'avec toutes les autres machines du monde entier.
          </Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.TerminalHelp as number]: {
      content: (
        <>
          <Typography>Essayons. Commencez par saisir</Typography>
          <Typography classes={{ root : classes.textfield }}>{"[home ~/]> help"}</Typography>
          <Typography>(N'oubliez pas d'appuyer sur Entrée après avoir tapé la commande)</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalLs as number]: {
      content: (
        <>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> help"}</Typography>
          <Typography>
            affiche une liste de toutes les commandes Terminal disponibles, comment les utiliser et une description de ce qu'elles font.{" "}
            <br />
            <br />
            Essayons une autre commande. Entrer
          </Typography>

          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> ls"}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalScan as number]: {
      content: (
        <>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> ls"}</Typography>
          <Typography>
            {" "}
            est une commande de base qui affiche les fichiers sur l'ordinateur. En ce moment, cela montre que vous avez un programme appelé {" "}
            NUKE.exe sur votre ordinateur. Nous verrons ce que cela fait plus tard. <br />
            <br />
            À l'aide du terminal de votre ordinateur personnel, vous pouvez vous connecter à d'autres machines dans le monde entier. Faisons cela
            maintenant en entrant d'abord
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> scan"}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalScanAnalyze1 as number]: {
      content: (
        <>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> scan"}</Typography>
          <Typography>
            affiche toutes les connexions réseau disponibles. En d'autres termes, il affiche une liste de tous les serveurs qui peuvent être
            connecté à partir de votre machine actuelle. Un serveur est identifié par son nom d'hôte. <br />
            <br />
            C'est super et tout, mais il y a tellement de serveurs. Dans lequel devriez-vous aller ?{" "}
          </Typographie>

          <Typography classes={{ root : classes.textfield }}>{"[home ~/]> scan-analyze"}</Typography>
          <Typographie> donne des informations plus détaillées sur les serveurs du réseau. Essayez-le maintenant !</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalScanAnalyze2 as number]: {
      content: (
        <>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> scan-analyze"}</Typography>
          <Typography>
            affiche des informations plus détaillées sur chaque serveur auquel vous pouvez vous connecter (serveurs distants de
            à un nœud de distance). <br />
            <br /> Il est également possible d'exécuter une analyse par balayage avec une profondeur plus élevée. Essayons une profondeur de deux avec le
            commande suivante :{" "}
          </Typography>

          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> scan-analyze 2"}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalConnect as number]: {
      content: (
        <>
          <Typography>
            Vous pouvez maintenant voir des informations sur tous les serveurs situés jusqu'à deux nœuds, ainsi que comprendre comment
            accéder à ces serveurs via le réseau. Vous ne pouvez vous connecter qu'à un serveur distant d'un nœud. Pour
            connecter à une machine, utiliser
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> connect hostname"}</Typography>

          <Typography>From the results of </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> scan-analyze 2"}</Typography>

          <Typography>
            {" "}
            nous pouvons voir que le serveur n00dles n'est qu'à un nœud. Connectons-y maintenant en utilisant :
          </Typography>

          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> connect n00dles"}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalAnalyze as number]: {
      content: (
        <>
          <Typography>
            Vous êtes maintenant connecté à une autre machine ! Que pouvez-vous faire maintenant? Vous pouvez le pirater !
            <br />
            <br /> En l'an 2077, la monnaie est devenue numérique et décentralisée. Les particuliers et les entreprises stockent leurs
            l'argent sur les serveurs et les ordinateurs. En utilisant vos capacités de piratage, vous pouvez pirater des serveurs pour voler de l'argent et gagner
            de l'expérience. <br />
            <br />
            Avant d'essayer de pirater un serveur, vous devez exécuter des diagnostics à l'aide de {" "}
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[n00dles ~/]> analyze"}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalNuke as number]: {
      content: (
        <>
          <Typography>When </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[n00dles ~/]> analyze"}</Typography>

          <Typography>
            termine son exécution, il affichera des informations utiles sur le piratage du serveur. <br />
            <br /> Pour ce serveur, la compétence de piratage requise n'est que de 1, ce qui signifie que vous pouvez le pirater dès maintenant.
            Cependant, pour pirater un serveur, vous devez d'abord obtenir un accès root. Le programme NUKE.exe que nous avons vu précédemment
            sur votre ordinateur personnel se trouve un virus qui vous accordera un accès root à une machine s'il y en a suffisamment
            ports.
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[n00dles ~/]> analyze"}</Typography>

          <Typography>
            {" "}
            montre qu'il n'est pas nécessaire d'avoir des ports ouverts sur cette machine pour que le virus NUKE fonctionne, alors allez-y
            et exécutez le virus en utilisant {" "}
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[n00dles ~/]> run NUKE.exe"}</Typography>

          <Typography></Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalManualHack as number]: {
      content: (
        <>
          <Typography>Vous avez maintenant un accès root ! Vous pouvez pirater le serveur en utilisant </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[n00dles ~/]> hack"}</Typography>

          <Typography> Essayez de le faire maintenant.</Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.TerminalHackingMechanics as number]: {
      content: (
        <Typography>
         Vous essayez maintenant de pirater le serveur. Effectuer un hack prend du temps et n'a qu'un certain pourcentage
          chance de succès. Ce temps et cette chance de réussite sont déterminés par une variété de facteurs, y compris votre piratage
          compétence et le niveau de sécurité du serveur.
          <br />
          <br />
          Si votre tentative de pirater le serveur réussit, vous volerez un certain pourcentage du total du serveur
          de l'argent. Ce pourcentage est affecté par votre compétence de piratage et le niveau de sécurité du serveur.
          <br />
          <br />
          La somme d'argent sur un serveur n'est pas illimitée. Donc, si vous piratez constamment un serveur et épuisez son argent,
          alors vous rencontrerez des rendements décroissants dans votre piratage. Vous devrez utiliser {" "}
          <Typography classes={{ root : classes.textfield }}>{"[n00dles ~/]> grow"}</Typography>
          qui incite l'entreprise à ajouter de l'argent à son serveur et{" "}
          <Typography classes={{ root : classes.textfield }}>{"[n00dles ~/]> affaiblir"}</Typography>
          ce qui augmente la vitesse de piratage et de croissance.
        </Typography>
      ),
      canNext: true,
    },
    [iTutorialSteps.TerminalGoHome as number]: {
      content: (
        <>
          <Typography>Depuis n'importe quel serveur, vous pouvez rentrer chez vous en utilisant</Typography>
          <Typography classes={{ root : classes.textfield }}>{"[n00dles ~/]> home"}</Typography>

          <Typography>Rentrons à la maison avant de créer notre premier script !</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalCreateScript as number]: {
      content: (
        <>
          <Typographie>
            Le piratage est le mécanisme de base du jeu et est nécessaire pour progresser. Cependant, vous ne voulez pas être
            piratage manuel tout le temps. Vous pouvez automatiser votre piratage en écrivant des scripts !
            <br />
            <br />
            Pour créer un nouveau script ou en modifier un existant, vous pouvez utiliser {" "}
          </Typographie>
          <Typography classes={{ root : classes.textfield }}>{"[home ~/]> nano"}</Typography>

          <Typographie>Les scripts doivent se terminer par l'extension .js. Faisons maintenant un script en saisissant </Typography>
          <Typography classes={{ root : classes.textfield }}>{`[home ~/]> nano ${tutorialScriptName}`}</Typography>

          <Typographie>
            après la fin de l'exécution de la commande hack (Note : appuyer sur ctrl + c mettra fin à une commande comme hack avant qu'elle finisse)
          </Typographie>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalTypeScript as number]: {
      content: (
        <>
          <Typography>
            C'est l'éditeur de script. Vous pouvez l'utiliser pour programmer vos scripts. Copiez et collez le code suivant dans
            l'éditeur de script : <br />
          </Typography>

          <Typography classes={{ root: classes.code }}>
            {
              <CopyableText
                value={`export async function main(ns) {
	while(true) {
		await ns.hack('n00dles');
	}
}`}
              />
            }
          </Typography>
          <Typography>
            For anyone with basic programming experience, this code should be straightforward. This script will
            continuously hack the n00dles server.
            <br />
            <br />
            To save and close the script editor, press the button in the bottom left, or press ctrl + s then ctrl + b.
          </Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalFree as number]: {
      content: (
        <>
          <Typography>
            Now we'll run the script. Scripts require a certain amount of RAM to run, and can be run on any machine
            which you have root access to. Different servers have different amounts of RAM. You can also purchase more
            RAM for your home server.
            <br />
            <br />
            To check how much RAM is available on this machine, enter
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[home ~/]> free"}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalRunScript as number]: {
      content: (
        <>
          <Typography>
            We have 8GB of free RAM on this machine, which is enough to run our script. Let's run our script using
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{`[home ~/]> run ${tutorialScriptName}`}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalGoToActiveScriptsPage as number]: {
      content: (
        <>
          <Typography>
            Your script is now running! It will continuously run in the background and will automatically stop if the
            code ever completes (the {tutorialScriptName} will never complete because it runs an infinite loop). <br />
            <br />
            These scripts can passively earn you income and hacking experience. Your scripts will also earn money and
            experience while you are offline, although at a slightly slower rate. <br />
            <br />
            Let's check out some statistics for our running scripts by clicking{" "}
          </Typography>
          <ListItem>
            <StorageIcon color={"error"} />
            <Typography color={"error"}>Active Scripts</Typography>
          </ListItem>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.ActiveScriptsPage as number]: {
      content: (
        <>
          <Typography>
            This page displays information about all of your scripts that are running across every server. You can use
            this to gauge how well your scripts are doing. Let's go back to
          </Typography>
          <ListItem>
            <LastPageIcon color={"error"} />
            <Typography color={"error"}>Terminal</Typography>
          </ListItem>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.ActiveScriptsToTerminal as number]: {
      content: (
        <>
          <Typography>
            One last thing about scripts, each active script contains logs that detail what it's doing. We can check
            these logs using the tail command. Do that now for the script we just ran by typing{" "}
          </Typography>
          <Typography classes={{ root: classes.textfield }}>{`[home ~/]> tail ${tutorialScriptName}`}</Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalTailScript as number]: {
      content: (
        <>
          <Typography>
            The log for this script won't show much right now (it might show nothing at all) because it just started
            running...but check back again in a few minutes! <br />
            <br />
            This covers the basics of hacking. To learn more about writing scripts, select
          </Typography>
          <ListItem>
            <HelpIcon color={"primary"} />
            <Typography color={"primary"}>Tutorial</Typography>
          </ListItem>
          <Typography>
            in the main navigation menu to look at the documentation.
            <br />
            <br />
            For now, let's move on to something else!
          </Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.GoToHacknetNodesPage as number]: {
      content: (
        <>
          <Typography>
            Hacking is not the only way to earn money. One other way to passively earn money is by purchasing and
            upgrading Hacknet Nodes. Let's go to
          </Typography>
          <ListItem>
            <AccountTreeIcon color={"error"} />
            <Typography color={"error"}>Hacknet</Typography>
          </ListItem>
          <Typography>through the main navigation menu now.</Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.HacknetNodesIntroduction as number]: {
      content: (
        <Typography>
          Here you can purchase new Hacknet Nodes and upgrade your existing ones. Let's purchase a new one now.
        </Typography>
      ),
      canNext: true,
    },
    [iTutorialSteps.HacknetNodesGoToWorldPage as number]: {
      content: (
        <>
          <Typography>
            You just purchased a Hacknet Node! This Hacknet Node will passively earn you money over time, both online
            and offline. When you get enough money, you can upgrade your newly-purchased Hacknet Node below.
            <br />
            <br />
            Let's go to
          </Typography>
          <ListItem>
            <LocationCityIcon color={"error"} />
            <Typography color={"error"}>City</Typography>
          </ListItem>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.WorldDescription as number]: {
      content: (
        <>
          <Typography>
            This page lists all of the different locations you can currently travel to. Each location has something that
            you can do. There's a lot of content out in the world, make sure you explore and discover!
            <br />
            <br />
            Lastly, click on
          </Typography>
          <ListItem>
            <HelpIcon color={"error"} />
            <Typography color={"error"}>Tutorial</Typography>
          </ListItem>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.TutorialPageInfo as number]: {
      content: (
        <Typography>
          This page contains a lot of different documentation about the game's content and mechanics. I know it's a lot,
          but I highly suggest you read (or at least skim) through this before you start playing.
          <br />
          <br />
          The{" "}
          <a href="https://bitburner.readthedocs.io/en/latest/guidesandtips/gettingstartedguideforbeginnerprogrammers.html">
            Getting Started
          </a>{" "}
          contains the guide for new players, navigating you through most of early game.
          <br />
          <br />
          That's the end of the tutorial. Hope you enjoy the game!
        </Typography>
      ),
      canNext: true,
    },
    [iTutorialSteps.End as number]: {
      content: <Typography></Typography>,
      canNext: true,
    },
  };

  const setRerender = useState(false)[1];
  function rerender(): void {
    setRerender((old) => !old);
  }

  useEffect(() => {
    return ITutorialEvents.subscribe(rerender);
  }, []);
  const step = ITutorial.currStep;
  const content = contents[step];
  if (content === undefined) throw new Error("error in the tutorial");
  return (
    <>
      <Paper square sx={{ maxWidth: "70vw", p: 2 }}>
        {content.content}
        {step !== iTutorialSteps.TutorialPageInfo && (
          <>
            {step !== iTutorialSteps.Start && (
              <IconButton onClick={iTutorialPrevStep} aria-label="previous">
                <ArrowBackIos />
              </IconButton>
            )}
            {(content.canNext || ITutorial.stepIsDone[step]) && (
              <IconButton onClick={iTutorialNextStep} aria-label="next">
                <ArrowForwardIos />
              </IconButton>
            )}
          </>
        )}
        <br />
        <br />
        <Button onClick={iTutorialEnd}>
          {step !== iTutorialSteps.TutorialPageInfo ? "SKIP TUTORIAL" : "FINISH TUTORIAL"}
        </Button>
      </Paper>
    </>
  );
}
