import {
  newExpense,
  editExpense,
  deleteExpense,
  setExpensesError,
  newExpenseError,
  editExpenseError,
  deleteExpenseError,
} from "../app/expensesSlice";
import { toast } from "react-toastify";

const ToastifyMiddleware = () => (next) => (action) => {
  switch (action.type) {
    case newExpense.type:
      toast.success("Dado cadastrado com sucesso!");
      break;

    case editExpense.type:
      toast.success("Dado alterado com sucesso!");
      break;

    case deleteExpense.type:
      toast.success("Dado excluido com sucesso!");
      break;

    case setExpensesError.type:
      toast.error("Error! Ao tentar carregar os dados");
      break;

    case newExpenseError.type:
      toast.error("Error! Ao tentar adcionar o dado");
      break;

    case editExpenseError.type:
      toast.error("Error! Ao tentar alterar o dado");
      break;

    case deleteExpenseError.type:
      toast.error("Error! Ao tentar excluir o dado");
      break;

    default:
      break;
  }
  return next(action);
};

export default ToastifyMiddleware;
