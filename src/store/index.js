import {configureStore} from "@reduxjs/toolkit";
import detectorReducer from './detectorSlice';
import ModalDetector from './ModalSlice';
const rootReducer = {
    detector: detectorReducer,
    ModalDetector
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;