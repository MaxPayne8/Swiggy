import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: { items: [], index: null, totalAmount: [], numOfItems: 0 },
  name: "cart",
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },

    addAmount: (state, action) => {
      state.totalAmount.push(action.payload);
    },

    removeItems: (state, action) => {
      state.items.pop();
      state.totalAmount.pop();
    },

    clearCart: (state) => {
      state.items.length = 0;
      state.totalAmount.length = 0;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items.splice(id, 1);
    },
    removeAmount: (state, action) => {
      const id = action.payload;
      state.totalAmount.splice(id, 1);
    },
    totalItems: (state, action) => {
      state.numOfItems = action.payload;
    },
  },
});

export const {
  addItems,
  removeItems,
  clearCart,
  removeItem,
  addAmount,
  removeAmount,
  totalItems,
} = cartSlice.actions;
export default cartSlice.reducer;
