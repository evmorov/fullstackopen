import React from 'react';

const Person = ({ person: { id, name, number }, onDeleteClick }) => (
  <tr key={id}>
    <td>{name}</td>
    <td>{number}</td>
    <td>
      <button onClick={onDeleteClick}>delete</button>
    </td>
  </tr>
);

export default Person;
