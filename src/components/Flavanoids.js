import React, { useState, useEffect } from "react";
import wineData from "../data/Wine-Data.json";
import "./Flavanoids.css";

const Flavanoids = () => {
  const [mean, setMean] = useState([
    {
      meanC1: 0,
      meanC2: 0,
      meanC3: 0
    }
  ]);
  const [median, setMedian] = useState({
    medianC1: 0,
    medianC2: 0,
    medianC3: 0
  });
  const [mode, setMode] = useState({
    modeC1: 0,
    modeC2: 0,
    modeC3: 0
  });

  const calculateStats = () => {
    let meanc1 = 0;
    let meanc2 = 0;
    let meanc3 = 0;

    let countC1 = 0;
    let countC2 = 0;
    let countC3 = 0;

    let arrC1 = [];
    let arrC2 = [];
    let arrC3 = [];

    for (let i = 0; i < wineData.length; i++) {
      if (wineData[i].Alcohol === 1) {
        meanc1 += parseFloat(wineData[i].Flavanoids);
        countC1++;
        arrC1.push(parseFloat(wineData[i].Flavanoids));
      }

      if (wineData[i].Alcohol === 2) {
        meanc2 += parseFloat(wineData[i].Flavanoids);
        arrC2.push(parseFloat(wineData[i].Flavanoids));
        countC2++;
      }

      if (wineData[i].Alcohol === 3) {
        meanc3 += parseFloat(wineData[i].Flavanoids);
        arrC3.push(parseFloat(wineData[i].Flavanoids));
        countC3++;
      }
    }

    function median(arr) {
      let median = 0;
      if (arr.length % 2 === 0) {
        median = (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
      } else {
        median = arr[(arr.length + 1) / 2];
      }

      return median;
    }

    function mode(arr) {
      const mode = {};
      let max = 0,
        count = 0;

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (mode[item]) {
          mode[item]++;
        } else {
          mode[item] = 1;
        }

        if (count < mode[item]) {
          max = item;
          count = mode[item];
        }
      }

      return max;
    }

    meanc1 = (meanc1 / countC1).toFixed(3);
    meanc2 = (meanc2 / countC2).toFixed(3);
    meanc3 = (meanc3 / countC3).toFixed(3);

    let medc1 = median(arrC1);
    let medc2 = median(arrC2);
    let medc3 = median(arrC3).toFixed(3);

    let modec1 = mode(arrC1);
    let modec2 = mode(arrC2);
    let modec3 = mode(arrC3);

    setMean({ ...mean, meanC1: meanc1, meanC2: meanc2, meanC3: meanc3 });
    setMedian({ ...median, medianC1: medc1, medianC2: medc2, medianC3: medc3 });
    setMode({ ...mode, modeC1: modec1, modeC2: modec2, modeC3: modec3 });
  };

  useEffect(() => {
    calculateStats();
  }, []);

  return (
    <div className="container">
      <h2 style={{ paddingLeft: "80px" }}>
        Flavanoids : Mean, Median and Mode
      </h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              Flavanoids <br /> Mean
            </th>
            <td>{mean.meanC1}</td>
            <td>{mean.meanC2}</td>
            <td>{mean.meanC3}</td>
          </tr>

          <tr>
            <th>
              Flavanoids <br /> Median
            </th>
            <td>{median.medianC1}</td>
            <td>{median.medianC2}</td>
            <td>{median.medianC3}</td>
          </tr>

          <tr>
            <th>
              Flavanoids <br /> Mode
            </th>
            <td>{mode.modeC1}</td>
            <td>{mode.modeC2}</td>
            <td>{mode.modeC3}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Flavanoids;
