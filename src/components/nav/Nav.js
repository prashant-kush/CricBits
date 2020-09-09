import React from "react";
import styles from "./nav.module.css";

import { ReactComponent as Logo } from "../../assets/svgs/Group 3.svg";
import { useData } from "../../context/context";

const Nav = () => {
  const ipl_data = useData();
  return (
    <nav className={styles.nav_parent}>
      <Logo
        className={styles.logo}
        onClick={() => ipl_data.setTeam("Overall")}
      />
      <h1 className={styles.h1}>IPL Stats</h1>
      <h1 className={styles.h1_team}>{ipl_data.team}</h1>
    </nav>
  );
};
export default Nav;
