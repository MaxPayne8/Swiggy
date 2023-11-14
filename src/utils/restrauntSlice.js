import { createSlice } from "@reduxjs/toolkit";

const restSlice = createSlice({
  name: "restaurants",
  initialState: { allMov: null },
  reducers: {
    addAllRest: (state, action) => {
      state.allMov = action.payload;
    },
  },
});

export default restSlice.reducer;
export const { addAllRest } = restSlice.actions;
