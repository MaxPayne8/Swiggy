import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAmount, addItems, totalItems } from "../utils/cartSlice";

const ResMenuCat = ({ data }) => {
  const [showItems, setShowItems] = useState(false);
  const { title } = data.card.card;
  const { itemCards } = data.card.card;
  const handle = () => {
    setShowItems(!showItems);
  };

  // const [totalAmount, setTotalAmount] = useState(0);

  const [items, setItems] = useState(0);

  const dispatch = useDispatch();
  const handleAdd = (foodItem) => {
    dispatch(addItems(foodItem));
    setItems(items + 1);
    dispatch(totalItems(items));

    console.log(foodItem.card.info.price / 100);

    dispatch(
      addAmount(
        foodItem.card.info.price / 100 || foodItem.card.info.defaultPrice / 100
      )
    );
  };

  return (
    <div>
      <div
        className="flex justify-between bg-slate-300 mb-2 h-16 hover:cursor-pointer"
        onClick={handle}
      >
        <h1 className="font-bold m-4">
          {title} ({itemCards.length})
        </h1>
        <h1 className="m-4">⬇</h1>
      </div>

      {itemCards.map(
        (item, index) =>
          showItems && (
            <ul className="">
              <div className="flex mx-auto justify-between mb-2 px-4 items-center bg-gray-200 w-auto  rounded-lg hover:cursor-pointer">
                <div>
                  <li className="m-4  font-semibold w-32 md:w-auto">
                    {item?.card?.info?.name}
                  </li>
                  <li className="m-4 font-semibold">
                    Rs.{" "}
                    {item.card.info.price / 100 ||
                      item.card.info.defaultPrice / 100}
                  </li>
                  <li className="m-4 font-semibold font-mono w-32 md:hidden text-gray-600 ">
                    {item.card.info?.description
                      ? "Description:" +
                        item.card.info?.description.substring(0, 20) +
                        "..."
                      : null}
                  </li>
                  <li className="m-4 hidden  font-semibold font-mono  md:block text-gray-600 ">
                    {item.card.info?.description
                      ? "Description:" + item.card.info?.description
                      : null}
                  </li>
                </div>

                <div>
                  <img
                    className="w-32 md:w-48 h-24 md:h-32 border-4 border-black rounded-xl mt-6  "
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                      item.card.info.imageId
                    }
                    alt="dish-pic"
                  />
                  <button
                    className="bg-orange-500 text-black border-black border-2 relative ml-[85px] md:ml-[158px] rounded-lg bottom-6  z-10 hover:bg-slate-500 "
                    onClick={() => handleAdd(item)}
                  >
                    Add+
                  </button>
                </div>
              </div>
            </ul>
          )
      )}
    </div>
  );
};

export default ResMenuCat;
