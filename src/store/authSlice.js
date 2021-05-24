import { createSlice } from '@reduxjs/toolkit';

const initState = {
  role: 0, // 0 is guest, 1 is user, 2 is admin
  isAuthenticated: false,
  error: null,
  loading: false,
  info: {},
};

const auth = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logOut: (state) => {
      state.role = 0;
      state.isAuthenticated = false;
    },
    handleError: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

const { reducer, actions } = auth;
export const {
  setLoading, setRole, logOut, handleError, setInfo,
} = actions;
export default reducer;
