import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMainNav: true,
  showSecondaryNav: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    mainNavBarOn(state, action) {
      state.showMainNav = true;
    },
    mainNavBarOff(state, action) {
      state.showMainNav = false;
    },
    secondaryNavBarOn(state, action) {
      state.showSecondaryNav = true;
    },
    secondaryNavBarOff(state, action) {
      state.showSecondaryNav = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
