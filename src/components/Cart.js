import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems, clearCart, removeItems } from "../utils/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleAdd = (foodItem) => {
    dispatch(addItems(foodItem));
  };
  const clear = (item) => {
    dispatch(clearCart());
  };
  const remove = (item) => {
    dispatch(removeItems());
  };
  if (cartItems.length === 0) {
    return (
      <div>
        <Link to="/">
          <button
            className="ml-[500px]  mb-8 mt-36 bg-slate-400 w-[400px] rounded-lg border-2 border-black h-16 hover:bg-orange-500 font-semibold"
            onClick={() => clear()}
          >
            Cart is Empty😥 , Add items now😋!!
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center mt-3">
        <button
          className="mb-8  bg-slate-400 w-24 rounded-lg border-2 border-black h-8  hover:bg-orange-500 font-semibold"
          onClick={() => clear()}
        >
          Clear Cart
        </button>
        <button
          className=" mb-8 h-8 bg-slate-400 w-[250px] rounded-lg border-2 border-black ml-4 hover:bg-orange-500 font-semibold"
          onClick={() => remove()}
        >
          Remove Last Added Dish
        </button>
      </div>

      {cartItems.map((item) => (
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
      ))}
    </div>
  );
};

export default Cart;
