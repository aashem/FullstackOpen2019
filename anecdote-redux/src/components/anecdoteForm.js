import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {changeMessage} from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    const create = (event) =>{
        event.preventDefault()
        props.store.dispatch(
          createAnecdote(event.target.anecdote.value, 5000)
        )
        props.store.dispatch(
            changeMessage('Anecdote added', 5000)
        )
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



export default AnecdoteForm