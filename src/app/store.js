import { configureStore } from "@reduxjs/toolkit";
import expensesSlice from "./expensesSlice";
// import expensesReducer from "./expensesReducer";

export const store = configureStore({
  reducer: {
    // expensesReducer: expensesReducer,
    expensesSlice: expensesSlice,
  },
});
