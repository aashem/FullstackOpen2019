import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
    blogs: blogReducer,
    current_user: loginReducer,
    notification: notificationReducer,
    users: userReducer,

})

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => {
    console.log(store.getState())
})

export default store
