import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const packetTag = createSlice({
  name: 'packetTag',
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

const { reducer, actions } = packetTag;
export const { loadingPackageTag, successPackageTag, failedPackageTag } = actions;
export default reducer;
