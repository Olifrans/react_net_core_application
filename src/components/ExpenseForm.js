import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default () => {
  const descriptions = ["Mantimentos", "Energia", "Alimentos", "Tranportes"];
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(descriptions[0]);
  const [isNewExpense, setIsNewExpense] = useState(true);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (isNewExpense) {
          //create a new expense
        } else {
          //edit a new expense
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
              Add
            </Button>
          ) : (
            <div>
              <Button variant="danger">Delete</Button>
              <Button variant="success" type="submit">
                Save
              </Button>
              <Button variant="default">Cancel</Button>
            </div>
          )}
        </div>
      </Row>
    </Form>
  );
};
