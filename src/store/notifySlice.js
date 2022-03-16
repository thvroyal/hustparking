import { createSlice } from '@reduxjs/toolkit';

const initNotify = {
  data: [],
};
const notify = createSlice({
  name: 'notify',
  initialState: initNotify,
  reducers: {
    getInfo: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

const { reducer, actions } = notify;
export const { getInfo } = actions;
export default reducer;
