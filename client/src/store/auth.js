import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: {},
  company: {},
  token: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.user = { ...action.payload.user };
      state.company = { ...action.payload.company };
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);

      state.isAuthenticated = true;
    },
    updateUser(state, action) {
      state.user = { ...action.payload };
    },
    updateCompany(state, action) {
      state.company = { ...action.payload };
    },
    logout(state) {
      state.user = {};
      state.company = {};
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
