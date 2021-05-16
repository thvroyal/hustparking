/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  err: null,
  data: [],
};
const detectorById = createSlice({
  name: 'detectorId',
  initialState: initState,
  reducers: {
    resetDetectorById: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = initState;
    },
    loadingDetectorById: (state) => {
      state = initState;
      state.loading = true;
    },
    successDetectorById: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    failDetectorById: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

const { reducer, actions } = detectorById;
export const {
  loadingDetectorById, successDetectorById, failDetectorById, resetDetectorById,
} = actions;
export default reducer;
