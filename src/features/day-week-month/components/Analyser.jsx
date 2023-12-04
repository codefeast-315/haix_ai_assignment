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
  const [calederButton, setCalenderButton] = useState("day");

  const calculateData = (data) => {
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

      selectedAnalysis.forEach((item) => {
        const tempIndex = temp.findIndex((item2) => item2.title === item);
        temp[tempIndex].data.push({
          type: "bar",
          mode: "lines+markers",
          marker: { color: colors[index] },
          x: data
            ? data.map((item2) => item2.date)
            : companies[companyIndex].data.map((item2) => item2.date),
          y: data
            ? data.map((item2) => item2[item])
            : companies[companyIndex].data.map((item2) => item2[item]),
        });
      });
    });

    setChartData(temp);
  };

  useEffect(() => {
    onChangeCalender(calederButton);
  }, [selectedCompanies, selectedAnalysis]);

  function collateData(data, interval) {
    const collatedData = {};

    data.forEach((entry) => {
      const dateStr = entry.date;
      const entryDate = new Date(dateStr);
      let key;

      switch (interval) {
        case "day":
          key = entryDate.toISOString().split("T")[0];
          break;
        case "week":
          const firstDayOfWeek = new Date(entryDate);
          firstDayOfWeek.setDate(entryDate.getDate() - entryDate.getDay());
          key = firstDayOfWeek.toISOString().split("T")[0];
          break;
        case "month":
          key = entryDate.toISOString().slice(0, 7);
          break;
        default:
          throw new Error(
            "Invalid interval. Please use 'day', 'week', or 'month'"
          );
      }

      if (!collatedData[key]) {
        collatedData[key] = {
          media: 0,
          follows: 0,
          followed_by: 0,
          reach: 0,
          positive_sentiment: 0,
          negative_sentiment: 0,
          engagement_rate: 0,
          impressions: 0,
          comments: 0,
          shares: 0,
          click_through_rate: 0,
          average_likes: 0,
          average_comments: 0,
          count: 0,
        };
      }

      for (const property in entry) {
        if (property !== "date") {
          collatedData[key][property] += entry[property];
        }
      }

      collatedData[key].count += 1;
    });

    for (const key in collatedData) {
      if (key !== "count") {
        for (const property in collatedData[key]) {
          collatedData[key][property] /= collatedData[key].count;
        }
      }
    }

    return collatedData;
  }

  const onChangeCalender = (e) => {
    const yourData = companies[0].data;

    const collatedData = collateData(yourData, e);

    let temp = [];
    Object.keys(collatedData).forEach((key) => {
      temp.push({
        date: key,
        ...collatedData[key],
      });
    });
    calculateData(temp);
  };

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
      <div className={styles.control_container}>
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
        <div className={styles.calender_buttons}>
          <button
            onClick={() => {
              setCalenderButton("day");
              onChangeCalender("day");
            }}
            className={`${styles.calender_button} ${
              calederButton === "day" ? styles.calender_button_selected : ""
            }`}
          >
            DAY
          </button>
          <button
            onClick={() => {
              setCalenderButton("week");
              onChangeCalender("week");
            }}
            className={`${styles.calender_button} ${
              calederButton === "week" ? styles.calender_button_selected : ""
            }`}
          >
            WEEK
          </button>
          <button
            onClick={() => {
              setCalenderButton("month");
              onChangeCalender("month");
            }}
            className={`${styles.calender_button} ${
              calederButton === "month" ? styles.calender_button_selected : ""
            }`}
          >
            MONTH
          </button>
        </div>
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
