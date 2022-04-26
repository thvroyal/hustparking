import { createSlice } from '@reduxjs/toolkit';

const initNotify = {
  data: [],
};
const notify = createSlice({
  name: 'notify',
  initialState: initNotify,
  reducers: {
    getInfoC9: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

const { reducer, actions } = notify;
export const { getInfoC9 } = actions;
export default reducer;
