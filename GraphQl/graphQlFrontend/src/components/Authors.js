import React from 'react'
import {Mutation} from 'react-apollo'
import {SET_BIRTH, ALL_AUTHORS} from '../App'
import EditBirth from './EditBirth'


const Authors = (props) => {
  console.log(SET_BIRTH)
  let authors = null

  if(props.authors){
  authors = props.authors.data.authorsAll
  console.log(authors)
  }
  if (!props.show) {
    return null
  }
  if (props.authors.loading){
    return <div>Loading...</div>
  }
  
  if(authors){
  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
      <tr>
        <th>Name</th>
        <th>Born</th>
        <th>Book count</th>
      </tr>
      {authors.map(a => 
      <tr key = {a.id}>
        <td>{a.name}</td>
        <td>{a.born}</td>
        <td>{a.bookCount}</td>
      </tr>
      )}
      </tbody>
      </table>
      <Mutation
      mutation = {SET_BIRTH}
      refetchQueries = {[{query: ALL_AUTHORS}]}
      >
        {(editBorn)=> 
        <EditBirth
        authors = {authors}
        setBirthYear = {editBorn}
        />
        } 

      </Mutation>
  
    </div>
    
  )
 }
}

export default Authors