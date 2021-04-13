import { createSlice } from "@reduxjs/toolkit";

const initState = {
  role: 0, //0 is guest, 1 is user, 2 is admin
  isAuthenticated: false,
  error: null,
};

const auth = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logOut: (state, action) => {
      state.role = 0;
      state.isAuthenticated = false;
    },
    handleError: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = auth;
export const { setRole, logOut, handleError } = actions;
export default reducer;
