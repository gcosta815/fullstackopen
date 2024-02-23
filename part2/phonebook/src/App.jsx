import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, []);

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