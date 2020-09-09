import React, { useState, useEffect } from "react";
import styles from "./teamSelector.module.css";
import { useData } from "../../context/context";

const TeamSelector = () => {
  const data = useData();
  const [teams, changeTeams] = useState([]);
  useEffect(() => {
    if (data.isDataLoaded) {
      const newTeams = [...new Set(data.data.map((item) => item.team2))];
      const finalTeams = newTeams.map((teamName, index) => {
        let winCounts = 0;
        data.data.forEach((match) => {
          if (match.winner === teamName) winCounts++;
        });
        return {
          name: teamName,
          wins: winCounts,
        };
      });
      finalTeams.sort((a, b) => {
        if (a.wins > b.wins) return -1;
        return 1;
      });
      changeTeams(finalTeams);
    }
  }, [data.data, data.isDataLoaded]);
  return (
    <div className={styles.parent}>
      <div className={styles.upper_container}>
        <h2 className={styles.h2}>Team Statics</h2>
      </div>
      <div className={styles.team_heading}>
        <h3 className={styles.h3}>Team Name</h3>
        <h3 className={styles.h3}>Total Wins</h3>
      </div>
      <ul className={styles.team_ul}>
        {teams.map((team) => (
          <li
            key={team.name}
            className={styles.team_li}
            onClick={() => data.setTeam(team.name)}
          >
            <h3 className={styles.team_h3}>{team.name}</h3>
            <h3 className={styles.team_h3_win}>{team.wins}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TeamSelector;
