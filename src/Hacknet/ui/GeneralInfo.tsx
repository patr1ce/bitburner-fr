/**
 * React Component for the Hacknet Node UI
 *
 * Displays general information about Hacknet Nodes
 */
import React from "react";
import Typography from "@mui/material/Typography";

interface IProps {
  hasHacknetServers: boolean;
}

export function GeneralInfo(props: IProps): React.ReactElement {
  return (
    <>
      <Typography>
        Le Hacknet est un réseau global et décentralisé de machines. Il est utilisé par les pirates du monde entier pour
        partagez anonymement la puissance de calcul et effectuez des cyberattaques distribuées sans craindre d'être tracé.
      </Typography>
      {!props.hasHacknetServers ? (
        <>
          <Typography>
            {`Ici, vous pouvez acheter un Hacknet Node, une machine spécialisée qui peut se connecter ` +
              `et apporter ses ressources au réseau Hacknet. Cela vous permet de prendre ` +
              `un petit pourcentage des bénéfices provenant des piratages effectués sur le réseau. Essentiellement, ` +
              `vous louez la puissance de calcul de votre nœud.`}
          </Typography>
          <Typography>
            {`Chaque Hacknet Node que vous achetez vous rapportera passivement de l'argent. Chaque nœud Hacknet ` +
              `peut être mis à jour afin d'augmenter sa puissance de calcul et ainsi augmenter ` +
              `le profit que vous en tirez.`}
          </Typography>
        </>
      ) : (
        <>
          <Typography>
            {`Ici, vous pouvez acheter un Hacknet Server, une version améliorée du Hacknet Node. ` +
              `Les serveurs Hacknet effectueront des calculs et des opérations sur le réseau, gagnant ` +
              `vous hashes. Les hachages peuvent être dépensés pour une variété de mises à niveau différentes.`}
          </Typography>
          <Typography>
            {`Les serveurs Hacknet peuvent également être utilisés comme serveurs pour exécuter des scripts. Cependant, l'exécution de scripts ` +
              `sur un serveur réduira son taux de hachage (hachages générés par seconde). Le hachage d'un serveur Hacknet ` +
              `le taux sera réduit du pourcentage de RAM utilisé par ce serveur pour exécuter ` +
              `scripts.`}
          </Typography>


        </>
      )}
    </>
  );
}
