import React from 'react'


const ShowPersons= ({persons, filter}) =>{
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
  
  export default ShowPersons