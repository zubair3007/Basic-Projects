import { useReducer } from "react";
import CounterForm from './Components/CounterForm';
import CounterList from './Components/CounterList';

import './App.css';


// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'ADD_COUNTER':
      return [...state, { id: Date.now(), name: action.payload, count: 0 }];
    case 'INCREMENT':
      return state.map(counter =>
        counter.id === action.payload ? { ...counter, count: counter.count + 1 } : counter
      );
    case 'DECREMENT':
      return state.map(counter =>
        counter.id === action.payload ? { ...counter, count: Math.max(0, counter.count - 1) } : counter
      );
    case 'RESET_ALL':
      return state.map(counter => ({ ...counter, count: 0 }));
    default:
      return state;
  }
}

function App() {
  const [counters, dispatch] = useReducer(counterReducer, []);

  return (
    <div className="app-container">
      <div className="tracker-container">
        <h1>Counter App</h1>
        <CounterForm onAddCounter={(name) => dispatch({ type: 'ADD_COUNTER', payload: name })} />
        <CounterList
          counters={counters}
          onIncrement={(id) => dispatch({ type: 'INCREMENT', payload: id })}
          onDecrement={(id) => dispatch({ type: 'DECREMENT', payload: id })}
          onResetAll={() => dispatch({ type: 'RESET_ALL' })}
        />
      </div>
    </div>
  );
}

  export default App
