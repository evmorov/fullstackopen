import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterWord, setFilterWord] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName) return;

    const nameAlreadyExist = persons.find((person) => person.name === newName);
    if (nameAlreadyExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, phone: newPhone }]);
      setNewName('');
      setNewPhone('');
    }
  };

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
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
        phoneValue={newPhone}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
