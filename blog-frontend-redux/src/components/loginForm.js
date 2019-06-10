import React from 'react'
import {connect} from "react-redux"
import loginServices from '../services/loginServices';
import blogService from '../services/blogServices'
import {addUser, logout} from '../reducers/loginReducer'
import {changeMessage} from '../reducers/notificationReducer'

const LoginForm = props => {    
    console.log(props.user.username)

    const logout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        props.logout()
        props.changeMessage("Logged out")
    }

    const login = async (event) => {
        event.preventDefault()
        event.persist()
        try{
        let user = await loginServices.login({
            username: event.target.username.value,
            password: event.target.password.value
        })
        event.target.reset()
        blogService.setToken(user.token)
        window.localStorage.setItem(
            'loggedInUser', JSON.stringify(user)
            )
        console.log(user)
        props.addUser(user)
        props.changeMessage(`Logged in as ${user.username}`, 5)

    }catch{
        return
    }

    }

    if(!props.user.username){
        return (
            <form onSubmit= {login}>
                <div>
                    <b>username</b>
                    <input name = 'username'>
                    </input>
                    <p></p>
                    <b>password</b>
                    <input type = 'password' name = 'password'>
                    </input>
                    <button type = 'submit'>Login</button>
                </div>
            </form>
        )
    }else{
        return (
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }
   
}

const mapStateToProps = state => {
    return{
    user: state.current_user
    }
}

const mapDispatchToProps = {
    addUser,
    changeMessage,
    logout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)