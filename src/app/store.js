import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesReducer.js";

export const store = configureStore({
  reducer: {
    expensesReducer: expensesReducer,

    // expensesReducer: expensesReducer,
  },
});
