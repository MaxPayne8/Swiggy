import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/userContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [login, setLogin] = useState("Login");
  const { loggedInUser } = useContext(UserContext);
  const useOnlineStatus = () => {
    const [status, setStatus] = useState(true);
    useEffect(() => {
      window.addEventListener("online", () => {
        setStatus(true);
      });
      window.addEventListener("offline", () => {
        setStatus(false);
      });
    }, []);
    return status;
  };
  const state = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-orange-500 w-full md:w-full ">
      <Link to="/">
        <img
          className="h-16 mt-10 md:mt-3  md:w-40 md:h-24  m-4 border-2 border-black hover:cursor-pointer rounded-full"
          src="https://assets.materialup.com/uploads/61d86780-be13-47fa-81a6-226aac22db27/preview.jpg "
          alt="app-icon"
        />
      </Link>
      <ul>
        <div className="flex-col md:flex md:flex-row">
          <li className="m-4 mt-8 font-semibold hover:cursor-pointer">
            Network Status : {state ? "Online ✅" : "Offline 🎌"}
          </li>
          <div className="flex ">
            <Link to="/">
              <li className="m-4 mt-8 font-semibold hover:cursor-pointer hover:text-slate-100">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="m-4 mt-8 font-semibold hover:cursor-pointer  hover:text-slate-100">
                About Us
              </li>
            </Link>
          </div>

          <div className="flex ">
            <Link to="/contact">
              {" "}
              <li className="m-4 mt-8 font-semibold hover:cursor-pointer  hover:text-slate-100">
                Contact
              </li>
            </Link>
            <Link to="/cart">
              {" "}
              <li className="m-4 mt-8 font-semibold hover:cursor-pointer  hover:text-slate-100">
                Cart ({cartItems.length})
              </li>{" "}
            </Link>
          </div>

          <div className="flex ">
            <Link to="/grocery">
              <li className="m-4 mt-8 font-semibold hover:cursor-pointer  hover:text-slate-100">
                Grocery
              </li>
            </Link>
            <div className="flex ">
              <li className="m-4 mt-8 font-semibold hover:cursor-pointer  hover:text-slate-100">
                {loggedInUser}:
              </li>
              <button
                className="bg-gray-400 w-16 h-8 mt-6  mr-2 rounded-lg border-2 border-gray-800 hover:bg-gray-500"
                onClick={() => {
                  login === "Login" ? setLogin("Logout") : setLogin("Login");
                }}
              >
                {login}
              </button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Header;
