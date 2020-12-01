import {configureStore} from "@reduxjs/toolkit";
import detectorReducer from './admin/detectorSlice';
import fieldReducer from './admin/fieldSlice';
import slotReducer from './admin/SlotSlice';

const rootReducer = {
    detector: detectorReducer,
    field: fieldReducer,
    slot: slotReducer
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;