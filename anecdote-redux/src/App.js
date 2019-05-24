import React from 'react';
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'

const App = (props) => {
  const store = props.store
  
  return (
    <div>
      <Filter store={store}/>
      <Notification store={store}/>
      <AnecdoteList store={store}/>
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App
