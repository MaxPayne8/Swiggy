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

    setFilteredList(mainData.filter((res) => res.info.avgRating > 4.2));
  };
  if (resData.length === 0) return <Shimmer />;
  console.log(resData);
  // console.log(searchTxt);
  const handleClickTop = () => {
    setResData(filteredList);
  };
  const handleClickAll = () => {
    setResData(heroData);
  };

  const filterProducts = (e) => {
    const filterItem = e.target.value;

    if (filterItem === "Cuisines and Food") {
      setResData(heroData);
    } else if (filterItem === "South Indian") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "North Indian") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "Chinese") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "Desserts") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "Burgers") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "Pastas") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "Biryani") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "Beverages") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    } else if (filterItem === "Ice Cream") {
      heroData?.filter((item) => item.info.cuisines.includes(filterItem))
        ?.length
        ? setResData(
            heroData?.filter((item) => item.info.cuisines.includes(filterItem))
          )
        : setResData(heroData);
    }
  };

  return (
    <div className="bg-slate-200 ">
      <div className="pt-4 mb-2  justify-center mx-auto  md:flex-row flex flex-col ">
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
              const searchedRest = heroData.filter((res) =>
                res.info.name.toLowerCase().includes(searchTxt.toLowerCase())
              );
              searchedRest?.length
                ? setResData(searchedRest)
                : setResData(heroData);
              setSearchTxt("");
            }}
          >
            🔍
          </button>
        </form>
        <button
          className="m-2 ml-4 font-semibold p-1 border-2 w-56 border-black rounded-lg h-auto hover:bg-orange-500 mr-4"
          onClick={() => handleClickAll()}
        >
          All Restaurants
        </button>
        <button
          className="m-2 ml-4 font-semibold p-1 border-2 w-56 border-black rounded-lg h-auto hover:bg-orange-500 mr-4"
          onClick={() => handleClickTop()}
        >
          Top-Rated({">"}4.2⭐)
        </button>

        <div className="flex items-center">
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
      </div>

      <div className="flex flex-col  sm:justify-center   justify-between sm:flex-row ">
        <select
          className="hover:cursor-pointer  mx-4  font-semibold w-56 p-1 border-2 text-white bg-blue-700   border-black rounded-lg h-auto hover:bg-orange-500 "
          onChange={(e) => filterProducts(e)}
        >
          <option value="Cuisines and Food"> Cuisines and Food </option>
          <option value="South Indian"> South Indian</option>
          <option value="North Indian"> North Indian</option>
          <option value="Chinese"> Chinese</option>

          <option value="Desserts"> Desserts </option>
          <option value="Burgers"> Burgers</option>
          <option value="Pastas"> Pastas </option>
          <option value="Biryani"> Biryani</option>

          <option value="Beverages"> Beverages</option>
          <option value="Ice Cream"> Ice Cream</option>
        </select>
      </div>

      <div className=" flex flex-wrap justify-normal md:justify-evenly">
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
