import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import ShowBlogs from './components/showBlogs'
import Notification from './components/notification'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import {changeMessage} from './reducers/notificationReducer'
import {connect} from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

 

  useEffect(() => {
    props.initializeBlogs()
    setBlogs(props.blogs)
  }, [props.blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      let user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })
 




  const likeHandler = async (event) => {
    event.preventDefault()
    let likedBlog = blogs.find(blog => blog.id === event.target.value)
    likedBlog.likes++
    try{
      await blogService.update(likedBlog.id, likedBlog)
      let newList = await blogService.getAll()
      setBlogs(newList)
      props.changeMessage(`Vote Succesful`, 5)
    }catch(exception){
      props.changeMessage('Vote Failed', 5)
    }
  }
  const removeHandler = async(event) => {
    event.preventDefault()
    console.log(event.target.value)
    let removedBlog = blogs.find(blog => blog.id === event.target.value)
    console.log(removedBlog)
    if(window.confirm("delete BLOG?")){

      try{
        await blogService.remove(removedBlog.id)
        let newList = await blogService.getAll()
        setBlogs(newList)
        props.changeMessage('Blog Removed', 5)
      }catch{
        console.log('failed')
      }
    }
    
  }

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
      <ShowBlogs 
      blogs={blogs}
      username={user.username}
      likeHandler={likeHandler}
      removeHandler={removeHandler}
      user = {user}
      /> 
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
  initializeBlogs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)