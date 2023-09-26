import { configureStore } from '@reduxjs/toolkit';
import areaReducer from './admin/areaSlice';
import contractReducer from './admin/contractSlice';
import detectorByIdReducer from './admin/detectorByIdSlice';
import detectorReducer from './admin/detectorSlice';
import districtReducer from './admin/districtSlice';
import fieldReducer from './admin/fieldSlice';
import gatewayFieldReducer from './admin/gatewayfieldSlice';
import gatewayReducer from './admin/gatewaySlice';
import listManagerReducer from './admin/managersSlice';
import slotByIdReducer from './admin/slotByIdSlice';
import slotReducer from './admin/SlotSlice';
import listTagReducer from './admin/tagsSlice';
import listUsersReducer from './admin/UsersSlice';
import authReducer from './authSlice';
import packetReducer from './debug/packageSlice';
import packageTagReducer from './debug/packageTagSlice';
import notifyReducer from './notifySlice';
import listContractReducer from './user/listContractSlice';
import utilsReducer from './utilsSlice';
import historyDemoReducer from './historyDemo';

const rootReducer = {
  detector: detectorReducer,
  field: fieldReducer,
  slot: slotReducer,
  gatewayField: gatewayFieldReducer,
  gateway: gatewayReducer,
  packet: packetReducer,
  detectorById: detectorByIdReducer,
  slotById: slotByIdReducer,
  auth: authReducer,
  listUser: listUsersReducer,
  contract: contractReducer,
  utils: utilsReducer,
  listContract: listContractReducer,
  listManager: listManagerReducer,
  listTag: listTagReducer,
  packageTag: packageTagReducer,
  notify: notifyReducer,
  area: areaReducer,
  district: districtReducer,
  historyDemo: historyDemoReducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
