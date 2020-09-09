import React, { useState, useEffect } from "react";
import styles from "./chartSpace.module.css";

import Chart from "../charts/Chart";

import { useData } from "../../context/context";
import { buildOptions } from "./ChartSpace";
import { colors, hexToRgb } from "../../utils/colors";

const ChartSpace = () => {
  const ipl_data = useData();
  const [seasons, changeSeasons] = useState([]);
  const [cities, changeCities] = useState([]);
  const [teams, changeTeams] = useState([]);
  const [players, changePlayers] = useState([]);

  useEffect(() => {
    if (ipl_data.isDataLoaded) {
      const newSeasons = [
        ...new Set(ipl_data.data.map((match) => match.season)),
      ];
      newSeasons.sort((a, b) => {
        if (Number(a) < Number(b)) return -1;
        return 1;
      });
      changeSeasons(newSeasons);
      const newCities = [...new Set(ipl_data.data.map((match) => match.city))];
      changeCities(newCities);
      const newTeams = [...new Set(ipl_data.data.map((match) => match.team1))];
      changeTeams(newTeams);
      const newPlayers = [
        ...new Set(ipl_data.data.map((match) => match.player_of_match)),
      ];
      let finalPlayers = newPlayers.map((player) => {
        let matchCount = 0;
        ipl_data.data.forEach((match) => {
          if (match.player_of_match === player) matchCount++;
        });
        return { name: player, count: matchCount };
      });
      finalPlayers.sort((a, b) => {
        if (a.count > b.count) return -1;
        return 1;
      });
      finalPlayers = finalPlayers.slice(0, 10);
      changePlayers(finalPlayers);
    }
  }, [ipl_data.data, ipl_data.isDataLoaded]);
  return (
    <div className={styles.chart_space}>
      <Chart
        type="bar"
        data={{
          labels: teams,
          datasets: [
            {
              data: teams.map((team) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (match.team1 === team || match.team2 === team)
                    matchCount++;
                });
                return matchCount;
              }),

              borderColor: colors,
              backgroundColor: colors.map((color) => hexToRgb(color)),
              borderWidth: 2,
              fill: false,
            },
          ],
        }}
        options={{
          ...buildOptions("Total matches played by each team", true),
          legend: { display: false },
        }}
        width="65rem"
      />
      <Chart
        type="bar"
        data={{
          labels: players.map((player) => player.name),
          datasets: [
            {
              data: players.map((player) => player.count),
              borderColor: colors,
              backgroundColor: colors.map((color) => hexToRgb(color)),
              borderWidth: 2,
              fill: false,
            },
          ],
        }}
        options={{
          ...buildOptions("Top player of the match awardees", true),
          legend: { display: false },
        }}
        width="65rem"
      />
      <Chart
        type="line"
        data={{
          labels: seasons,
          datasets: [
            {
              data: seasons.map((season) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (match.season === season) matchCount++;
                });
                return matchCount;
              }),
              label: "Matches played",
              borderColor: "#2E5BFF",
              fill: false,
            },
          ],
        }}
        options={buildOptions("Matches played per season", true)}
      />
      <Chart
        type="bar"
        data={{
          labels: seasons,
          datasets: [
            {
              data: seasons.map((season) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (match.season === season && match.toss_decision === "bat")
                    matchCount++;
                });
                return matchCount;
              }),
              label: "bat",
              backgroundColor: "#8C54FF",
              fill: false,
            },
            {
              data: seasons.map((season) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (
                    match.season === season &&
                    match.toss_decision === "field"
                  )
                    matchCount++;
                });
                return matchCount;
              }),
              label: "field",
              backgroundColor: "#2E5BFF",
              fill: false,
            },
          ],
        }}
        options={buildOptions("Toss decision per season", true)}
      />
      <Chart
        type="doughnut"
        data={{
          labels: ["Fielding", "Batting"],
          datasets: [
            {
              data: [
                ipl_data.data.filter((match) => match.toss_decision === "field")
                  .length,
                ipl_data.data.filter((match) => match.toss_decision === "bat")
                  .length,
              ],
              label: "matches",
              backgroundColor: ["#8C54FF", "#2E5BFF"],
              fill: false,
            },
          ],
        }}
        options={{ ...buildOptions("Toss Decision"), cutoutPercentage: 65 }}
      />
      <Chart
        type="doughnut"
        data={{
          labels: ["Win", "loss"],
          datasets: [
            {
              data: [
                ipl_data.data.filter((match) => {
                  const winner = match.toss_winner;
                  return match.winner === winner;
                }).length,
                ipl_data.data.filter((match) => {
                  const winner = match.toss_winner;
                  return match.winner !== winner;
                }).length,
              ],
              label: "matches",
              backgroundColor: ["#8C54FF", "#2E5BFF"],
              fill: false,
            },
          ],
        }}
        options={{
          ...buildOptions("Toss winner is match winner"),
          cutoutPercentage: 65,
        }}
      />
      <Chart
        type="bar"
        data={{
          labels: teams,
          datasets: [
            {
              data: teams.map((team) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (match.toss_winner === team) matchCount++;
                });
                return matchCount;
              }),
              borderColor: colors,
              backgroundColor: colors.map((color) => hexToRgb(color)),
              borderWidth: 2,
              label: "Toss won",
              fill: false,
            },
          ],
        }}
        options={{
          ...buildOptions("Maximum toss winner", true),
          legend: { display: false },
        }}
        width="65rem"
      />
      <Chart
        type="line"
        data={{
          labels: cities,
          datasets: [
            {
              data: cities.map((city) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (match.city === city) matchCount++;
                });
                return matchCount;
              }),
              label: "Matches played",
              borderColor: "#2E5BFF",
              fill: false,
            },
          ],
        }}
        options={buildOptions("Matches played at each city", true)}
        width="65rem"
      />
    </div>
  );
};
export default ChartSpace;
