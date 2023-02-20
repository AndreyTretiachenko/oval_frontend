import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import navigateSlice from "../features/navigateSlice";
import ordersSlice from "../features/ordersSlice";
import clientsSlice from "../features/clientsSlice";
import modalsSlice from "../features/modalsSlice";
import companySlice from "../features/companySlice";
import { ovalApi } from "../api";
import { setupListeners } from "@reduxjs/toolkit/query";
import workListSlice from "../features/workListSlice";
import createOrderSlice from "../features/createOrderSlice";

const reducers = combineReducers({
  navigate: navigateSlice,
  orders: ordersSlice,
  clients: clientsSlice,
  modals: modalsSlice,
  company: companySlice,
  worklist: workListSlice,
  dataCreateOrder: createOrderSlice,
  [ovalApi.reducerPath]: ovalApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ovalApi.middleware),
});

setupListeners(store.dispatch);
