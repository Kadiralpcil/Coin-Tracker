"use client";
//React
import React, { useCallback, useEffect, useMemo, useState } from "react";

//Services
import getCoins from "@/services/coinList";
import { getFavorites, toggleFavoriteItem } from "@/services/localStorage";

//Types
import { Coin } from "@/types/coin";

//UI KIT
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  User,
  Pagination,
  Card,
  CardBody,
  Button,
  Chip,
} from "@nextui-org/react";
// import { Loading } from "@nextui-org/react";
//Components
import { columns } from "./columns";
import staticData from "./staticData";

//Icons
import { FaBitcoin, FaStar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Header from "../PageHeader/Header";
import FavoriteList from "../FavoriteList";
import Link from "next/link";
interface CoinListProps {
  listFavoriteItems?: boolean;
}
const CoinList = ({ listFavoriteItems = false }: CoinListProps) => {
  //States
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  //Constants
  const pages = Math.ceil(coins.length / 10);
  const hasSearchFilter = Boolean(filterValue);

  //CallBacks
  const requetsCoins = useCallback(() => {
    setLoading(true);
    const fetchCoins = async () => {
      try {
        const Coin = await getCoins();
        setCoins(Coin);
      } catch (error) {
        setError("Failed to fetch coins");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [coins]);

  const renderCell = useCallback((coin: Coin, columnKey: React.Key) => {
    const cellValue = coin[columnKey as keyof Coin];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "full",
              size: "sm",
              src: coin.image ?? "",
            }}
            classNames={{
              description: "text-default-500",
            }}
            description={cellValue}
            name={coin.symbol?.toUpperCase()}
          ></User>
        );
      case "price_change_percentage_24h":
        const lessThenZero = Number(Number(cellValue).toFixed(2)) < 0;
        const higherThenZero = Number(Number(cellValue).toFixed(2)) > 0;
        return (
          <Chip
            color={
              lessThenZero ? "danger" : higherThenZero ? "success" : "default"
            }
          >
            {Number(cellValue).toFixed(2)} %
          </Chip>
        );
      case "market_cap_change_percentage_24h":
        const lessThenZeroMarketCap = Number(Number(cellValue).toFixed(2)) < 0;
        const higherThenZeroMarketCap =
          Number(Number(cellValue).toFixed(2)) > 0;
        return (
          <Chip
            color={
              lessThenZeroMarketCap
                ? "danger"
                : higherThenZeroMarketCap
                ? "success"
                : "default"
            }
          >
            {Number(cellValue).toFixed(2)} %
          </Chip>
        );
      case "current_price":
        return (
          <span className="text-medium font-normal flex leading-loose">
            <p className="font-bold">$</p>
            <p>{cellValue.toLocaleString()}</p>
          </span>
        );
      case "actions":
        const isFavorite = getFavorites().some(
          (favoriteCoin) => favoriteCoin.id === coin.id
        );

        return (
          <div>
            <Button
              variant="light"
              onClick={() => {
                toggleFavoriteItem(coin);
                if (listFavoriteItems) {
                  if (isFavorite) {
                    setCoins((coins) =>
                      coins.filter((item) => item.id !== coin.id)
                    );
                  } else {
                    setCoins((coins) => [...coins, coin]);
                  }
                } else {
                  requetsCoins();
                }
              }}
              isIconOnly
              color="default"
              size="sm"
              className="transition-transform duration-200 ease-in-out hover:scale-110"
            >
              <FaStar
                cursor="pointer"
                className={`text-xl transition-colors duration-200 ease-in-out ${
                  isFavorite ? "text-yellow-300" : "text-gray-300"
                }`}
              />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  //Memoizations
  const filteredItems = useMemo(() => {
    let filteredCoins = [...coins];

    if (hasSearchFilter) {
      filteredCoins = filteredCoins.filter(
        (coin) =>
          (coin.name &&
            coin.name.toLowerCase().includes(filterValue.toLowerCase())) ||
          (coin.symbol &&
            coin.symbol.toLocaleLowerCase().includes(filterValue.toLowerCase()))
      );
    }

    return filteredCoins;
  }, [coins, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search.."
            size="sm"
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
            startContent={<FaSearch className="text-gray-400" />}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  //Effects;

  useEffect(() => {
    if (listFavoriteItems) {
      setCoins(getFavorites());
      return;
    } else {
      requetsCoins();
    }
  }, [listFavoriteItems]);

  return (
    <>
      <Header
        path={listFavoriteItems ? "/favorites" : "/"}
        name={listFavoriteItems ? "Favorite List" : "Coin List"}
        icon={listFavoriteItems ? <FaStar color="yellow" /> : <FaBitcoin />}
      />
      <div className="p-5">
        {loading ? (
          <div>loading..</div>
        ) : (
          <Card>
            <CardBody>
              <Table
                isCompact
                removeWrapper
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                topContent={topContent}
                topContentPlacement="outside"
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === "actions" ? "center" : "start"}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody emptyContent={"There is no data"} items={items}>
                  {(item) => (
                    <Link key={item.id} href={`/detail?coin=${item.name}`}>
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    </Link>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
};

export default CoinList;
