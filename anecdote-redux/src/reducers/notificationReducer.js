const notificationReducer = (state = ({content: "", timeout: 0}), action) => {
    switch (action.type) {
        case 'SET_NOTIF':
            return action.data
        case 'CLEAR_NOTIF':
            return{
                content:'',
                timeout: 0
            }
        default:
            return state
    }
}

export const clearMessage = () => {
    return{
        type:"CLEAR_NOTIF"
    }
}

export const changeMessage = (message,timeout) => {
    return{
        type:'SET_NOTIF',
        data: {
            content: message,
            timeout
        }
    }
}
export default notificationReducer