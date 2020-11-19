import {createSlice} from "@reduxjs/toolkit";

const initState = {
    loading: false,
    err: null,
    data: [],
    delete: false,
};
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
        },
        isDeleteDetector: (state,action) => {
            state.delete = action.payload;
        }
    }
});

const {reducer, actions} = detector;
export const {loadingDetector, successDetector, failDetector, isDeleteDetector} = actions;
export default reducer;