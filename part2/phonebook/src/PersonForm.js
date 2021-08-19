import React from 'react';

const PersonForm = ({ onSubmit, nameValue, phoneValue, onNameChange, onPhoneChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={nameValue} onChange={onNameChange} />
    </div>
    <div>
      phone: <input value={phoneValue} onChange={onPhoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
