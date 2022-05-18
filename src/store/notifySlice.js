import { createSlice } from '@reduxjs/toolkit';

const initNotify = {
  data: [],
  loading: false,
};
const notify = createSlice({
  name: 'notify',
  initialState: initNotify,
  reducers: {
    isLoading: (state) => {
      state.loading = true;
    },
    getInfo: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

const { reducer, actions } = notify;
export const { getInfo, isLoading } = actions;
export default reducer;
