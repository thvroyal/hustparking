import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  err: null,
  data: [],
};
const tag = createSlice({
  name: 'tag',
  initialState: initState,
  reducers: {
    loadingTag: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state = initState;
      state.loading = action.payload || true;
    },
    successTag: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failTag: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = tag;
export const { loadingTag, successTag, failTag } = actions;
export default reducer;
