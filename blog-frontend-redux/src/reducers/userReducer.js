const loginReducer = (state = [], action) => {
   switch(action.type){
       case 'ADD_USER':
            return action.data
        default:
            return state
   }
}

export const addUser = (content) => {
    return{
        type: 'ADD_USER',
        data: content
    }
}

export default loginReducer