import React from 'react'

const ListPeople = ({persons, buttonHandler}) => {
    const PersonList = persons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={buttonHandler} value={person.id}>Poista</button> </li>)
    return(
        PersonList
    )
}

export default ListPeople