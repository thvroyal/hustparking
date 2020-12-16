import {createSlice} from "@reduxjs/toolkit";

const initState = {
    loading: false,
    err: null,
    data: [],
};
const detectorById = createSlice({
    name: 'detectorId',
    initialState: initState,
    reducers: {
        loadingDetectorById: (state, action) => {
            state = initState;
            state.loading = true;
        },
        successDetectorById: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        failDetectorById: (state, action) => {
            state.loading = false;
            state.err = action.payload;
        }
    }
});

const {reducer, actions} = detectorById;
export const {loadingDetectorById, successDetectorById, failDetectorById} = actions;
export default reducer;