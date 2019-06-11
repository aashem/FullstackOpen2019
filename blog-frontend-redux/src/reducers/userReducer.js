const loginReducer = (state = [], action) => {
   switch(action.type){
       case 'ADD_USER':
            return action.data
        case 'INIT_USERS':
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

export const initUser = () => {
    return{
        type:'INIT_USER',
        data: 's'
    }
}

export default loginReducer