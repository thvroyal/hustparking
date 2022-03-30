import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  err: null,
  data: [],
};

const district = createSlice({
  name: 'district',
  initialState: initState,
  reducers: {
    loadingDistrict: (state, action) => {
      state.loading = action.payload || true;
    },
    successDistrict: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failDistrict: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = district;
export const { loadingDistrict, successDistrict, failDistrict } = actions;
export default reducer;
