import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetExpenses } from "../services/expenses";
import ExpenseForm from "./ExpenseForm";

// export default ExpenseList = () => {
export default () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expensesSlice.expenses);
  

  useEffect(() => {
    GetExpenses(dispatch);
  }, []);

  return expenses.map((e) => (
    <div key={e.id} style={{ marginBottom: "1rem" }}>
      <ListRow expense={e} />
    </div>
  ));
};

const ListRow = ({ expense }) => {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
  ) : (
    <div>
      <Row>
        <Col>{expense.description}</Col>
        <Col>${expense.amount}</Col>
        <Button variant="warning" onClick={() => setIsEditing(!isEditing)}>
          Editar
        </Button>
      </Row>
      <hr />
    </div>
  );
};
