import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {changeMessage} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const AnecdoteForm = (props) => {

    const create = (event) =>{
        event.preventDefault()
        props.createAnecdote(event.target.anecdote.value)
        props.changeMessage('Anecdote added', 5)
        
      }
    

    return(
    <div>
    <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
    )

}

const mapStateToProps = () =>{
  return {}
}
const mapDispatchToState = {
  createAnecdote,
  changeMessage
}


export default connect(
  mapStateToProps,
  mapDispatchToState
)(AnecdoteForm)