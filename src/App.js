import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import { DataContext } from "./context/context";
import fetchCsvData from "./utils/fetchCsv";
import Loader from "./components/loader/Loader";

const Nav = React.lazy(() => import("./components/nav/Nav"));
const TeamSelector = React.lazy(() =>
  import("./components/teamSelector/TeamSelector")
);
const ChartSpace = React.lazy(() =>
  import("./components/chartSpace/ChartSpace")
);
const OverAll = React.lazy(() => import("./components/chartSpace/Overall"));

function App() {
  const [isDataLoaded, changeIsDataLoaded] = useState(false);
  const [data, changeData] = useState([]);
  const [team, changeTeam] = useState("Overall");

  useEffect(() => {
    if (!localStorage.getItem("ipl_data")) {
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
          localStorage.setItem("ipl_data", JSON.stringify(data.data));
          console.log(data);
        });
        changeIsDataLoaded(true);
      };
      fetchData();
    } else {
      changeData(JSON.parse(localStorage.getItem("ipl_data")));
      changeIsDataLoaded(true);
    }
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
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        }
      >
        <div className="App">
          <Nav />
          <div className="app-space">
            <TeamSelector />
            {team === "Overall" ? <OverAll /> : <ChartSpace />}
          </div>
        </div>
      </Suspense>
    </DataContext.Provider>
  );
}

export default App;
