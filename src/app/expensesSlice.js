import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },

  reducers: {
    setExpenses: (state, action) => {
      // toast.success("Teste realizado com sucesso usando o ReactToastify!");
      return { ...state, expenses: [...action.payload] };
    },

    newExpense: (state, action) => {
      return { ...state, expenses: [action.payload, ...state.expenses] };
    },

    editExpense: (state, action) => {
      const expenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          expense = action.payload;
        }
        return expense;
      });
      return { ...state, expenses: [...expenses] };
    },

    deleteExpense: (state, action) => {
      const expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return { ...state, expenses: [...expenses] };
    },
  },
});

export const { setExpenses, newExpense, editExpense, deleteExpense } =
  expensesSlice.actions;
export default expensesSlice.reducer;
