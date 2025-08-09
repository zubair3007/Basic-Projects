import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function Summary() {
  const { expenses, selectedCategory } = useContext(ExpenseContext);
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;
  const total = filteredExpenses
    .reduce((sum, expense) => sum + expense.amount, 0)
    .toFixed(2);

  return (
    <div className="summary-container">
      <h2>
        Total: ${total}{" "}
        {selectedCategory ? `(${selectedCategory})` : "(All Categories)"}
      </h2>
    </div>
  );
}

export default Summary;
