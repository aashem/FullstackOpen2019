import React, { useState } from 'react'

const showPersons= (persons) =>{
  const person = persons.map(person => Person(person.name, person.phone))
  
return(
    person
  )
}

const Person = (name, phone) => {
  return(
    <li>{name} {phone}</li>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 

  const [ newName, setNewName ] = useState('')

  const [ newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
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
      <p>Rajaa Listaa</p>
      Nimi: <input/>
      <form onSubmit={newPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange}/>
          numero:<input value={newPhone} onChange={handlePhoneChange}/>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <p>{showPersons(persons)}</p>
    </div>
  )

}

export default App