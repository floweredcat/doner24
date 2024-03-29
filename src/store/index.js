import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { cartSlice } from "./cart";
import { dishSlice } from "./dish";
import { foldersSlice } from "./folders";

const rootReducer = combineReducers({
  folders: foldersSlice.reducer,
  cart: cartSlice.reducer,
  dish: dishSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
  ],
});
