import { configureStore } from "@reduxjs/toolkit";
import ToastMiddleware from "../middlewares/ToastMiddleware";
import expensesSlice from "./expensesSlice";

export const store = configureStore({
  reducer: {
    expensesSlice: expensesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ToastMiddleware),
});
