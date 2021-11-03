import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const listManager = createSlice({
  name: 'listManager',
  initialState: initState,
  reducers: {
    loadingListManager: (state, action) => {
      state.loading = action.payload || true;
    },
    setListManager: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedListManager: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = listManager;
export const { loadingListManager, setListManager, failedListManager } = actions;
export default reducer;
