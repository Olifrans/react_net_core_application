import {
  setExpenses,
  newExpense,
  editExpense,
  deleteExpense,
  setExpensesError,
  newExpenseError,
  editExpenseError,
  deleteExpenseError,
} from "../app/expensesSlice";
import * as axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7054/Gastos",
});

export const GetExpenses = async (dispatch) => {
  try {
    //api get axios-backend
    const { data } = await axiosInstance.get();
    dispatch(setExpenses(data));

    // const expenses = [
    //   { id: 1, description: "Teste", amount: 45.23 },
    //   { id: 2, description: "Teste01", amount: 45.23 },
    //   { id: 1, description: "Teste02", amount: 45.23 },
    // ];
    // dispatch(setExpenses(expenses));
  } catch {
    dispatch(setExpensesError());
  }
};

export const NewExpense = async (dispatch, expense) => {
  try {
    //api post axios-backend
    const { data } = await axiosInstance.post("", expense);
    dispatch(newExpense(data));
  } catch {
    dispatch(newExpenseError());
  }
};

export const EditExpense = async (dispatch, expense) => {
  try {
    //api put axios-backend
    await axiosInstance.put("", expense);
    dispatch(editExpense(expense));
  } catch {
    dispatch(editExpenseError());
  }
};

export const DeleteExpense = async (dispatch, expense) => {
  try {
    //api delete axios-backend
    console.log("Deletando gasto: ", expense);
    await axiosInstance.delete("", { data: { ...expense } });
    dispatch(deleteExpense(expense));
  } catch {
    dispatch(deleteExpenseError());
  }
};
