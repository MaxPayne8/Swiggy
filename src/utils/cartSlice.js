import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: {
    items: [],
    index: null,
    totalAmount: [],
    numOfItems: [],
    warning: false,
    amountIndex: null,
  },
  name: "cart",
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },

    addAmount: (state, action) => {
      state.totalAmount.push(action.payload);
    },
    addAmntIndex: (state, action) => {
      state.amountIndex = action.payload;
    },

    addAmountIndex: (state, action) => {
      state.totalAmount[state.amountIndex] += action.payload;
    },

    removeItems: (state, action) => {
      if (state.numOfItems[action.payload] === 1) {
        state.numOfItems.splice(action.payload, 1);
        state.items.splice(action.payload, 1);
      } else {
        state.numOfItems[action.payload]--;
      }
    },

    clearCart: (state) => {
      state.items.length = 0;
      state.totalAmount.length = 0;
      state.numOfItems.length = 0;
    },

    removeAmount: (state, action) => {
      if (state.totalAmount[state.amountIndex] === Math.floor(action.payload)) {
        state.totalAmount.splice(state.amountIndex, 1);
      } else state.totalAmount[state.amountIndex] -= action.payload;
    },
    totalItems: (state, action) => {
      state.numOfItems.push(action.payload);
    },
    addWarning: (state, action) => {
      state.warning = action.payload;
    },
    addTotalItems: (state, action) => {
      state.numOfItems[action.payload]++;
    },
  },
});

export const {
  addItems,
  removeItems,
  clearCart,

  addAmount,
  removeAmount,
  totalItems,
  addWarning,
  addTotalItems,
  addAmntIndex,
  addAmountIndex,
} = cartSlice.actions;
export default cartSlice.reducer;
