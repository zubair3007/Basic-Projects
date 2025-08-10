import { useState } from "react";

function CounterForm({ onAddCounter }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddCounter(name.trim());
      setName("");
    }
  };

  return (
    <div className="form-container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Counter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-name"
        />
      </div>
      <button onClick={handleSubmit} className="add-button">
        Add Counter
      </button>
    </div>
  );
}

export default CounterForm;
