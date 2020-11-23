import {configureStore} from "@reduxjs/toolkit";
import detectorReducer from './detectorSlice';

const rootReducer = {
    detector: detectorReducer,
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;