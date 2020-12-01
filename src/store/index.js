import {configureStore} from "@reduxjs/toolkit";
import detectorReducer from './admin/detectorSlice';
import fieldReducer from './admin/fieldSlice';
import slotReducer from './admin/SlotSlice';
import gatewayFieldReducer from './admin/gatewayfieldSlice';

const rootReducer = {
    detector: detectorReducer,
    field: fieldReducer,
    slot: slotReducer,
    gatewayField: gatewayFieldReducer,
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;