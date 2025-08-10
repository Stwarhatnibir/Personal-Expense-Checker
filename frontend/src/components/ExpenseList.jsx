import { useState } from "react";

export default function ExpenseList({ expenses }) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filteredExpenses = expenses.filter((exp) => {
    return (
      (categoryFilter === "All" || exp.category === categoryFilter) &&
      (!dateFilter || exp.date === dateFilter)
    );
  });

  return (
    <div className="expense-list-container">
      <h2>Your Expenses</h2>
      <div className="filters">
        <div className="filter-group">
          <label>Filter by Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="no-expenses">No expenses found</p>
      ) : (
        <ul className="expense-list">
          {filteredExpenses.map((expense, index) => (
            <li key={index} className="expense-item">
              <div className="expense-amount">${expense.amount.toFixed(2)}</div>
              <div className="expense-details">
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">{expense.date}</span>
                {expense.description && (
                  <span className="expense-description">
                    {expense.description}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
