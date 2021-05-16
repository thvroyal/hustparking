import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  err: null,
  data: [],
};
const contract = createSlice({
  name: 'contract',
  initialState: initState,
  reducers: {
    loadingContract: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state = initState;
      state.loading = action.payload || true;
    },
    successContract: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failContract: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = contract;
export const { loadingContract, successContract, failContract } = actions;
export default reducer;
