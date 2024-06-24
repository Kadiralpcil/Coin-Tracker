"use client";
//Components
import FavoriteCoin from "./FavoriteCoin";
import Header from "../PageHeader/Header";
//UI KIT
import { Button } from "@nextui-org/react";
//Next
import Link from "next/link";
//ICONS
import { FaStar } from "react-icons/fa";
import { useLocalStorage } from "@/Hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Coin } from "@/types/coin";

interface FavoriteListProps {
  trigger: boolean;
}
const FavoriteList = ({ trigger }: FavoriteListProps) => {
  //Hooks
  const { getFavorites } = useLocalStorage("favorites");

  //States
  const [favorites, setFavorites] = useState<Coin[]>();

  //Effects
  useEffect(() => {
    setFavorites(getFavorites() || []);
  }, [trigger]);
  return (
    <>
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
        {favorites?.slice(0, 3).map((coin) => (
          <FavoriteCoin coin={coin} />
        ))}
      </div>
    </>
  );
};

export default FavoriteList;
