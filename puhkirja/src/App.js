import React, { useState } from 'react'

const showPersons= (persons, filter) =>{
  let showPeople = persons
  if ( filter ){
    showPeople = persons.filter(person => person.name === filter)
    console.log(showPeople, filter)
  }
    const retPeople = showPeople.map(person => Person(person.name, person.phone))
    console.log(retPeople)
  return(
    retPeople
  )
}

const Person = (name, phone) => {

  return(
    <li>{name} {phone}</li>
  )
}




const App = () => {

  const [ persons, setPersons] = useState([ 
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Martti Tienari', number: '040-123456' },
  { name: 'Arto Järvinen', number: '040-123456' },
  { name: 'Lea Kutvonen', number: '040-123456' }]) 

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  } 

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

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
}   

    else{
 const personObject = {
      name: newName,
      phone: newPhone,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
    console.log(persons)
    }
}


    
   
  

  

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={newFilt}> 
      <div>
      <p>Rajaa Listaa</p>
      Nimi: <input value={newFilter} onChange={handleFilterChange}/>
      <button type ="submit">Rajaa</button>
      </div>
      </form>
      <p>----------------------------</p>
      <form onSubmit={newPerson}>
        <div>
          Nimi: <input value={newName} onChange={handleNameChange}/>
          numero:<input value={newPhone} onChange={handlePhoneChange}/>
          <button type="submit">Lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <p>{showPersons(persons, filter)}</p>
    </div>
  )

}

export default App