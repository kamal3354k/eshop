import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { productAPI } from "./services/product";


//all reducer
const rootReducer = combineReducers({
  auth: authSlice,
  [productAPI.reducerPath]:productAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(productAPI.middleware)
});

export default store;
