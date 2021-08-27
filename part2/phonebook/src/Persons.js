import React from 'react';
import Person from './Person';

const Persons = ({ persons, onPersonDelete }) => (
  <table>
    <tbody>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDeleteClick={() => onPersonDelete(person.id)} />
      ))}
    </tbody>
  </table>
);

export default Persons;
