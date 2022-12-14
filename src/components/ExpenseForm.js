import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DeleteExpense, EditExpense, NewExpense } from "../services/expenses";

export default ({ expense, setIsEditing }) => {
  const descriptions = ["Mantimentos", "Energia", "Alimentos", "Tranportes"];
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(descriptions[0]);
  const [isNewExpense, setIsNewExpense] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expense !== undefined) {
      setIsNewExpense(false);
      setAmount(expense.amount);
    } else {
      setIsNewExpense(true);
    }
  }, [expense]);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (isNewExpense) {
          //Criar nova despesa
          NewExpense(dispatch, {
            description: description,
            amount: Number(amount),
          });
        } else {
          EditExpense(dispatch, {
            id: expense.id,
            description: description,
            amount: Number(amount),
          });
          setIsEditing(false);
        }
      }}
    >
      <Row>
        <Col>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) => setDescription(event.target.value)}
          >
            {descriptions.map((fr) => (
              <option>{fr}</option>
            ))}
          </Form.Control>
        </Col>

        <Col>
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Col>

        <div style={{ marginTop: "auto" }}>
          {isNewExpense ? (
            <Button variant="primary" type="submit">
              Adcionar
            </Button>
          ) : (
            <div>
              <Button
                style={{ marginRight: "2px" }}
                variant="danger"
                onClick={() => DeleteExpense(dispatch, expense)}
              >
                Deletar
              </Button>

              <Button
                style={{ marginRight: "2px" }}
                variant="success"
                type="submit"
              >
                Salvar
              </Button>

              <Button
                style={{ marginRight: "2px" }}
                variant="default"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </Row>
    </Form>
  );
};
