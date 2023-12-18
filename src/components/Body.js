import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/userContext";
import ResCard from "./ResCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAllRest } from "../utils/restrauntSlice";

const Body = () => {
  const dispatch = useDispatch();
  const { setUserName, loggedInUser } = useContext(UserContext);
  const [resData, setResData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [heroData, setHeroData] = useState([]); //OG list of restaurants
  const [searchTxt, setSearchTxt] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D12.853575%26lng%3D80.068588%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING"
    );
    // "https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.853575&lng=80.068588&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

    const json = await data.json();
    const mainData =
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setResData(mainData);
    setHeroData(mainData);
    dispatch(addAllRest(mainData));

    setFilteredList(mainData.filter((res) => res.info.avgRating > 4));
  };
  if (resData.length === 0) return <Shimmer />;
  // console.log(resData);
  // console.log(searchTxt);
  const handleClick = () => {
    filter
      ? setResData(heroData)
      : filteredList?.length === 0
      ? setResData(heroData)
      : setResData(filteredList);
    setFilter(!filter);
  };

  return (
    <div className="bg-slate-400 ">
      <div className="pt-4 mb-2 ml-3 mr-3 md:justify-between  md:flex-row flex flex-col ">
        <form
          className=" flex   "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="m-2 ml-4 p-1 pl-2 border-2 h-10 w-56 border-black rounded-lg"
            type="text"
            placeholder="Search Restaurants"
            onChange={(e) => {
              setSearchTxt(e.target.value);
            }}
            value={searchTxt}
          />
          <button
            className="m-2 ml-2 p-1 border-2 h-10 border-black rounded-lg w-8 hover:bg-orange-500"
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

        <div className="flex items-center">
          {/* <h1 className="p-1 ml-2  font-bold">User-Name:</h1> */}
          <input
            className="m-2 ml-4  p-1  border-2 h-10 w-56 border-black rounded-lg"
            type="text"
            placeholder="Enter your login name"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>

        <button
          className="m-2 ml-4 font-semibold p-1 border-2 w-56 border-black rounded-lg h-auto hover:bg-orange-500 mr-4"
          onClick={() => handleClick()}
        >
          {!filter ? <h1>Top-Rated</h1> : <h1>All Restaurant</h1>}
        </button>
      </div>

      <div className=" flex flex-wrap justify-between ml-3">
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
