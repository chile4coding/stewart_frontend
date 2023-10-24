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

const pieOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Showing statistics for the total number of customers you’ve hadthis week",
      align: "center",
    },
    legend: {
      display: true,
      position: "right",
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
    day: "Mon",
    value: 10,
  },
  {
    day: "Tue",
    value: 2,
  },
  {
    day: "Wed",
    value: 7,
  },
  {
    day: "Thurs",
    value: 2,
  },
];

export function CustomerPieChart() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  const [userData, setUserData] = useState({
    labels: mydata.map((data) => data.day),
    datasets: [
      {
        label: `.`,
        data: mydata.map((data) => data.value),
        color: "white",

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
