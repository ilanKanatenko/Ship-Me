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
      console.log("wwwwwwwww", action.payload);
      state.user = { ...action.payload.user };
      state.company = { ...action.payload.company };

      state.isAuthenticated = true;
    },
    updateUser(state, action) {
      console.log("update user", action.payload);
      state.user = { ...action.payload };
    },
    updateCompany(state, action) {
      console.log("update company", action.payload);
      state.company = { ...action.payload };
    },
    logout(state) {
      state = initialAuthState;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
