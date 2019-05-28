import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content) => {
  return {
    type:'CREATE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return{
    type:'VOTE',
    data:{
      id:id
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
      type:'INIT_ANECDOTES',
      data: anecdotes
    }
  }
 



const anectodeReducer = (state = [], action) => {
  console.log(state)
  switch (action.type){
    case 'VOTE': 
    let id = action.data.id
    const anecVoted = state.find(a => a.id === id)
    anecVoted.votes++ 
      return state
    case 'CREATE':
      anecdoteService.create(action.data).then()
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      console.log(action.data)
      return action.data
  default:
     return state
  }
}

export default anectodeReducer