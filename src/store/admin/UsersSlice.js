import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const listUsers = createSlice({
  name: 'listUsers',
  initialState: initState,
  reducers: {
    loadingListUsers: (state, action) => {
      state.loading = action.payload || true;
    },
    successListUsers: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedListUsers: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = listUsers;
export const { loadingListUsers, successListUsers, failedListUsers } = actions;
export default reducer;
