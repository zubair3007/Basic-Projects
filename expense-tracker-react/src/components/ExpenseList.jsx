import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function ExpenseList() {
  const {
    expenses,
    deleteExpense,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useContext(ExpenseContext);

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <div className="list-container">
      <div className="filter-group">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="input-category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <ul className="expense-list">
        {filteredExpenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <span className="expense-description">
              {expense.description} ({expense.category})
            </span>
            <div className="expense-actions">
              <span className="expense-amount">
                ${expense.amount.toFixed(2)}
              </span>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
