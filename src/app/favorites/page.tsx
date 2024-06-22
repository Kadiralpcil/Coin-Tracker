"use client";
import CoinList from "../../Components/AllCoinList";

const Favorites = () => {
  return (
    <div>
      <CoinList
        listFavoriteItems={true}
        favoriteListChangingTrigger={() => console.log("dasda")}
      />
    </div>
  );
};

export default Favorites;
