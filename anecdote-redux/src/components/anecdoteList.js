import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {changeMessage} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {


    const vote = (id) => {
        console.log('vote', id)
        props.store.dispatch(
        voteAnecdote(id)
        )
        props.store.dispatch(
            changeMessage('Anectode voted', 5000)
            
        )
    }

    if(props.store.getState().filter){
        let filteredAnecdotes = props.store.getState().anecdotes.filter(a => a.content.toLowerCase().includes(props.store.getState().filter.toLowerCase()))
        console.log(filteredAnecdotes)

        return(<div>
            <h2>Anecdotes</h2>
            {filteredAnecdotes.map(anecdote => 
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </div>
        )

    }


    return(
        <div>
            <h2>Anecdotes</h2>
            {props.store.getState().anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList