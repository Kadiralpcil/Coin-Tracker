"use client";

import { Coin } from "@/types/coin";

export const getFavorites = () => {
  if (typeof window !== "undefined") {
    const favorites = window.localStorage.getItem("favorites");
    return favorites ? (JSON.parse(favorites) as Coin[]) : [];
  }
  return [];
};

export const toggleFavoriteItem = (toggleItem: Coin) => {
  if (typeof window !== "undefined") {
    let favorites = getFavorites() as Coin[];

    if (favorites.find((coin) => coin.id === toggleItem.id)) {
      favorites = favorites.filter((coin) => coin.id !== toggleItem.id);
      window.localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      favorites.push(toggleItem);
      window.localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }
};
