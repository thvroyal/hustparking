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
    loadingPackageTag: (state, action) => {
      state.loading = action.payload || true;
    },
    successPackageTag: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedPackageTag: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = packetTag;
export const { loadingPackageTag, successPackageTag, failedPackageTag } = actions;
export default reducer;
