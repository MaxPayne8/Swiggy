import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import restReducer from "./restrauntSlice";
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    restaurants: restReducer,
  },
});

export default appStore;
