import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {changeMessage} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const AnecdoteList = props => {
    console.log(props.visibleAnecdotes)
    console.log(props.anecdotes)
    

    const vote = id => {
        console.log('vote', id)
        console.log(props.anecdotes)
        props.voteAnecdote(id)
        props.changeMessage('Anectode voted', 5000)
            
    
    }

    return(
        <>
            {props.visibleAnecdotes.map(anecdote => (
                <div key = {anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        Votes:{anecdote.votes}
                        <button onClick ={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    )
}
const anecdotesToShow =({ anecdotes, filter}) => {
    return filter
        ? anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
            :anecdotes.sort((a,b) => b.votes - a.votes)
            
}

const mapStateToProps = state => {
    return{
        anecdotes: state.anecdotes,
        filter: state.filter,
        visibleAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    changeMessage
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)