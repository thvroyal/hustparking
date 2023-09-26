import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const gatewayField = createSlice({
  name: 'gatewayField',
  initialState: initState,
  reducers: {
    loadingGatewayField: (state, action) => {
      state.loading = action.payload || true;
    },
    successGatewayField: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedGatewayField: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = gatewayField;
export const { loadingGatewayField, successGatewayField, failedGatewayField } = actions;
export default reducer;
