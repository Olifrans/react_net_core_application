import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetExpenses } from "../services/expenses";

export default () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expensesReducer.expenses);

  useEffect(() => {
    GetExpenses(dispatch);
  }, []);

  return expenses.map((e) => (
    <div style={{ marginBottom: "1rem" }}>
      <ListRow expense={e} />
    </div>
  ));
};

const ListRow = ({ expense }) => {
  return (
    <div>
      <Row>
        <Col>{expense.description}</Col>
        <Col>{expense.amount}</Col>
        <Button variant="warning">Edit</Button>
      </Row>
      <hr />
    </div>
  );
};
