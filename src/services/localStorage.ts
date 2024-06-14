"use client";

import { Coin } from "@/types/coin";

export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? (JSON.parse(favorites) as Coin[]) : [];
};

export const toggleFavoriteItem = (toggleItem: Coin) => {
  let favorites = getFavorites() as Coin[];

  if (favorites.find((coin) => coin.id === toggleItem.id)) {
    favorites = favorites.filter((coin) => coin.id !== toggleItem.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } else {
    favorites.push(toggleItem);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
