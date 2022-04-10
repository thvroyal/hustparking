import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  err: null,
  data: [],
};

const area = createSlice({
  name: 'area',
  initialState: initState,
  reducers: {
    loadingArea: (state, action) => {
      state.loading = action.payload || true;
    },
    successArea: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failArea: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = area;
export const { loadingArea, successArea, failArea } = actions;
export default reducer;
