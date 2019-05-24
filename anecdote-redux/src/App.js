import React from 'react';
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'


const App = (props) => {
  const store = props.store
  
  return (
    <div>
      <AnecdoteList store={store}/>
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App
