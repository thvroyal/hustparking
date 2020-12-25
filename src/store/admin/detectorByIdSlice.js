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
        resetDetectorById: (state, action) => {
            state = initState;
        },
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
export const {loadingDetectorById, successDetectorById, failDetectorById, resetDetectorById} = actions;
export default reducer;