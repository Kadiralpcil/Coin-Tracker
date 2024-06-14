import CoinList from "./Components/AllCoinList";
import FavoriteList from "./Components/FavoriteList/index";

export default function Home() {
  return (
    <main className="p-3">
      <FavoriteList />
      <CoinList />
    </main>
  );
}
