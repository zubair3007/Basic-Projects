import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const { addExpense, categories } = useContext(ExpenseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && !isNaN(amount) && amount > 0 && category) {
      addExpense(description.trim(), parseFloat(amount), category);
      setDescription("");
      setAmount("");
      setCategory("");
    }
  };

  return (
    <div className="form-container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-description"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-amount"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-category"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} className="add-button">
        Add Expense
      </button>
    </div>
  );
}

export default ExpenseForm;
