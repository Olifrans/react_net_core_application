import { configureStore } from "@reduxjs/toolkit";
import ToastifyMiddleware from "../middlewares/ToastifyMiddleware";
import expensesSlice from "./expensesSlice";

export const store = configureStore({
  reducer: {
    expensesSlice: expensesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ToastifyMiddleware),
});
