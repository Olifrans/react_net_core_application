import React from "react";
import { ActionCreators } from "../app/expensesReducer";

export const GetExpenses = async (dispatch) => {
  try {
    //api call
    const expenses = [
      { id: 1, description: "Mantimentos", amount: 27.5 },
      { id: 2, description: "Energia", amount: 127.5 },
      { id: 3, description: "Alimentos", amount: 227.5 },
      { id: 4, description: "Tranportes", amount: 327.5 },
    ];

    dispatch(ActionCreators.setExpenses(expenses));
  } catch {
    console.log("Error!");
  }
};



export const NewExpense = async (dispatch, expense) => {
  try {
    //api call
    dispatch(
      ActionCreators.newExpense({
        id: 10,
        description: expense.description,
        amount: expense.amount,
      })
    );

    // dispatch(ActionCreators.setExpenses(expenses));
  } catch {
    console.log("Error!");
  }
};
