import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import ResMenuCat from "./ResMenuCat";
import ShimmerMenu from "./ShimmerMenu";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenuCat, setResMenuCat] = useState([]);

  const { warning } = useSelector((store) => store.cart);

  useEffect(() => {
    fetchData();
  }, []);

  const { resId } = useParams();

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Fmenu%2Fpl%3Fpage-type%3DREGULAR_MENU%26complete-menu%3Dtrue%26lat%3D12.853575%26lng%3D80.068588%26restaurantId%3D" +
        resId
    );
    //"https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.853575&lng=80.068588&restaurantId=" +

    const json = await data.json();
    console.log(json);
    setResInfo(json);

    setResMenuCat(
      json?.data?.cards[2]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
        (res) =>
          res?.card?.["card"]?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) ||
        json?.data?.cards[5]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
          (res) =>
            res?.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) ||
        json?.data?.cards[1]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
          (res) =>
            res?.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) ||
        json?.data?.cards[4]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
          (res) =>
            res?.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) ||
        json?.data?.cards[3]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
          (res) =>
            res?.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) ||
        json?.data?.cards[0]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
          (res) =>
            res?.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
    );
  };

  if (resInfo === null) return <ShimmerMenu />;
  console.log(resInfo);
  console.log(resMenuCat);
  const { name, costForTwo, cuisines } =
    resInfo?.data?.cards[0]?.card?.card?.info ||
    resInfo?.data?.cards[1]?.card?.card?.info ||
    resInfo?.data?.cards[2]?.card?.card?.info;

  return (
    <div className="w-full relative">
      {warning && (
        <div className="fixed text-white  top-0 right-0 border-2 border-white z-20  rounded-lg p-2 bg-blue-600">
          ➡➡ Item already in cart!!⬅⬅
        </div>
      )}
      <div className="text-center bg-gray-300">
        <h1 className="mb-2 text-4xl font-bold">{name}</h1>
        <p className="mb-2 font-semibold">Cost for two- {costForTwo / 100}</p>
        <h1 className="mb-2 font-semibold">Cuisines- {cuisines?.join(",")}</h1>
      </div>

      {resMenuCat?.map((cat, index) => (
        <ResMenuCat key={cat.card.card.title} data={cat} />
      ))}
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="px-3 relative flex justify-center  rounded-lg mx-auto  text-white bg-violet-700 font-semibold hover:bg-violet-900  mt-1"
      >
        TOP
      </button>
    </div>
  );
};

export default RestaurantMenu;
