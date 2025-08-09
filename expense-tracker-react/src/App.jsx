
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';

import { ExpenseProvider } from "./context/ExpenseContext";

import './App.css'

function App() {
  return (
    <ExpenseProvider>
      <div className="app-container">
        <div className="tracker-container">
          <h1>Expense Tracker</h1>
          <ExpenseForm />
          <Summary />
          <ExpenseList />
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
