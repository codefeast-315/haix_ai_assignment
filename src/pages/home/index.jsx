import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/index.module.css";
const Home = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.button} to="/portfolio-comparision">
        Portfolio Comparision
      </Link>
      <Link className={styles.button} to="/day-week-month">
        Day Week Month
      </Link>
    </div>
  );
};

export default Home;
