import { configureStore } from '@reduxjs/toolkit';
import detectorReducer from './admin/detectorSlice';
import fieldReducer from './admin/fieldSlice';
import slotReducer from './admin/SlotSlice';
import gatewayFieldReducer from './admin/gatewayfieldSlice';
import gatewayReducer from './admin/gatewaySlice';
import packetReducer from './debug/packageSlice';
import detectorByIdReducer from './admin/detectorByIdSlice';
import slotByIdReducer from './admin/slotByIdSlice';
import authReducer from './authSlice';
import listUsersReducer from './admin/UsersSlice';
import contractReducer from './admin/contractSlice';
import utilsReducer from './utilsSlice';
import listContractReducer from './user/listContractSlice';
import listManagerReducer from './admin/managersSlice';
import listTagReducer from './admin/tagsSlice';
import packageTagReducer from './debug/packageTagSlice';

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
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
