import { Coin } from "@/types/coin";

export const useLocalStorage = (key: string) => {
  const toggleItem = (value: Coin) => {
    let favorites = getFavorites();

    if (favorites?.find((coin) => coin.id === value.id)) {
      favorites = favorites.filter((coin) => coin.id !== value.id);
    } else {
      favorites?.push(value);
    }
    setFavoritesToLS(favorites || []);
  };

  const setFavoritesToLS = (value: Coin[]) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorites = () => {
    try {
      const favorites = window.localStorage.getItem(key);

      return favorites ? (JSON.parse(favorites) as Coin[]) : [];
    } catch (error) {}
  };

  return { setFavoritesToLS, getFavorites, toggleItem };
};
