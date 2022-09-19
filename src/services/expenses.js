import { ActionCreators } from "../App/expensesReducer";

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
