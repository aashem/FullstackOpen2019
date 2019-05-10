import React from 'react'
import ListPeople from './listPeople'

const ShowPersons= ({persons, filter, buttonHandler}) =>{
    let showPeople = persons
    if ( filter ){
      showPeople = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      console.log(showPeople, filter)
    }

    return(
      <ListPeople persons={showPeople}
       buttonHandler={buttonHandler}/>
    )
  }
  
  
  export default ShowPersons