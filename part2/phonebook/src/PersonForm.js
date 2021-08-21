import React from 'react';

const PersonForm = ({ onSubmit, nameValue, numberValue, onNameChange, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={nameValue} onChange={onNameChange} />
    </div>
    <div>
      phone: <input value={numberValue} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
