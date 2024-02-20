import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleSearchName = (event) => setSearchName(event.target.value);

  const addName = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName) === undefined) {
      setPersons(persons.concat(
        { name: newName, number: newNumber, id: persons.length + 1 }
      ));
    }
    else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        name={searchName} 
        searchName={handleSearchName} 
      />
      
      <h3>Add a new</h3>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        onChangeName={handleNewName} 
        onChangeNumber={handleNewNumber} 
        submit={addName} 
      />
      
      <h3>Numbers</h3>
      <Persons 
        persons={filteredPersons} 
      />
    </div>
  )
}

export default App