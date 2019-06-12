import {INIT_USERS} from './reducerTypes'
import userServices from '../services/userServices'

const userReducer = (state = [], action) => {
    switch(action.type){
        case INIT_USERS:
            return action.data
        default:
            return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        let users = await userServices.getAll()
        dispatch({
            type: INIT_USERS,
            data: users
        })
    }
}

export default userReducer