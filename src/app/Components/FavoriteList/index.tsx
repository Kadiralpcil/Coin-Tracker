"use client";

import { getFavorites } from "@/services/localStorage";
import FavoriteCoin from "./FavoriteCoin";
import { useEffect, useState } from "react";
import { Coin } from "@/types/coin";
import { Button, Card, CardHeader } from "@nextui-org/react";
import Header from "../PageHeader/Header";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const FavoriteList = () => {
  //States
  const [favorites, setFavorites] = useState<Coin[]>([]);
  //Effects
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);
  return (
    <div>
      <Header
        path="/favorites"
        name={"Favorite List"}
        icon={<FaStar color="yellow" />}
      />
      <div className=" flex justify-end px-2 ">
        <Link href="/favorites">
          <Button
            className="flex !outline-none !border-none text-lg text-blue-300 hover:text-white"
            variant="ghost"
          >
            Show All...
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 md:p-4 lg:grid-cols-3 lg:p-5 cursor-pointer">
        {getFavorites()
          .slice(0, 3)
          .map((coin) => (
            <FavoriteCoin coin={coin} />
          ))}
      </div>
    </div>
  );
};

export default FavoriteList;
