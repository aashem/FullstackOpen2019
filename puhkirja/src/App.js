import React, { useState, useEffect} from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import ShowPersons from './components/showPerson'
import personsServices from './services/persons'


const App = () => {
 
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(()=> {
    personsServices
      .getAll()
      .then(persons => {
          setPersons(persons)
      })
      
  }  , [])

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
        if(window.confirm(`nimellä on ${newName} jo käytössä numero, haluatko korvata sen?`)){
          const id = persons.find(person => person.name === newName).id
          const personObject = {
            name:  newName,
            number: newPhone,
          }
          personsServices.update(id, personObject)
        } 
      
    }else{
      
      const personObject = {
      name: newName,
      number: newPhone,
      }
    personsServices.create(personObject)
    console.log(persons)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
    }
}

const deletePerson = (event) => {
  console.log(persons)
  if(window.confirm(`poistetaanko`)){
  let id = event.target.value
    personsServices.deletePerson(id).then(response => {setPersons(persons.filter(person => person.id !== id))}).catch(error=>{'nimi on jo poistettu tietokannasta'})
  console.log(persons)
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
        buttonHandler={deletePerson}
      />
    </div>
  )

}

export default App