// components/OhlcChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import getOhlcValues from "@/services/OhlcValues";

Chart.register(...registerables);

interface OhlcChartProps {
  coinId: string;
}
const OhlcChart = ({ coinId }: OhlcChartProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOHLCValues = async () => {
      try {
        const coinData = await getOhlcValues(coinId);
        setData(coinData);
      } catch (error) {
        console.error("Failed to fetch OHLC values", error);
      }
    };

    fetchOHLCValues();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const lastData = data[data.length - 1];
  const labels = ["Open", "High", "Low", "Close"];
  const prices = [lastData[1], lastData[2], lastData[3], lastData[4]];
  console.log(prices);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Last 1 Hour",
        data: prices,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="">
      <Line data={chartData} />
    </div>
  );
};

export default OhlcChart;
