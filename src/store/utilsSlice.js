import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isExpandedSidebar: true,
  widthSidebar: 0,
};

const utils = createSlice({
  name: 'utils',
  initialState: initState,
  reducers: {
    initSidebar: (state, action) => {
      state.isExpandedSidebar = localStorage.sidebar ?? false;
      state.widthSidebar = action.payload;
    },
    toggleSideBar: (state) => {
      state.isExpandedSidebar = !state.isExpandedSidebar;
      localStorage.setItem('sidebar', state.isExpandedSidebar);
    },
  },
});

const { reducer, actions } = utils;
export const { initSidebar, toggleSideBar } = actions;
export default reducer;
