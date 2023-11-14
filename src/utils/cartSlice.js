import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: { items: [], index: null },
  name: "cart",
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },

  

    removeItems: (state) => {
      state.items.pop();
    },

    clearCart: (state) => {
      state.items.length = 0;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items.splice(id, 1);
    },
  },
});

export const { addItems, removeItems, clearCart,  removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
