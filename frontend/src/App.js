import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MonthlySummary from "./components/MonthlySummary";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post("http://localhost:3001/api/expenses", expense);
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="app-container">
      <h1>Personal Expense Tracker</h1>
      <div className="content">
        <div className="form-section">
          <ExpenseForm onAddExpense={addExpense} />
        </div>
        <div className="list-section">
          <ExpenseList expenses={expenses} />
        </div>
        <div className="chart-section">
          <MonthlySummary expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
