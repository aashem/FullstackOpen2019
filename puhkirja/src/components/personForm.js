import React from 'react'

const PersonForm = ({submit, name , phone, nameChange, phoneChange}) => {
    return(
      <form onSubmit={submit}>
        <div>
          nimi:
          <input 
          value={name}
          onChange={nameChange}
          />
        </div>
        <div>
          puh:
          <input
          value={phone}
          onChange={phoneChange}
          ></input>
        </div>
        <div>
          <button type ='submit'> Lisää </button>
        </div>
      </form>
    )
  }
  export default PersonForm