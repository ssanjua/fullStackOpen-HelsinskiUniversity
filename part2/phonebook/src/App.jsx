import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    noteService.getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(error => {
        console.error('error fetching', error)
      })
  }, [])

  const namesFiltered = persons.filter(
    person => person.name
      .toLocaleLowerCase()
      .includes(filter.toLowerCase()))

  const handleSubmit = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmMessage = `${newName} alredy exists, do you want to update the contact with this new number?`
      if (window.confirm(confirmMessage)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        noteService.update(existingPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(person => (person.id === existingPerson.id ? updatedPerson : person)))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('error updating', error)
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
  
      noteService.create(nameObject)
        .then(data => {
          setPersons([...persons, nameObject]);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm('are you sure?')) {
      noteService.delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('error deleting', error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons namesFiltered={namesFiltered} handleDelete={handleDelete} />
    </div>
  )
}

export default App