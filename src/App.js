import React, { useState, useEffect } from "react";
import "./App.css";
import { DataContext } from "./context/context";
import fetchCsvData from "./utils/fetchCsv";

import Nav from "./components/nav/Nav";
import TeamSelector from "./components/teamSelector/TeamSelector";
import ChartSpace from "./components/chartSpace/ChartSpace";

function App() {
  const [isDataLoaded, changeIsDataLoaded] = useState(false);
  const [data, changeData] = useState([]);
  const [team, changeTeam] = useState("Mumbai Indians");

  useEffect(() => {
    const fetchData = async () => {
      await fetchCsvData("/data/ipl_data.csv", (data) => {
        data.data.forEach((match) => {
          if (match.team1 === "Rising Pune Supergiant")
            match.team1 = "Rising Pune Supergiants";
          if (match.team2 === "Rising Pune Supergiant")
            match.team2 = "Rising Pune Supergiants";
          if (match.winner === "Rising Pune Supergiant")
            match.winner = "Rising Pune Supergiants";
          if (match.toss_winner === "Rising Pune Supergiant")
            match.toss_winner = "Rising Pune Supergiants";
        });
        data.data.pop();
        changeData(data.data);
        console.log(data.data);
      });
      changeIsDataLoaded(true);
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider
      value={{
        isDataLoaded,
        data,
        team,
        setIsDataLoaded: (bool) => changeIsDataLoaded(bool),
        setData: (data) => changeData(data),
        setTeam: (t) => changeTeam(t),
      }}
    >
      <div className="App">
        <Nav />
        <div className="app-space">
          <TeamSelector />
          <ChartSpace />
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
