import React from "react";
import styles from "./nav.module.css";

import { ReactComponent as Logo } from "../../assets/svgs/Group 3.svg";
import { useData } from "../../context/context";

const Nav = () => {
  const ipl_data = useData();
  return (
    <nav className={styles.nav_parent}>
      <Logo className={styles.logo} />
      <h1 className={styles.h1}>{ipl_data.team}</h1>
    </nav>
  );
};
export default Nav;
