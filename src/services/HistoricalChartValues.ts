import { HistoricalData } from "@/types/historicalData";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-K9Z5zpwyJHkuHU95w26RKXe7",
  },
};

const getHistoricalValues = async (id: string, days: number) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&precision=2`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data as HistoricalData;
  } catch (error) {
    console.error("Error fetching ohlc values:", error);
    throw error;
  }
};

export default getHistoricalValues;
