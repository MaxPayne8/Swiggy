import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAmount,
  addItems,
  clearCart,
  removeAmount,
  removeItem,
  removeItems,
} from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let navigate = useNavigate();

  // const [order, setOrder] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);

  const totalArray = useSelector((store) => store.cart.totalAmount);

  const total = totalArray.reduce((acc, el) => {
    return acc + el;
  }, 0);

  const dispatch = useDispatch();

  const handleAdd = (foodItem) => {
    dispatch(addItems(foodItem));

    console.log(foodItem.card.info.price / 100);

    // if (isNaN(foodItem.card.info.price)) {
    //   dispatch(addAmount(0));
    // }

    dispatch(
      addAmount(
        foodItem.card.info.price / 100 || foodItem.card.info.defaultPrice / 100
      )
    );
  };

  const remove1 = (index) => {
    dispatch(removeItem(index));
    dispatch(removeAmount(index));
  };
  const clear = (item) => {
    dispatch(clearCart());
  };
  const remove = (item) => {
    dispatch(removeItems());
  };
  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center mt-48 px-4">
        <Link to="/">
          <button
            className="   bg-slate-400 w-[300px] md:w-[400px]  rounded-lg border-2 border-black h-16 hover:bg-orange-500 font-semibold"
            onClick={() => clear()}
          >
            Cart is Empty😥 , Add items now😋!!
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex justify-center mt-3">
        <button
          className="mb-8  bg-slate-400 w-24 rounded-lg border-2 border-black   hover:bg-orange-500 font-semibold"
          onClick={() => clear()}
        >
          Clear Cart
        </button>
        <button
          className=" mb-8  bg-slate-400 w-[250px] rounded-lg border-2 border-black ml-4 hover:bg-orange-500 font-semibold"
          onClick={() => remove()}
        >
          Remove Last Added Dish
        </button>
        <button
          className=" mb-8  bg-slate-400 w-[100px] rounded-lg border-2 border-black ml-4 hover:bg-orange-500 font-semibold"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
      <div className="text-center font-semibold text-xl border-2 border-black">
        {" "}
        Total Amount: {Math.trunc(total)}
      </div>

      {cartItems.map((item, index) => (
        <ul className="relative">
          <div className="flex justify-between mb-2  bg-gray-200 px-4 mx-auto rounded-lg hover:cursor-pointer">
            <div>
              <li className="m-4 w-32 md:w-auto font-semibold">
                {item.card.info.name}
              </li>

              <li className="m-4 font-semibold">
                Rs.{" "}
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </li>

              {
                // <li className="m-4 font-semibold font-mono text-gray-600 w-32 md:w-auto ">
                //   {item.card.info?.description
                //     ? "Description: " + item.card.info?.description
                //     : null}
                // </li>
              }
            </div>

            <div>
              <img
                className=" w-32 md:w-48 h-24 md:h-32 border-4 border-black rounded-xl mt-6 ml-2 "
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                  item.card.info.imageId
                }
                alt="dish-pic"
              />

              <div className="flex justify-evenly">
                <button
                  className="bg-orange-500 text-black border-black border-2 relative  w-10 rounded-lg bottom-6  z-10 hover:bg-slate-500 "
                  onClick={() => remove1(index)}
                >
                  ❌
                </button>
                <button
                  className="bg-orange-500 text-black border-black border-2 relative  w-10 rounded-lg bottom-6  z-10 hover:bg-slate-500 "
                  onClick={() => handleAdd(item)}
                >
                  ➕
                </button>
              </div>
            </div>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default Cart;
