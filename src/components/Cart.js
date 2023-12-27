import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAmntIndex,
  addAmountIndex,
  addTotalItems,
  clearCart,
  removeAmount,
  removeItems,
} from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  let navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart.items);

  const totalArray = useSelector((store) => store.cart.totalAmount);

  const total = totalArray.reduce((acc, el) => {
    return acc + el;
  }, 0);

  const dispatch = useDispatch();
  const itemsArr = useSelector((store) => store.cart.numOfItems);
  const showToastMessage = () => {
    toast.error("Max Limit Reached!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAdd = (foodItem, index) => {
    if (itemsArr[index] >= 5) {
      showToastMessage();
    } else {
      dispatch(addTotalItems(index));

      console.log(foodItem.card.info.price / 100);

      dispatch(addAmntIndex(index));
      dispatch(
        addAmountIndex(
          foodItem.card.info.price / 100 ||
            foodItem.card.info.defaultPrice / 100
        )
      );
    }
  };

  const remove1 = (foodItem, index) => {
    // dispatch(removeItem(index));
    dispatch(removeItems(index));
    dispatch(addAmntIndex(index));
    dispatch(
      removeAmount(
        foodItem.card.info.price / 100 || foodItem.card.info.defaultPrice / 100
      )
    );
  };
  const clear = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center mt-48 px-4">
        <Link to="/">
          <button className="   bg-slate-400 w-[300px] md:w-[400px]  rounded-lg border-2 border-black h-16 hover:bg-orange-500 font-semibold">
            Cart is Empty😥 , Add items now😋!!
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="">
      <ToastContainer />
      <div className="flex justify-center mt-3">
        <button
          className="mb-8  bg-slate-400 w-24 rounded-lg border-2 border-black   hover:bg-orange-500 font-semibold"
          onClick={() => clear()}
        >
          Clear Cart
        </button>

        <button
          className=" mb-8  bg-slate-400 w-[100px] rounded-lg border-2 border-black ml-4 hover:bg-orange-500 font-semibold"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
      <div className="text-center font-semibold bg-blue-500 text-slate-200 text-xl border-2 border-black">
        {" "}
        Total Amount: {Math.trunc(total)}
      </div>

      <div className="flex flex-wrap justify-center">
        {cartItems.map((item, index) => (
          <ul className=" m-2 p-2 ">
            <div className=" w-[300px] mb-2  bg-gray-200 px-4  rounded-lg hover:cursor-pointer">
              <div>
                <li className="m-4 w-32 md:w-auto font-semibold">
                  {item.card.info.name}
                </li>

                <li className="m-4 font-semibold">
                  Rs.{" "}
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </li>
              </div>

              <div className="relative flex justify-center  mx-auto">
                <img
                  className=" w-32 md:w-48  h-24 md:h-32 border-4 border-black rounded-xl mt-6 ml-2 "
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                    item.card.info.imageId
                  }
                  alt="dish-pic"
                />

                <button
                  className="bg-orange-500 text-black left-12 md:left-7 bottom-0 h-8 border-black border-2 absolute  w-10 rounded-lg   z-10 hover:bg-slate-500 "
                  onClick={() => remove1(item, index)}
                >
                  ➖
                </button>
                <span className="absolute h-6 rounded border-black border-2 bottom-0  text-center w-10 bg-blue-500 text-white ">
                  {itemsArr[index]}
                </span>
                <button
                  className="bg-orange-500 text-black border-black border-2 absolute h-8  w-10 rounded-lg bottom-0 right-10 md:right-5 z-10 hover:bg-slate-500 "
                  onClick={() => handleAdd(item, index)}
                >
                  ➕
                </button>
              </div>
            </div>
          </ul>
        ))}
      </div>

      <button
        onClick={() => window.scrollTo(0, 0)}
        className="px-3 relative flex justify-center  rounded-lg mx-auto  text-white bg-violet-700 font-semibold hover:bg-violet-900  mt-1"
      >
        TOP
      </button>
    </div>
  );
};

export default Cart;
