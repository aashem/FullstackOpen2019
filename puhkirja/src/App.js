import React, { useState, useEffect} from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import ShowPersons from './components/showPerson'
import personsServices from './services/persons'
import './styles/App.css'
import Notification from './components/notification'


const App = () => {
 
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [notif, setNotif] = useState({
    message: null,
    type: null,
  })

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
  }

  const newFilt = (event) => {
    event.preventDefault()
    setFilter(newFilter)
    setNewFilter('')
  }

  const newPerson = (event) => {
    event.preventDefault()
      
      if (persons.findIndex(person => person.name === newName) > -1) {
        if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
          const id = persons.find(p => p.name === newName).id
          const personObject = {
            name: newName,
            number: newPhone,
          }
          personsServices
            .update(id, personObject)
            .then(newPerson => {
              const newState = {
                message: `Henkilön ${newPerson.name} numero korvattu uudella`,
                type: 'note'
              }
              setNotif(newState)
              setTimeout(() => {
                setNotif({...notif, message: null})
              }, 5000)
  
              const newPersons = persons.map(person => person.id !== id ? person : newPerson)
              setPersons(newPersons)
          })
          .catch(error => {
            const newState = {
              message: `Henkilö ${personObject.name} on jo poistettu tietokannasta`,
              type: 'error'
            }
            setNotif(newState)
            setTimeout(() => {
              setNotif({...notif, message: null})
            }, 5000)
  
            setPersons(persons.filter(p => p.id !== id))
          })
        }
      }else{
      
      const personObject = {
      name: newName,
      number: newPhone,
      }
      const newNotif = {
        message: `Henkilö ${personObject.name} lisätty`,
        type: 'note'
      }
      setNotif(newNotif)
      setTimeout(() => setNotif({...notif, message:null}), 5000)  
    personsServices.create(personObject).then(personsServices.getAll().then(persons => {setPersons(persons)}))
    .catch(error => {
      const newNotif = {
        message: 'lisääminen epäonnistui',
        type: 'error',
      }
      setNotif(newNotif)
      setTimeout(() => {
        setNotif({...notif, message:null})
      }, 5000)
    })
    setNewName('')
    setNewPhone('')

    }
}

const deletePerson = (event) => {
  let id = event.target.value
  let deletedPerson = persons.find(person => person.id == id)
  console.log(deletedPerson)

  if(window.confirm(`poistetaanko`)){
    personsServices.deletePerson(id).catch(error => {
      const newNotif = {
        message: 'poistaminen epäonnistui, päivitä sivu tai yritä uudestaan',
        type: 'error',
      }
      setNotif(newNotif)
      setTimeout(() => {
        setNotif({...notif, message:null})
      }, 5000)
    })
    const newPersons = persons.filter(person => person.id != id)
    setPersons(newPersons)
    const newNotif = {
      message: `henkilö  poistettu`,
      type: 'note',
    }
    setNotif(newNotif)
    setTimeout(() => {setNotif({...notif, message:null})
    }, 5000)

  }
}


  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification notif={notif}/>
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