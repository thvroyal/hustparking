import { createSlice } from '@reduxjs/toolkit';
import sortBy from '../../helpers/sort';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const slot = createSlice({
  name: 'slot',
  initialState: initState,
  reducers: {
    loadingSlot: (state, action) => {
      state.loading = action.payload || true;
    },
    successSlot: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedSlot: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
    sortSlot: (state, action) => {
      const sortedState = [...state.data];
      sortBy(sortedState, action.payload);
      state.data = sortedState;
    },
  },
});

const { reducer, actions } = slot;
export const {
  loadingSlot, successSlot, failedSlot, sortSlot,
} = actions;
export default reducer;
