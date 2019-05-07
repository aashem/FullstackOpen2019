import React, { useState } from 'react'
import ReactDOM from 'react-dom'





const maxVotes = (votes, anecdotes) => {
  const mostVotes = Math.max(...votes)
  const mVIndex = votes.indexOf( mostVotes)
    return (
      <>
      {anecdotes[mVIndex]}
      </>
    )
} 



const App = (props) => {
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)


  const handleRandom = () => {
    const max = anecdotes.length
    setSelected(Math.floor((Math.random() *max )))
  }

  const handleVoting = (votes, selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    return(
      newVotes
    )
  }





  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}
      <p></p>
      <p>has {votes[selected]} votes </p>
      <button onClick={handleRandom}>Next</button>
      <button onClick={()=> handleVoting(votes, selected)}>Vote</button>
      <h2>Most Voted Anecdote</h2>
      <p>{maxVotes(votes, anecdotes)}</p>
      <p>Has {Math.max(...votes)} Votes </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)