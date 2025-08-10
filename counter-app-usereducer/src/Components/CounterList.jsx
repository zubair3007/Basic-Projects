function CounterList({ counters, onIncrement, onDecrement, onResetAll }) {
  return (
    <div className="list-container">
      <button onClick={onResetAll} className="reset-button">
        Reset All
      </button>
      <ul className="counter-list">
        {counters.map((counter) => (
          <li key={counter.id} className="counter-item">
            <span className="counter-name">
              {counter.name}: {counter.count}
            </span>
            <div className="counter-actions">
              <button
                onClick={() => onIncrement(counter.id)}
                className="inc-button"
              >
                +
              </button>
              <button
                onClick={() => onDecrement(counter.id)}
                className="dec-button"
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CounterList;
