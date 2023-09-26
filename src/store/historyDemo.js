import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const listHistoryDemo = createSlice({
  name: 'listHistoryDemo',
  initialState: initState,
  reducers: {
    loadingListHistoryDemo: (state, action) => {
      state.loading = action.payload || true;
    },
    successListHistoryDemo: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedListHistoryDemo: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = listHistoryDemo;
export const { loadingListHistoryDemo, successListHistoryDemo, failedListHistoryDemo } = actions;
export default reducer;