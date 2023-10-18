import Header from "./components/Header";
import "./App.css";
import Body from "./components/Body";
import { useState } from "react";
import UserContext from "./utils/userContext";
import { Outlet, createBrowserRouter } from "react-router-dom";

import About from "./components/About";
import Contacts from "./components/Contacts";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Grocery from "./components/Grocery";

const App = () => {
  const [userName, setUserName] = useState("");

  return (
    <div>
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Header />
          <Outlet />
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: <Grocery />,
      },
    ],
  },
]);

export default App;
