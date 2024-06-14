import getHistoricalValues from "@/services/HistoricalChartValues";
import { HistoricalData } from "@/types/historicalData";
import { Chip } from "@nextui-org/react";
import { Chart, ChartOptions, registerables } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface HistoricalChartProps {
  coinId: string;
}

Chart.register(...registerables);

const CahrtTimeRange = [
  { label: "24 H", value: 1 },
  { label: "7 D", value: 7 },
  { label: "1 M", value: 30 },
  { label: "1 Y", value: 365 },
];

const HistoricalChart = ({ coinId }: HistoricalChartProps) => {
  //States
  const [chartValues, setChartValues] = useState<HistoricalData>();
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    label: "24 H",
    value: 1,
  });

  useEffect(() => {
    if (!coinId || coinId === "") {
      return;
    } else {
      setLoading(true);
      getChartData(coinId, selectedTime.value);
    }
  }, [coinId, selectedTime.value]);

  const getChartData = useCallback((coinId: string, time: number) => {
    const fetchData = async () => {
      try {
        const data = await getHistoricalValues(coinId, time);
        setChartValues(data);
      } catch (error) {
        console.log("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const dates =
    chartValues?.prices.map((item) => new Date(item[0]).toLocaleDateString()) ||
    [];

  const prices = chartValues?.prices.map((item) => item[1]) || [];

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Price",
        data: prices,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bitcoin",
      },
    },
  };
  return (
    <div className="p-2">
      {!loading ? (
        <div>
          <div className="flex justify-center p-2 gap-2">
            {CahrtTimeRange.map((time) => (
              <Chip
                onClick={() => setSelectedTime(time)}
                className="cursor-pointer hover:scale-105 ease-out"
                variant="bordered"
                color={
                  time.label === selectedTime.label ? "primary" : "default"
                }
              >
                {time.label}
              </Chip>
            ))}
          </div>
          <Line data={data} options={options} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default HistoricalChart;
