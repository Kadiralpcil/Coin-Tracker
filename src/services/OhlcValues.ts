const API_URL = "https://api.coingecko.com/api/v3/coins/id/ohlc?days=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-K9Z5zpwyJHkuHU95w26RKXe7",
  },
};

const getOhlcValues = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=365`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ohlc values:", error);
    throw error;
  }
};

export default getOhlcValues;
