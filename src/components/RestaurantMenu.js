import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import ResMenuCat from "./ResMenuCat";
import ShimmerMenu from "./ShimmerMenu";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenuCat, setResMenuCat] = useState([]);
  const [showIndex, setShowIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const { resId } = useParams();

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.853575&lng=80.068588&restaurantId=" +
        resId
    );
    const json = await data.json();

    setResInfo(json);

    setResMenuCat(
      json?.data?.cards[2]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
        (res) =>
          res?.card?.["card"]?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
    );
  };

  if (resInfo === null) return <ShimmerMenu />;
  // const { itemCards } =
  // resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap.REGULAR.cards;
  console.log(resInfo);
  console.log(resMenuCat);
  const { name, costForTwo, cuisines } =
    resInfo?.data?.cards[0]?.card?.card?.info;

  return (
    <div>
      <div className="text-center bg-gray-300">
        <h1 className="mb-2 text-4xl font-bold">{name}</h1>
        <p className="mb-2 font-semibold">Cost for two- {costForTwo / 100}</p>
        <h1 className="mb-2 font-semibold">Cuisines- {cuisines.join(",")}</h1>
      </div>

      {resMenuCat.map((cat, index) => (
        <ResMenuCat
          key={cat.card.card.title}
          data={cat}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => {
            setShowIndex(index);
          }}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
