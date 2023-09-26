import { createSlice } from '@reduxjs/toolkit';

const initState = {
  listContract: [],
  error: null,
  loading: false,
};

const listContract = createSlice({
  name: 'listContract',
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    fetchListContract: (state, action) => {
      state.listContract = action.payload;
      state.error = null;
      state.loading = false;
    },
    handleError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = listContract;
export const { setLoading, fetchListContract, handleError } = actions;
export default reducer;
