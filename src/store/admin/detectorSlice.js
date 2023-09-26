import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  err: null,
  data: [],
  delete: false,
  edit: false,
};
const detector = createSlice({
  name: 'detector',
  initialState: initState,
  reducers: {
    loadingDetector: (state) => {
      // eslint-disable-next-line no-param-reassign
      state = initState;
      state.loading = true;
    },
    successDetector: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    failDetector: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    isDeleteDetector: (state, action) => {
      state.delete = action.payload;
    },
    isEditDetector: (state, action) => {
      state.edit = action.payload;
    },
  },
});

const { reducer, actions } = detector;
export const {
  loadingDetector, successDetector, failDetector, isDeleteDetector, isEditDetector,
} = actions;
export default reducer;
