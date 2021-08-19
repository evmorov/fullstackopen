import React, { useState } from 'react';

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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterWord.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{' '}
        <input value={filterWord} onChange={(e) => setFilterWord(e.target.value)} />
      </div>

      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredPersons.map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
