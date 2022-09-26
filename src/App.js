import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => (
  <div style={{ width: "60%", margin: "auto" }}>
    <h3>Adcionar Despesa</h3>
    <ExpenseForm />
    <hr style={{ border: "1px solid grey" }} />

    <h3>Gestão de Gastos</h3>
    <ExpenseList />
  </div>
);

export default App;
