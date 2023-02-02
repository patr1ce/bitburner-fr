/**
 * Root React Component for the "Active Scripts" UI page. This page displays
 * and provides information about all of the player's scripts that are currently running
 */
import React from "react";

import { ScriptProduction } from "./ScriptProduction";
import { ServerAccordions } from "./ServerAccordions";

import { WorkerScript } from "../../Netscript/WorkerScript";

import Typography from "@mui/material/Typography";

interface IProps {
  workerScripts: Map<number, WorkerScript>;
}

export function ActiveScriptsPage(props: IProps): React.ReactElement {
  return (
    <>
      <Typography>
        Cette page affiche une liste de tous vos scripts en cours d'exécution sur chaque machine. Ça aussi
        fournit des informations sur la production de chaque script. Les scripts sont classés par le nom d'hôte des serveurs
        sur lesquels ils tournent.
      </Typography>

      <ScriptProduction />
      <ServerAccordions {...props} />
    </>
  );
}
