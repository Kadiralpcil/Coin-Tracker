"use client";
import getCoinList from "@/services/coinList";
import { Coin } from "@/types/coin";
import { Card, CardBody, CardHeader, User } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import HistoricalChart from "./HistoricalChart";
import { usePathname } from "next/navigation";

const Detail = () => {
  //States
  const [coin, setCoin] = useState<Coin | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  console.log("pathname", pathname);

  //Querys
  useEffect(() => {
    if (!searchParams.get("coin")) {
      return;
    } else {
      getCoinDetail(searchParams.get("coin") || "");
    }
  }, [searchParams]);

  const getCoinDetail = useCallback((coinId: string) => {
    const fetchCoin = async () => {
      try {
        const Coin = await getCoinList(coinId);
        setCoin(Coin[0]);
      } catch (error) {
        console.log("Failed to fetch coins");
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, []);

  const get24HChange = () => {
    const lessThanZero =
      Number(Number(coin?.price_change_percentage_24h).toFixed(2)) < 0;
    const higherThanZero =
      Number(Number(coin?.price_change_percentage_24h).toFixed(2)) > 0;
    return (
      <span
        className={
          lessThanZero
            ? "text-red-700 flex gap-1 items-center"
            : higherThanZero
            ? "text-green-400 flex gap-1 items-center"
            : "text-gray-500 flex gap-1 items-center"
        }
      >
        {lessThanZero && <FaCaretDown />}
        {higherThanZero && <FaCaretUp />}
        {Number(Number(coin?.price_change_percentage_24h).toFixed(2))}% (24H)
      </span>
    );
  };

  return (
    <div className="w-full flex gap-2 flex-wrap">
      {/* <Suspense fallback={<div>loading..</div>}> */}
      <Card className="w-full">
        <CardHeader className="flex justify-between !items-start gap-5 px-5 sticky flex-1 flex-wrap">
          <div className="flex gap-2 items-center">
            <User
              className="flex justify-start"
              avatarProps={{
                radius: "full",
                size: "lg",
                src: coin?.image ?? "",
              }}
              classNames={{
                description: "text-default-500",
              }}
              description={""}
              name={""}
            ></User>
            <div className="text-xl font-bold ">{coin?.name}</div>
            <div>{coin?.symbol?.toUpperCase()}</div>
          </div>
          <div>
            <div className="flex justify-between">
              <span>Market Cap : </span>
              <span>
                <b>${coin?.market_cap?.toLocaleString()}</b>
              </span>
            </div>
            <div className="flex justify-between">
              <span>24H High Price : </span>
              <span>
                <b>${coin?.high_24h?.toLocaleString()}</b>
              </span>
            </div>
            <div className="flex justify-between">
              <span>24H Low Price : </span>
              <span>
                <b>${coin?.low_24h?.toLocaleString()}</b>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-semibold">
              ${coin?.current_price?.toLocaleString()}
            </div>
            {get24HChange()}
          </div>
        </CardHeader>
      </Card>
      <Card className="flex-1">
        <HistoricalChart coinId={coin?.id || ""} />
      </Card>
      {/* </Suspense> */}
    </div>
  );
};

const DetailWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Detail />
    </Suspense>
  );
};

export default DetailWithSuspense;
