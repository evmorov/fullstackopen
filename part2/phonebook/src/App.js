import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './services/persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterWord, setFilterWord] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const showInfo = (message) => {
    setNotification({ message, type: 'info' });
    setTimeout(() => setNotification({}), 3000);
  };

  const showError = (message) => {
    setNotification({ message, type: 'error' });
    setTimeout(() => setNotification({}), 4000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName) return;

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const persistedPerson = persons.find((person) => person.name === newName);
    if (persistedPerson) {
      replacePhone(persistedPerson, personObject);
      return;
    }

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showInfo(`Added ${returnedPerson.name}`);
      })
      .catch((error) => {
        showError(error.response.data.error);
      });
  };

  const replacePhone = (persistedPerson, personObject) => {
    const confirmReplaceMessage = `${persistedPerson.name} is already added to phonebook, replace the old number with a new one?`;
    if (!window.confirm(confirmReplaceMessage)) return;

    updatePerson(persistedPerson.id, personObject)
      .then(() => {
        showInfo(`Updated ${persistedPerson.name}`);
      })
      .catch((error) => {
        showError(error.response.data.error);
      });
  };

  const updatePerson = (id, personObject) => {
    return personService.update(id, personObject).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
      setNewName('');
      setNewNumber('');
    });
  };

  const deletePerson = (id) => {
    const toDelete = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${toDelete.name}?`)) return;

    return personService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter((person) => person !== toDelete));
        showInfo(`Deleted ${toDelete.name}`);
      })
      .catch((error) => {
        showError(`Information of ${toDelete.name} has already beed removed from server`);
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
      <Notification notification={notification} />
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
