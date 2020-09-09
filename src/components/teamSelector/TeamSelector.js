import React, { useState, useEffect, useRef } from "react";
import styles from "./teamSelector.module.css";
import { useData } from "../../context/context";
import useMediaQuery from "../../utils/useMediaQuery";

const TeamSelector = () => {
  const isMobile = useMediaQuery(`(max-width:500px)`);
  const data = useData();
  const [teams, changeTeams] = useState([]);
  const burgerRef = useRef();

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
  console.log(isMobile);
  return (
    <>
      {isMobile ? (
        <>
          <input
            type="checkbox"
            value="false"
            className={styles.burger}
            id="burger-but"
            ref={burgerRef}
          />
          <label htmlFor="burger-but" className={styles.burger_hr_container}>
            <hr className={styles.burger_hr_top} />
            <hr className={styles.burger_hr_middle} />
            <hr className={styles.burger_hr_bottom} />
          </label>
        </>
      ) : null}
      <div className={styles.parent}>
        <div className={styles.upper_container}>
          <h2 className={styles.h2}>Total Matches : {data.data.length}</h2>
          <h2 className={styles.h2}>Total Teams : {teams.length}</h2>
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
              onClick={() => {
                if (isMobile) burgerRef.current.checked = false;
                data.setTeam(team.name);
              }}
            >
              <h3 className={styles.team_h3}>{team.name}</h3>
              <h3 className={styles.team_h3_win}>{team.wins}</h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default TeamSelector;
