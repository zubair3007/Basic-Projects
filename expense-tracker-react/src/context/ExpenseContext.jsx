import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Food", "Travel", "Utilities", "Entertainment", "Other"];

  const addExpense = (description, amount, category) => {
    setExpenses([
      ...expenses,
      {
        id: uuidv4(),
        description,
        amount,
        category,
      },
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        categories,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
