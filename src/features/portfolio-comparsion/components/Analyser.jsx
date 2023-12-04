import React, { useEffect, useState } from "react";
import { assets } from "../../../assets";
import styles from "../styles/analyser.module.css";
import Plot from "react-plotly.js";
import { companies } from "../jsons/companies";
const Analyser = ({ selectedCompanies }) => {
  const analysis = [
    "reach",
    "negative_sentiment",
    "positive_sentiment",
    "engagement_rate",
  ];

  const [selectedAnalysis, setselectedAnalysis] = useState(["reach"]);
  const [chartData, setChartData] = useState([]);

  const [data, setData] = useState([
    {
      x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
      y: [1, 3, 6],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "red" },
    },
    {
      type: "line",
      x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
      y: [2, 5, 3],
    },
  ]);

  useEffect(() => {
    let temp = [];
    selectedAnalysis.forEach((item) => {
      temp.push({
        title: item,
        data: [],
      });
    });

    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "pink",
      "brown",
      "black",
      "grey",
    ];

    selectedCompanies.forEach((company, index) => {
      const companyIndex = companies.findIndex((item) => item.name === company);


      selectedAnalysis.forEach((item,index2) => {
        const tempIndex = temp.findIndex((item2) => item2.title === item);
        temp[tempIndex].data.push({
          type: index2%2===0? "line":"bar",
          name: company,
          mode: "lines+markers",
          marker: { color: colors[index] },
          x: companies[companyIndex].data.map((item2) => item2?.date),
          y: companies[companyIndex].data.map((item2) => item2[item]),
        });
      });
    });

    console.log(temp);
    setChartData(temp);
  }, [selectedCompanies, selectedAnalysis]);

  useEffect(() => {
    const data = [
      {
        x: [1, 2, 3, 4, 5],
        y: [10, 11, 12, 13, 14],
        type: "scatter",
      },
    ];

    const layout = { title: "My Plotly Chart" };
  }, []);

  return (
    <div className={styles.container}>
      <h4 className={styles.top_title}>Actionable Insights Stats</h4>
      <div className={styles.top_banner}>
        <div className={styles.top_banner_div_selected}>
          <img src={assets.social.facebook} alt="social" />
        </div>
        <div className={styles.top_banner_div_default}>
          <img src={assets.social.insta} alt="social" />
        </div>
        <div className={styles.top_banner_div_default}>
          <img src={assets.social.tiktok} alt="social" />
        </div>
        <div className={styles.top_banner_div_default}>
          <img src={assets.social.x} alt="social" />
        </div>
        <div className={styles.top_banner_div_default}>
          <img src={assets.social.youtube} alt="social" />
        </div>
      </div>

      <div className={styles.tab}>
        <button className={styles.tab_button_selected}>
          User-Account Insights
        </button>
        <button>Hashtag Insights</button>
        <button>User-Tagged Insights</button>
      </div>

      <div className={styles.analysis_buttons_container}>
        {analysis.map((item, index) => {
          return (
            <button
              className={`${
                selectedAnalysis.includes(item)
                  ? `${styles.analysis_button} ${styles.button_selected} `
                  : styles.analysis_button
              }`}
              onClick={() => {
                const temp = selectedAnalysis;
                if (temp.includes(item)) {
                  temp.splice(temp.indexOf(item), 1);
                } else {
                  temp.push(item);
                }
                setselectedAnalysis([...temp]);
              }}
              key={index}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className={styles.chart_container}>
        <div className={styles.chart_box}>
          {selectedCompanies.length > 0 &&
            chartData.map((item, index) => {
              return (
                <Plot
                  key={index}
                  data={item.data}
                  layout={{ width: 500, height: 400, title: item.title }}
                />
              );
            })}
        </div>
      </div>

      {selectedAnalysis.length === 0 && (
        <p style={{ textAlign: "center" }}>NO ANALYSIS SELECTED</p>
      )}
    </div>
  );
};

export default Analyser;
