import {CHANGEMSG, CLEAR} from './reducerTypes'

const notificationReducer = (state = ({content: "", timeout: 0}), action) => {
    switch(action.type){
        case CHANGEMSG:
            return action.data
        case CLEAR:
            return {
                content: '',
                timeout: 0
            }
        default:
            return state
    }
}

export const clearNotif = () => {
    return {
        type: CLEAR,
    }
}

export const changeMessage = (message, timeout) => {
    timeout = timeout *1000
    return{
        type: CHANGEMSG,
        data: {
            content: message,
            timeout: timeout
        }
    }
}

export default notificationReducer