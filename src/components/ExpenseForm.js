import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NewExpense } from "../services/expenses";

export default () => {
  const descriptions = ["Mantimentos", "Energia", "Alimentos", "Tranportes"];
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(descriptions[0]);
  const [isNewExpense, setIsNewExpense] = useState(true);
  const dispatch = useDispatch();

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (isNewExpense) {
          //Criar nova despesa
          NewExpense(dispatch, { description: description, amount: amount });
        } else {
          //Editar despesa
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
              <Button variant="danger">Deletar</Button>
              <Button variant="success" type="submit">
                Salvar
              </Button>
              <Button variant="default">Cancelar</Button>
            </div>
          )}
        </div>
      </Row>
    </Form>
  );
};
