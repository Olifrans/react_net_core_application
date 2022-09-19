import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetExpenses } from "../services/expenses";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    GetExpenses(dispatch);
  }, []);

  return "expenses list";
};
