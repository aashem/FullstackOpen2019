import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'
import ListBlogs from './components/listBlogs'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import {addUser} from './reducers/loginReducer'
import Notification from './components/notification'
import blogServices from './services/blogServices'
import {changeMessage} from './reducers/notificationReducer'
import ListUsers from './components/listUsers'
import {initializeUsers} from './reducers/userReducer'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'


const App = props => {


 
  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      let user = JSON.parse(loggedUserJSON)
      blogServices.setToken(user.token)
      props.addUser(user)
      props.changeMessage(`welcome back ${user.username}`, 5)
  }
}, [])

const blogsPage = () => {
  return (
    <div>
    <ListBlogs/>
    </div>
  )
}


const usersPage = () => {
  return (
  <div>
    <ListUsers/>
  </div>)
}

const createBlog = () => {
  return(
    <div>
      <BlogForm/>
    </div>
  )
}



  if(!props.user.username){
  return (
    <div>
    <Notification/>
    <LoginForm/>
    </div>
  )
  }else{
    return(
      <Router>
      <div className="container">
        <Header/>
        <LoginForm/>
        <Route exact path = '/blogs' component = {blogsPage}/>
        <Route path = '/users' component ={usersPage}/>
        <Route path = '/createBlog' component = {createBlog}/>
        
      </div>
      </Router>
    )
  }

}


const Header = () => {
  return (
    <ul>
        <Notification/>
      <li>
        <Link to = '/blogs'>Blogs</Link>
      </li>
      <li>
        <Link to = '/users'>Users</Link>
      </li>
      <li>
        <Link to = '/createBlog'>Create New</Link>
      </li>
    </ul>  
  )
}
const mapStateToProps = state => {
  return{ 
    user: state.current_user
  }

}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  addUser,
  changeMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
