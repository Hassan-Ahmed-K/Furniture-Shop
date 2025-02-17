import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:JSON.parse(localStorage.getItem("USER")),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {

      console.log("action = ", action.payload);
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("USER", JSON.stringify(state.user));
      JSON.parse(localStorage.getItem("USER"));
      state.error = null;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "Login failed";
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("USER");
      
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
