import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterWord, setFilterWord] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName) return;

    const nameAlreadyExist = persons.find((person) => person.name === newName);
    if (nameAlreadyExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const deletePerson = (id) => {
    const toDelete = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${toDelete.name}?`)) return;

    personService.destroy(id).then(() => {
      setPersons(persons.filter((person) => person !== toDelete));
    });
  };

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterWord.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWord={filterWord} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onPersonDelete={deletePerson} />
    </div>
  );
};

export default App;
