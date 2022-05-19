import { createSlice } from '@reduxjs/toolkit';

const initNotify = {
  data: [],
};
const notify = createSlice({
  name: 'notify',
  initialState: initNotify,
  reducers: {
    setInfo: (state, action) => {
      state.data = action.payload;
    },

    updateInfo: (state, action) => {
      const newState = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      state.data = [
        ...newState,
      ];
    },
  },
});

const { reducer, actions } = notify;
export const { updateInfo, setInfo } = actions;
export default reducer;
