import {createSlice} from "@reduxjs/toolkit";

const initState = {
    loading: false,
    err: null,
    data: [],
};
const slotById = createSlice({
    name: 'slotById',
    initialState: initState,
    reducers: {
        loadingSlotById: (state, action) => {
            state = initState;
            state.loading = true;
        },
        successSlotById: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        failSlotById: (state, action) => {
            state.loading = false;
            state.err = action.payload;
        }
    }
});

const {reducer, actions} = slotById;
export const {loadingSlotById, successSlotById, failSlotById} = actions;
export default reducer;