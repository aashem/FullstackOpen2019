import React from 'react'
import {connect} from 'react-redux'
import {changeMessage} from '../reducers/notificationReducer'
import {addUser} from '../reducers/userReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'



const LoginForm = (props) => {
  
  
  const handleLogin = async (event) => {
    event.preventDefault()
    event.persist()
    try{
    let user = await loginService.login({
      username: event.target.username.value,
      password: event.target.password.value
    })
    event.target.reset()
    props.addUser(user) 
    props.changeMessage(`Welcome back ${user.username}`, 5)
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
  }catch{
    props.changeMessage('Wrong username or password', 5)
  }
 
  }

  return(
    <form onSubmit = {handleLogin}>
      <div>
        <p>Username:</p>
        <input name ='username'/>
        <p>Password:</p
        ><input type= 'password' name = 'password'/>
        <p></p><button type = 'submit'>Login</button>
      </div>
    </form>
        )

}

const mapStateToProps = state => {
  return{
  user: state.user
  }
}

const mapDispatchToProps = {
  changeMessage,
  addUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
