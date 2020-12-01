import {createSlice} from "@reduxjs/toolkit";

const initState = {
    loading: false,
    data: null,
    err: null,
}

const slot = createSlice({
    name: 'slot',
    initialState: initState,
    reducers: {
        loadingSlot: (state, action) => {
            state.loading = action.payload || true;
        },
        successSlot: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        failedSlot: (state, action) => {
            state.err = action.payload;
            state.loading = false;
        }
    }
});

const {reducer, actions} = slot;
export const {loadingSlot, successSlot, failedSlot} = actions;
export default reducer;