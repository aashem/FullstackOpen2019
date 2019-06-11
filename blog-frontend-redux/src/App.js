import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import ShowBlogs from './components/showBlogs'
import Notification from './components/notification'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import {changeMessage} from './reducers/notificationReducer'
import {connect} from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'
import {initUser} from './reducers/userReducer'
import {addUser} from './reducers/userReducer'

const App = (props) => {
  const [user, setUser] = useState(null)

 

  useEffect(() => {
    props.initializeBlogs()
  }, [props.blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      let user = JSON.parse(loggedUserJSON)
      setUser(user)
      props.addUser(user)
      blogService.setToken(user.token)
    }
  })
 





  if (user === null){
    return(
      
        <div>
          <h1>Login</h1>
          <Notification/>
          <LoginForm/>
      </div>
    )
  }else{

  return (
    <div>
      <h2>BLOG-APP</h2>
      <Notification/>
      <ShowBlogs/> 
      <BlogForm/>

    </div>
  )
}
}

const mapStateToProps = state => {
  return{
    user: state.user,
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  changeMessage,
  initializeBlogs,
  initUser,
  addUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)