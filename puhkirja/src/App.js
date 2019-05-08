import React, { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Axios from 'axios'
import ShowPersons from './components/showPerson'

const App = () => {

  const [ persons, setPersons] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')
  const [ newFilter, setNewFilter] = useState('')


  const hook = () =>{
    console.log('effect')
    Axios
        .get('http://localhost:3001/persons')
        .then(response => {
        console.log('fulfilled')
        setPersons(response.data)
      })
  }


  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  } 

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  const newFilt = (event) => {
    event.preventDefault()
    setFilter(newFilter)
    setNewFilter('')
  }

  const newPerson = (event) => {
    event.preventDefault()
    if(persons.findIndex(person => person.name === newName) > -1){
      return(
        window.alert(`nimi on ${newName} jo käytössä`) 
      )
    }else{
      const personObject = {
      name: newName,
      phone: newPhone,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
    }
}
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter
        submit={newFilt}
        filter={newFilter}
        filterChange={handleFilterChange}
      />
      <p>----------------------------</p>
      <h2>Lisää uusi</h2>
			<PersonForm
				submit={newPerson}
				name={newName}
				nameChange={handleNameChange}
				phone={newPhone}
				phoneChange={handlePhoneChange}
			/>
      <h2>Numerot</h2>
      <ShowPersons
        persons={persons}
        filter={filter}
      />
    </div>
  )

}

export default App