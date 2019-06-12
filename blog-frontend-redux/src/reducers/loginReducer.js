import {ADD_USER, LOGOUT} from './reducerTypes'

const loginReducer = (state = [], action) => {
    switch(action.type){
        case ADD_USER:
            return action.data
        case LOGOUT:
            return state = []
        default:
            return state
    }
}

export const addUser = (content) => {
    return{
        type: ADD_USER,
        data: content
    }
}
export const logout = () => {
    return{
        type: LOGOUT,
    }
}

export default loginReducer