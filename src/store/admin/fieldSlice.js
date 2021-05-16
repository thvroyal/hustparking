import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  data: null,
  err: null,
};

const field = createSlice({
  name: 'field',
  initialState: initState,
  reducers: {
    loadingField: (state, action) => {
      state.loading = action.payload || true;
    },
    successField: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedField: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = field;
export const { loadingField, successField, failedField } = actions;
export default reducer;
