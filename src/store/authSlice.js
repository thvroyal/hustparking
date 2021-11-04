import { createSlice } from '@reduxjs/toolkit';
import { SET_GUEST, SET_USER, SET_AD, SET_MN } from '../helpers/constants';

const initState = {
  role: SET_GUEST, // 0 is guest, 1 is user, 2 is admin, 3 is manager
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
        case SET_USER:
          state.alias = 'us';
          break;
        case SET_AD:
          state.alias = 'ad';
          break;
        case SET_MN:
          state.alias = 'mn';
          break;
        default:
          state.alias = 'public';
      }
    },
    logOut: (state) => {
      state.role = SET_GUEST;
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
