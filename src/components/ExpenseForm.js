import { Button, Col, Form, Row } from "react-bootstrap";

export default () => {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Label></Form.Label>
          <Form.Control></Form.Control>
        </Col>

        <Col>
          <Form.Label></Form.Label>
          <Form.Control></Form.Control>
        </Col>
        <div style={{ marginTop: "auto" }}>
          {isNewExpense
          ? <Button variant="primary" type="submit">Add</Button>
          : <div>
            <Button variant="primary" type="submit">Delete</Button>
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="primary" type="submit">Cancel</Button>
            </div>}
        </div>
      </Row>
    </Form>
  );
};
