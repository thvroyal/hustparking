import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const gateway = createSlice({
  name: 'gateway',
  initialState: initState,
  reducers: {
    loadingGateway: (state, action) => {
      state.loading = action.payload || true;
    },
    successGateway: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedGateway: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = gateway;
export const { loadingGateway, successGateway, failedGateway } = actions;
export default reducer;
