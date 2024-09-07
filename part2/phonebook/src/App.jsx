import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [message, setMessage] = useState({msg: null, type: null});

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons));
  }, []);

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleSearchName = (event) => setSearchName(event.target.value);

  const showMessage = (msg, type) => {
    setMessage({msg: msg, type: type})
      setTimeout(() => {
        setMessage({msg: null, type: null})
      }, 2000);
  }

  const addName = (event) => {
    event.preventDefault();

    const ids = persons.map(person => parseInt(person.id));
    const maxId = Math.max(...ids);

    const findPerson = persons.find(person => person.name === newName);

    if (findPerson === undefined) {
      const newPerson = { name: newName, number: newNumber, id: (maxId + 1).toString() };
      personService
        .create(newPerson)
        .then(person => 
          { setPersons(persons.concat(person));
            showMessage(`Added ${person.name}`, 'success');
          })
          .catch(error => {
            showMessage(error.response.data.error, 'error');
          })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(findPerson.id, {...findPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id != returnedPerson.id ? person : returnedPerson));
            showMessage(`${returnedPerson.name} updated`, 'success');
          })
          .catch(error => {
            showMessage(error.response.data.error, 'error');
          })
      }
    }
  }

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id == id);

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .destroy(id)
        .then(response => { 
            if (response.status == 204) {
              setPersons(persons.filter(person => person.id != id));
              showMessage(`${personToDelete.name} deleted`, 'success');
            } 
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id != id));
          showMessage(`${personToDelete.name} has already been removed from the server`, 'error');
        })
    }
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.msg} type={message.type} />
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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App