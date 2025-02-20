import React, { useState, useEffect } from "react";
import { find } from "lodash";

import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Check, Lock, Create } from "@mui/icons-material";

import { Router } from "../../ui/GameRoot";
import { Page } from "../../ui/Router";
import { Player } from "@player";
import { Settings } from "../../Settings/Settings";

import { Programs } from "../Programs";
import { CreateProgramWork } from "../../Work/CreateProgramWork";

export const ProgramsSeen: string[] = [];

export function ProgramsRoot(): React.ReactElement {
  const setRerender = useState(false)[1];
  function rerender(): void {
    setRerender((old) => !old);
  }

  const programs = [...Object.values(Programs)]
    .filter((prog) => {
      const create = prog.create;
      if (create === null) return false;
      if (prog.name === "b1t_flum3.exe") {
        return create.req();
      }
      return true;
    })
    .sort((a, b) => {
      if (Player.hasProgram(a.name)) return 1;
      if (Player.hasProgram(b.name)) return -1;
      return (a.create?.level ?? 0) - (b.create?.level ?? 0);
    });

  useEffect(() => {
    programs.forEach((p) => {
      if (ProgramsSeen.includes(p.name)) return;
      ProgramsSeen.push(p.name);
    });
  }, []);

  useEffect(() => {
    const id = setInterval(rerender, 200);
    return () => clearInterval(id);
  }, []);

  const getHackingLevelRemaining = (lvl: number): number => {
    return Math.ceil(Math.max(lvl - (Player.skills.hacking + Player.skills.intelligence / 2), 0));
  };

  const getProgCompletion = (name: string): number => {
    const programFile = find(Player.getHomeComputer().programs, (p) => {
      return p.startsWith(name) && p.endsWith("%-INC");
    });
    if (!programFile) return -1;

    const res = programFile.split("-");
    if (res.length != 3) return -1;
    const percComplete = Number(res[1].slice(0, -1));
    if (isNaN(percComplete) || percComplete < 0 || percComplete >= 100) {
      return -1;
    }
    return percComplete;
  };

  return (
    <Container disableGutters maxWidth="lg" sx={{ mx: 0, mb: 10 }}>
      <Typography variant="h4">Create program</Typography>
      <Typography>
        Cette page affiche tous les programmes que vous pouvez créer. L'écriture du code d'un programme prend du temps, ce qui
        peut varier en fonction de la complexité du programme. Si vous travaillez sur la création d'un programme, vous pouvez annuler à tout moment
        temps. Votre progression sera enregistrée et vous pourrez continuer plus tard.
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", my: 1 }}>
        {programs.map((program) => {
          const create = program.create;
          if (create === null) return <></>;
          const curCompletion = getProgCompletion(program.name);

          return (
            <Box
              component={Paper}
              sx={{ p: 1, opacity: Player.hasProgram(program.name) ? 0.75 : 1 }}
              key={program.name}
            >
              <>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  {(Player.hasProgram(program.name) && <Check sx={{ mr: 1 }} />) ||
                    (create.req() && <Create sx={{ mr: 1 }} />) || <Lock sx={{ mr: 1 }} />}
                  {program.name}
                </Typography>
                {!Player.hasProgram(program.name) && create.req() && (
                  <Button
                    sx={{ my: 1, width: "100%" }}
                    onClick={(event) => {
                      if (!event.isTrusted) return;
                      Player.startWork(new CreateProgramWork({ singularity: false, programName: program.name }));
                      Player.startFocusing();
                      Router.toPage(Page.Work);
                    }}
                  >
                    Créer un programme
                  </Button>
                )}
                {Player.hasProgram(program.name) || getHackingLevelRemaining(create.level) === 0 || (
                  <Typography color={Settings.theme.hack}>
                    <b>Unlocks in:</b> {getHackingLevelRemaining(create.level)} hacking levels
                  </Typography>
                )}
                {curCompletion !== -1 && (
                  <Typography color={Settings.theme.infolight}>
                    <b>Current completion:</b> {curCompletion}%
                  </Typography>
                )}
                <Typography>{create.tooltip}</Typography>
              </>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
