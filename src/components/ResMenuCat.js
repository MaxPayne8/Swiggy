import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";

const ResMenuCat = ({ data, showItems, setShowIndex }) => {
  const { title } = data.card.card;
  const { itemCards } = data.card.card;
  const handle = () => {
    setShowIndex();
  };

  const dispatch = useDispatch();
  const handleAdd = (foodItem) => {
    dispatch(addItems(foodItem));
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
            <ul>
              <div className="flex justify-between mb-2  bg-gray-200 w-2/3 ml-48 rounded-lg hover:cursor-pointer">
                <div>
                  <li className="m-4  font-semibold">{item.card.info.name}</li>
                  <li className="m-4 font-semibold">
                    Rs.{item.card.info.price / 100}
                  </li>
                  <li className="m-4 font-semibold ">
                    {item.card.info?.description}
                  </li>
                </div>

                <div>
                  <img
                    className="w-48 h-32 border-4 border-black rounded-xl mt-6 ml-2 "
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                      item.card.info.imageId
                    }
                    alt="dish-pic"
                  />
                  <button
                    className="bg-orange-500 text-black border-black border-2 relative ml-[158px] rounded-lg bottom-6  z-10 hover:bg-slate-500 "
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
