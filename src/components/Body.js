import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/userContext";
import ResCard from "./ResCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const { setUserName, loggedInUser } = useContext(UserContext);
  const [resData, setResData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [heroData, setHeroData] = useState([]); //OG list of restaurants
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.853575&lng=80.068588&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const mainData =
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setResData(mainData);
    setHeroData(mainData);

    setFilteredList(mainData.filter((res) => res.info.avgRating > 4));
  };
  if (resData.length === 0) return <Shimmer />;
  // console.log(resData);
  // console.log(searchTxt);

  return (
    <div className="bg-slate-400">
      <div className="flex justify-between pt-4 mb-2 ml-3 mr-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="m-2 ml-4 p-1 pl-2 border-2 border-black rounded-lg"
            type="text"
            placeholder="Search Restaurants"
            onChange={(e) => {
              setSearchTxt(e.target.value);
            }}
            value={searchTxt}
          />
          <button
            className="m-2 ml-2 p-1 border-2 border-black rounded-lg hover:bg-orange-500"
            onClick={() => {
              const searchedRest = resData.filter((res) =>
                res.info.name.toLowerCase().includes(searchTxt.toLowerCase())
              );
              setResData(searchedRest);
              setSearchTxt("");
            }}
          >
            🔍
          </button>
        </form>
        <div>
          User-Name:
          <input
            className="m-2 ml-4 p-1 pl-2 border-2 border-black rounded-lg"
            type="text"
            placeholder="Enter your login name"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="">
          <button
            className="m-2 ml-2 p-1 border-2 border-black rounded-lg hover:bg-orange-500 mr-4"
            onClick={() => {
              setResData(heroData);
            }}
          >
            All-Restaurants
          </button>

          <button
            className="m-2 ml-2 p-1 border-2 border-black rounded-lg hover:bg-orange-500 mr-4"
            onClick={() => {
              filteredList.length === 0
                ? setResData(heroData)
                : setResData(filteredList);
            }}
          >
            Top-Rated-Restaurants
          </button>
        </div>
      </div>

      <div className="flex flex-wrap ml-3">
        {resData.map((card) => (
          <Link key={card.info.id} to={"/restaurants/" + card.info.id}>
            <ResCard data={card} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
