import {configureStore} from "@reduxjs/toolkit";
import detectorReducer from './admin/detectorSlice';
import fieldReducer from './admin/fieldSlice';

const rootReducer = {
    detector: detectorReducer,
    field: fieldReducer,
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;