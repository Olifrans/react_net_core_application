import { ToastContainer } from "react-toastify";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => (
  <div style={{ width: "60%", margin: "auto" }}>
    <ToastContainer />

    <h3>Post-Api Dados Redux-React</h3>
    <ExpenseForm />
    <hr style={{ border: "1px solid grey" }} />

    <h3>Get-Api Dados Redux-React</h3>
    <ExpenseList />
  </div>
);

export default App;
