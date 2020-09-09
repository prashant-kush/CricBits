import React, { useState, useEffect } from "react";
import styles from "./chartSpace.module.css";

import Chart from "../charts/Chart";

import { useData } from "../../context/context";

export const buildOptions = (title, scale) => {
  const bodyCSS = parseFloat(
    getComputedStyle(document.querySelector("body"))["font-size"]
  );
  return {
    scales: scale
      ? {
          yAxes: [
            {
              ticks: {
                fontSize: bodyCSS * 0.8,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: bodyCSS * 0.8,
              },
            },
          ],
        }
      : null,
    title: {
      display: true,
      text: title,
      fontSize: bodyCSS,
    },
    legend: { display: true, labels: { fontSize: bodyCSS * 0.8 } },
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 600,
    },
  };
};

const ChartSpace = () => {
  const ipl_data = useData();
  const [seasons, changeSeasons] = useState([]);
  const [cities, changeCities] = useState([]);

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
    }
  }, [ipl_data.data, ipl_data.isDataLoaded]);
  return (
    <div className={styles.chart_space}>
      <Chart
        type="line"
        data={{
          labels: seasons,
          datasets: [
            {
              data: seasons.map((season) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (
                    match.season === season &&
                    (match.team1 === ipl_data.team ||
                      match.team2 === ipl_data.team)
                  )
                    matchCount++;
                });
                return matchCount;
              }),
              label: "Matches played",
              borderColor: "#2E5BFF",
              fill: false,
            },
            {
              data: seasons.map((season) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (match.season === season && match.winner === ipl_data.team)
                    matchCount++;
                });
                return matchCount;
              }),
              label: "Matches won",
              borderColor: "#8C54FF",
              fill: false,
            },
          ],
        }}
        options={buildOptions("Matches played v/s won per season", true)}
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
                  if (
                    match.season === season &&
                    (match.team1 === ipl_data.team ||
                      match.team2 === ipl_data.team) &&
                    match.toss_winner !== ipl_data.team
                  )
                    matchCount++;
                });
                return matchCount;
              }),
              label: "win",
              backgroundColor: "#8C54FF",
              fill: false,
            },
            {
              data: seasons.map((season) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (
                    match.season === season &&
                    match.toss_winner === ipl_data.team
                  )
                    matchCount++;
                });
                return matchCount;
              }),
              label: "loss",
              backgroundColor: "#2E5BFF",
              fill: false,
            },
          ],
        }}
        options={buildOptions("Toss result per season", true)}
      />
      <Chart
        type="doughnut"
        data={{
          labels: ["Fielding", "Batting"],
          datasets: [
            {
              data: [
                ipl_data.data.filter(
                  (match) =>
                    match.toss_winner === ipl_data.team &&
                    match.toss_decision === "field"
                ).length,
                ipl_data.data.filter(
                  (match) =>
                    match.toss_winner === ipl_data.team &&
                    match.toss_decision === "bat"
                ).length,
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
                ipl_data.data.filter(
                  (match) =>
                    (match.team1 === ipl_data.team ||
                      match.team2 === ipl_data.team) &&
                    match.winner === ipl_data.team
                ).length,
                ipl_data.data.filter(
                  (match) =>
                    (match.team1 === ipl_data.team ||
                      match.team2 === ipl_data.team) &&
                    match.winner !== ipl_data.team
                ).length,
              ],
              label: "matches",
              backgroundColor: ["#8C54FF", "#2E5BFF"],
              fill: false,
            },
          ],
        }}
        options={{ ...buildOptions("Win percentage"), cutoutPercentage: 65 }}
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
                  if (
                    match.city === city &&
                    (match.team1 === ipl_data.team ||
                      match.team2 === ipl_data.team)
                  )
                    matchCount++;
                });
                return matchCount;
              }),
              label: "Matches played",
              borderColor: "#2E5BFF",
              fill: false,
            },
            {
              data: cities.map((city) => {
                let matchCount = 0;
                ipl_data.data.forEach((match) => {
                  if (match.city === city && match.winner === ipl_data.team)
                    matchCount++;
                });
                return matchCount;
              }),
              label: "Matches won",
              borderColor: "#8C54FF",
              fill: false,
            },
          ],
        }}
        options={buildOptions("Matches played v/s won at each city", true)}
        width="65rem"
      />
    </div>
  );
};
export default ChartSpace;
