import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
const App = (props) => {

  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => props.initializeAnecdotes(anecdotes))
  })

  return (
    <div>
      <Filter/>  
      <Notification />
      <AnecdoteForm /> 
      <AnecdoteList/>
    
    </div>
  )
}

export default connect(
  null,
  {initializeAnecdotes}
)(App)
