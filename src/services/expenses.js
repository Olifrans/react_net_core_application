// import { ActionCreators } from "../app/expensesReducer";
import {
  setExpenses,
  newExpense,
  editExpense,
  deleteExpense,
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
    // dispatch(ActionCreators.setExpenses(data));
  } catch {
    console.log("Error!");
  }
};


export const NewExpense = async (dispatch, expense) => {
  try {
    //api post axios-backend
    const { data } = await axiosInstance.post("", expense);
    dispatch(setExpenses(data));
    // dispatch(ActionCreators.setExpenses(data));
  } catch {
    console.log("Error!");
  }
};


export const EditExpense = async (dispatch, expense) => {
  try {
    //api put axios-backend
    await axiosInstance.put("", expense);
    dispatch(editExpense(expense));
    // dispatch(ActionCreators.editExpense(expense));
  } catch {
    console.log("Error!");
  }
};


export const DeleteExpense = async (dispatch, expense) => {
  try {
    //api delete axios-backend
    console.log("Deletando gasto: ", expense);
    await axiosInstance.delete("", { data: { ...expense } });
    dispatch(deleteExpense(expense));
    // dispatch(ActionCreators.deleteExpense(expense));
  } catch {
    console.log("Error!");
  }
};
