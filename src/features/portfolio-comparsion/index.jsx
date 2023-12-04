import React from "react";
import styles from "./styles/index.module.css";
import { assets } from "../../assets";
import Analyser from "./components/Analyser";
import { companies } from "./jsons/companies";
const PortfolioComparision = () => {

  const [selectedCompanies, setSelectedCompanies] = React.useState(['apple']);

  const socials = [
    {
      image: assets.social.x,
    },
    {
      image: assets.social.tiktok,
    },
    {
      image: assets.social.insta,
    },
    {
      image: assets.social.youtube,
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Portfolio Comparision</h1>
      <div className={styles.companies_container}>
        {companies.map((item) => (
          <button
            onClick={() => {
              if (selectedCompanies.includes(item.name)) {
                setSelectedCompanies(
                  selectedCompanies.filter((company) => company !== item.name)
                );
              } else {
                setSelectedCompanies([...selectedCompanies, item.name]);
              }
            }}
            className={`${styles.companies_container_button} ${
              selectedCompanies.includes(item.name)
                ? styles.companies_button_clicked
                : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div>
        <div className={styles.days_selection}>
          <div>
            <p>Days Selection</p>
            <div className={styles.days_selection_box}>
              <input type="radio" name="days_selection" value="days" />
              <label>Days</label>
            </div>
            <div className={styles.days_selection_box}>
              <input type="radio" name="days_selection" value="custom_range" />
              <label>Custom Range</label>
            </div>
          </div>

          <div>
            <p>Number of days</p>
            <input type="number" />
          </div>
        </div>
        <button className={styles.search_button}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          <span> Fetch Insights</span>
        </button>
      </div>

      {selectedCompanies.length > 0 && (
        <h4>
          SHOWING ANALYSIS FOR
          <span>
            {selectedCompanies.map((item) => (
              <span
                style={{
                  padding: "0 5px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </span>
            ))}
          </span>
        </h4>
      )}

      {selectedCompanies.map((item) => {
        return (
          <div className={styles.socials_container}>
            {socials.map((item2, index) => (
              <div className={styles.input_social_container}>
                <div className={styles.input_social_container_box_1}>
                  <img src={item2.image} alt="social" />
                </div>

                <div className={styles.input_social_container_box_2}>
                  <input value={item} type="text" disabled={true} />
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <div className={styles.tab}>
        <button>Actionable Insights</button>
        <button>My Favorite View</button>
      </div>

      <Analyser selectedCompanies={selectedCompanies} />
    </div>
  );
};

export default PortfolioComparision;
