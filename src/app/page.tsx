"use client";
import { useState } from "react";
import CoinList from "./Components/AllCoinList";
import FavoriteList from "./Components/FavoriteList/index";

export default function Home() {
  const [trigger, setTrigger] = useState(false);

  const favoriteListChangingTrigger = () => {
    setTrigger(!trigger);
  };
  return (
    <main className="p-3">
      <FavoriteList trigger={trigger} />
      <CoinList favoriteListChangingTrigger={favoriteListChangingTrigger} />
    </main>
  );
}
