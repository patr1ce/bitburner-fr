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
          <Typography>Commençons par nous diriger vers la page des statistiques. Cliquez</Typography>
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
          <Typography>
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
          <Typography>dans le menu de navigation principal.</Typography>
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
          </Typography>

          <Typography classes={{ root : classes.textfield }}>{"[home ~/]> scan-analyze"}</Typography>
          <Typography> donne des informations plus détaillées sur les serveurs du réseau. Essayez-le maintenant !</Typography>
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
            un nœud de distance). <br />
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

          <Typography>D'après les résultats de </Typography>
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
            Vous êtes maintenant connecté à une autre machine ! Que pouvez-vous faire maintenant? Vous pouvez la pirater !
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
          <Typography>Quand </Typography>
          <Typography classes={{ root: classes.textfield }}>{"[n00dles ~/]> analyze"}</Typography>

          <Typography>
            termine son exécution, il affichera des informations utiles sur le piratage du serveur. <br />
            <br /> Pour ce serveur, la compétence de piratage requise n'est que de 1, ce qui signifie que vous pouvez le pirater dès maintenant.
            Cependant, pour pirater un serveur, vous devez d'abord obtenir un accès root. Le programme NUKE.exe que nous avons vu précédemment
            sur votre ordinateur personnel se trouve un virus qui vous accordera un accès root à une machine s'il y a suffisamment de
            ports ouverts.
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
         Vous essayez maintenant de pirater le serveur. Effectuer un hack prend du temps et n'a qu'un certain pourcentage de
          chance de succès. Ce temps et cette chance de réussite sont déterminés par une variété de facteurs, y compris votre compétence de piratage
          et le niveau de sécurité du serveur.
          <br />
          <br />
          Si votre tentative de pirater le serveur réussit, vous volerez un certain pourcentage du total de l'argent du serveur.
          Ce pourcentage est affecté par votre compétence de piratage et le niveau de sécurité du serveur.
          <br />
          <br />
          La somme d'argent sur un serveur n'est pas illimitée. Donc, si vous piratez constamment un serveur et épuisez son argent,
          alors vous rencontrerez des rendements décroissants dans votre piratage. Vous devrez utiliser {" "}
          <Typography classes={{ root : classes.textfield }}>{"[n00dles ~/]> grow"}</Typography>
          qui incite l'entreprise à ajouter de l'argent à son serveur et{" "}
          <Typography classes={{ root : classes.textfield }}>{"[n00dles ~/]> weaken"}</Typography>
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
          <Typography>
            Le piratage est le mécanisme de base du jeu et est nécessaire pour progresser. Cependant, si vous ne voulez pas
            pirater manuellement tout le temps. Vous pouvez automatiser votre piratage en écrivant des scripts !
            <br />
            <br />
            Pour créer un nouveau script ou en modifier un existant, vous pouvez utiliser {" "}
          </Typography>
          <Typography classes={{ root : classes.textfield }}>{"[home ~/]> nano"}</Typography>

          <Typography>Les scripts doivent se terminer par l'extension .js. Faisons maintenant un script en saisissant </Typography>
          <Typography classes={{ root : classes.textfield }}>{`[home ~/]> nano ${tutorialScriptName}`}</Typography>

          <Typography>
            après la fin de l'exécution de la commande hack (Note : appuyer sur ctrl + c mettra fin à une commande comme hack avant qu'elle finisse)
          </Typography>
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
            Pour toute personne ayant une expérience de programmation de base, ce code devrait être simple. Ce script va
            pirater en permanence le serveur n00dles.
            <br />
            <br />
            Pour enregistrer et fermer l'éditeur de script, appuyez sur le bouton en bas à gauche, ou appuyez sur ctrl + s puis ctrl + b.
          </Typography>
        </>
      ),
      canNext: false,
    },
    [iTutorialSteps.TerminalFree as number]: {
      content: (
        <>
          <Typography>
            Nous allons maintenant exécuter le script. Les scripts nécessitent une certaine quantité de RAM pour s'exécuter et peuvent être exécutés sur n'importe quelle machine
            auquel vous avez un accès root. Différents serveurs ont différentes quantités de RAM. Vous pouvez également acheter plus
            RAM pour votre serveur domestique.
            <br />
            <br />
            Pour vérifier la quantité de RAM disponible sur cette machine, entrez
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
            Nous avons 8 Go de RAM libre sur cette machine, ce qui est suffisant pour exécuter notre script. Exécutons notre script en utilisant
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
            Votre script est maintenant en cours d'exécution ! Il fonctionnera en continu en arrière-plan et s'arrêtera automatiquement si le
            code ne se termine jamais (le {tutorialScriptName} ne se terminera jamais car il exécute une boucle infinie). <br />
            <br />
            Ces scripts peuvent vous rapporter passivement des revenus et de l'expérience de piratage. Vos scripts rapporteront également de l'argent et
            expérience lorsque vous êtes hors ligne, bien qu'à un rythme légèrement plus lent. <br />
            <br />
            Examinons quelques statistiques sur nos scripts en cours d'exécution en cliquant sur {" "}
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
            Cette page affiche des informations sur tous vos scripts qui s'exécutent sur chaque serveur. Vous pouvez utiliser
            cela pour évaluer la qualité de vos scripts. Revenons à
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
            Une dernière chose à propos des scripts, chaque script actif contient des journaux qui détaillent ce qu'il fait. Nous pouvons vérifier
            ces journaux à l'aide de la commande tail. Faites-le maintenant pour le script que nous venons d'exécuter en tapant {" "}
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
            Le journal de ce script n'affichera pas grand-chose pour le moment (il pourrait ne rien afficher du tout) car il vient de commencer
            en cours d'exécution... mais revenez dans quelques minutes ! <br />
            <br />
            Cela couvre les bases du piratage. Pour en savoir plus sur l'écriture de scripts, sélectionnez
          </Typography>
          <ListItem>
            <HelpIcon color={"primary"} />
            <Typography color={"primary"}>Tutorial</Typography>
          </ListItem>
          <Typography>
            dans le menu de navigation principal pour consulter la documentation.
            <br />
            <br />
            Pour l'instant, passons à autre chose !
          </Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.GoToHacknetNodesPage as number]: {
      content: (
        <>
          <Typography>
            Le piratage n'est pas le seul moyen de gagner de l'argent. Une autre façon de gagner passivement de l'argent est d'acheter et
            mettre à niveau des nœuds Hacknet. Allons à
          </Typography>
          <ListItem>
            <AccountTreeIcon color={"error"} />
            <Typography color={"error"}>Hacknet</Typography>
          </ListItem>
          <Typography>dans le menu de navigation principal maintenant.</Typography>
        </>
      ),
      canNext: true,
    },
    [iTutorialSteps.HacknetNodesIntroduction as number]: {
      content: (
        <Typography>
          Ici, vous pouvez acheter de nouveaux nœuds Hacknet et mettre à niveau vos nœuds existants. Achetons-en un nouveau maintenant.
        </Typography>
      ),
      canNext: true,
    },
    [iTutorialSteps.HacknetNodesGoToWorldPage as number]: {
      content: (
        <>
          <Typography>
            Vous venez d'acheter un Hacknet Node ! Ce nœud Hacknet vous rapportera passivement de l'argent au fil du temps, à la fois en ligne
            et hors ligne. Lorsque vous obtenez suffisamment d'argent, vous pouvez mettre à niveau votre nœud Hacknet nouvellement acheté ci-dessous.
            <br />
            <br />
            Allons à
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
            Cette page répertorie tous les différents endroits où vous pouvez actuellement vous rendre. Chaque emplacement a quelque chose que
            tu peux faire. Il y a beaucoup de contenu dans le monde, assurez-vous d'explorer et de découvrir !
            <br />
            <br />
            Cliquez enfin sur
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
          Cette page contient de nombreuses documentations différentes sur le contenu et les mécanismes du jeu. je sais c'est beaucoup,
          mais je vous suggère fortement de lire (ou au moins de parcourir) ceci avant de commencer à jouer.
          <br />
          <br />
          Le{" "}
          <a href="https://bitburner.readthedocs.io/en/latest/guidesandtips/gettingstartedguideforbeginnerprogrammers.html">
            Getting Started
          </a>{" "}
          contient le guide pour les nouveaux joueurs, vous guidant à travers la majeure partie du début du jeu.
          <br />
          <br />
          C'est la fin du tutoriel. J'espère que vous apprécierez le jeu!
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
          {step !== iTutorialSteps.TutorialPageInfo ? "SAUTER LE TUTORIEL" : "TERMINER LE TUTORIEL"}
        </Button>
      </Paper>
    </>
  );
}
