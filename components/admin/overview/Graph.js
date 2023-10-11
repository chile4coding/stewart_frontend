import React, { useEffect, useState } from "react";
import {
  Chart as Chartjs,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js/auto";

Chartjs.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip
);

import { Line, Pie, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
const options = {
  responsive: true,
  plugins: {
    legend: false,
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
        borderDash: [5, 5],
      },
      ticks: {
          color: 'white',
        },
      linecolor: "blue",
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      grid: {
        display: true,
        color: "white",
        lineWidth: 1,
      },
       ticks: {
          color: 'white',
        }
,
      
      border:{
        dash:[5,5]
      },
      
      color: "green",
      title: {
        display: true,
        
      },

      suggestedMin: 0,
      suggestedMax: 10,
    },
  },
};
const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },

  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: false,
      linecolor: "blue",
      title: {
        display: true,
      },
    },
    y: {
      display: false,
      color: "green",
      title: {
        display: true,
        text: "Value",
      },
      suggestedMin: 0,
      suggestedMax: 10,
    },
  },
};

const mydata = [
  {
    day: "Monday",
    value: 10,
  },
  {
    day: "Tuesday",
    value: 2,
  },
  {
    day: "Wednesday",
    value: 7,
  },
  {
    day: "Thursday",
    value: 2,
  },
];

export function PieChart() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  const [userData, setUserData] = useState({
    labels: mydata.map((data) => data.day),
    datasets: [
      {
        label: ``,
        data: mydata.map((data) => data.value),

        backgroundColor: [
          "#6FEAE2",
          "#7EB7FA",
          "#D9D9D9",
          "#F684D7",
          "#FFE999",
          "#FFFFFF",
        ],
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    setUserData((prev) => prev);
  }, [isDark]);

  return <Doughnut data={userData} options={pieOptions} />;
}
export default function Graph() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  const [userData, setUserData] = useState({
    labels: mydata.map((data) => data.day),
    datasets: [
      {
        label: ``,
        data: mydata.map((data) => data.value),
        borderColor: isDark ? "#6FEAE2" : "black",

        backgroundColor: isDark ? "white" : "black",
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    setUserData((prev) => prev);
  }, [isDark]);
  return <Line data={userData} options={options} />;
}
