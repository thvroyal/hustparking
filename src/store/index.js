import {configureStore} from "@reduxjs/toolkit";
import detectorReducer from './admin/detectorSlice';
import fieldReducer from './admin/fieldSlice';
import slotReducer from './admin/SlotSlice';
import gatewayFieldReducer from './admin/gatewayfieldSlice';
import gatewayReducer from './admin/gatewaySlice'
import packetReducer from './debug/packageSlice'
import detectorByIdReducer from './admin/detectorByIdSlice';
import slotByIdReducer from './admin/slotByIdSlice';

const rootReducer = {
    detector: detectorReducer,
    field: fieldReducer,
    slot: slotReducer,
    gatewayField: gatewayFieldReducer,
    gateway: gatewayReducer,
    packet: packetReducer,
    detectorById: detectorByIdReducer,
    slotById: slotByIdReducer
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;