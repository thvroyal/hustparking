import {createSlice} from "@reduxjs/toolkit";

const initState = [];
const detector = createSlice({
    name: 'detector',
    initialState: initState,
    reducers: {
        loadingDetector: (state, action) => {
            state = initState;
            state.loading = true;
        },
        successDetector: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        failDetector: (state, action) => {
            state.loading = false;
            state.err = action.payload;
        }
    }
});

const {reducer, actions} = detector;
export const {loadingDetector, successDetector, failDetector} = actions;
export default reducer;