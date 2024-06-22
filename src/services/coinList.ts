import { Coin } from "@/types/coin";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-K9Z5zpwyJHkuHU95w26RKXe7",
  },
};
const getApiUrl = (id?: string) => {
  if (id) {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id.toLocaleLowerCase()}`;
  } else {
    return "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
  }
};

const getCoinList = async (coinId?: string) => {
  try {
    const response = await fetch(getApiUrl(coinId), options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data as Coin[];
  } catch (error) {
    console.error("Error fetching coin list:", error);
    throw error;
  }
};

export default getCoinList;
