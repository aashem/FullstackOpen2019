
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
      let sortedState = state.sort((a,b)=> b.votes-a.votes)
      console.log(anecVoted)
      state = sortedState
      return state
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      console.log(action.data)
      return action.data
  default:
     return state
  }
}

export default anectodeReducer