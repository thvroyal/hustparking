import { createSlice } from '@reduxjs/toolkit';
import { setAd, setUser, setMn } from '../helpers/constants';
const initState = {
  role: 0, // 0 is guest, 1 is user, 2 is admin, 3 is manager
  isAuthenticated: false,
  error: null,
  loading: false,
  info: {},
  alias: 'public',
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
      switch (action.payload) {
        case setUser:
          state.alias = 'us';
          break;
        case setAd:
          state.alias = 'ad';
          break;
        case setMn:
          state.alias = 'mn';
          break;
        default:
          state.alias = 'public';
      }
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
  setLoading, setRole, logOut, handleError, setInfo, setAlias,
} = actions;
export default reducer;
