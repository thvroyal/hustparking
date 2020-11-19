import {createSlice} from "@reduxjs/toolkit";

const ModalDetectorSlice = createSlice({
    name: 'modalDetector',
    initialState: {
        status: false,
    },
    reducers: {
        openModalDetector : (state, action) => {
            state.status = true;
        },
        hideModalDetector : (state,action) => {
            state.status = false;
        }
    }
});

const {reducer, actions} = ModalDetectorSlice;
export const { openModalDetector, hideModalDetector} = actions;
export default reducer;
