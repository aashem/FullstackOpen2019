import anecdoteService from '../services/anecdotes'



export const createAnecdote = (content) => {
  return async dispatch => {
    let anecdote = await anecdoteService.create(content)
    dispatch({
      type:'CREATE',
    data: anecdote
    })
  }
    
}

export const voteAnecdote = (content, id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(id, content)
    dispatch ({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    let anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }

  }
 



const anectodeReducer = (state = [], action) => {
  console.log(state)
  switch (action.type){
    case 'VOTE': 
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