import React from "react";
import { ActionCreators } from "../app/expensesReducer";
import * as axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7054/Gastos",
});

export const GetExpenses = async (dispatch) => {
  try {
    //api get axios-backend
    const { data } = await axiosInstance.get();
    dispatch(ActionCreators.setExpenses(data));

    ////Mock version
    // const expenses = [
    //   { id: 1, description: "Mantimentos", amount: 27.5 },
    //   { id: 2, description: "Energia", amount: 127.5 },
    //   { id: 3, description: "Alimentos", amount: 227.5 },
    //   { id: 4, description: "Tranportes", amount: 327.5 },
    // ];
    // dispatch(ActionCreators.setExpenses(expenses));

  } catch {
    console.log("Error!");
  }
};

export const NewExpense = async (dispatch, expense) => {
  try {
    //api post axios-backend
    const { data } = await axiosInstance.post("", expense);
    dispatch(ActionCreators.setExpenses(data));

    ////Mock version
    // dispatch(
    //   ActionCreators.newExpense({
    //     id: 10,
    //     description: expense.description,
    //     amount: expense.amount,
    //   })
    // );
    // dispatch(ActionCreators.setExpenses(expenses));
  } catch {
    console.log("Error!");
  }
};





export const EditExpense = async (dispatch, expense) => {
  try {

    await axiosInstance.put("", expense);
    dispatch(ActionCreators.editExpense(expense));
    
     ////Mock version
    // dispatch(ActionCreators.editExpense(expense));

  } catch {
    console.log("Error!");
  }
};





export const DeleteExpense = async (dispatch, expense) => {
  try {
    dispatch(ActionCreators.deleteExpense(expense));
  } catch {
    console.log("Error!");
  }
};
