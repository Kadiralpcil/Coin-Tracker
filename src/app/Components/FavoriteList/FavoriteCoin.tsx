import { Coin } from "@/types/coin";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import OhlcChart from "./OhlcChart";
interface FavoriteCoinProps {
  coin: Coin;
}
const FavoriteCoin = ({ coin }: FavoriteCoinProps) => {
  return (
    <div>
      <Link className="w-full" key={coin.id} href={`/detail?coin=${coin.id}`}>
        <Card className="h-[15rem] overflow-hidden w-full">
          <CardBody>
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={coin.image || ""}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {coin.name}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  {coin.symbol}
                </h5>
              </div>
            </div>
            <div className="text-center text-xl">
              {"$ " + coin.current_price}
            </div>
            <div className="flex justify-center overflow-hidden ">
              <OhlcChart coinId={coin.id || ""} />
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default FavoriteCoin;
