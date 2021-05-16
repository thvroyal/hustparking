import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const packet = createSlice({
  name: 'packet',
  initialState: initState,
  reducers: {
    loadingPackage: (state, action) => {
      state.loading = action.payload || true;
    },
    successPackage: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedPackage: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = packet;
export const { loadingPackage, successPackage, failedPackage } = actions;
export default reducer;
