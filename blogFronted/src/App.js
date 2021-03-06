import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import ShowBlogs from './components/showBlogs'
import loginService from './services/login'
import Notification from './components/notification'
import BlogForm from './components/blogForm'
import {useField} from  './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notif, setNotif] = useState({
    message: null,
    type:null,
  })
  const username = useField({type: 'text', name:'username'})
  const password = useField({type: 'password', name: 'password'})
 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      let user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })
  const addBlog = async () => {
    let likes = null
    let blog = {
      title:title,
      author: author,
      url:url,
      likes:likes
    }
    try{
    let response = await blogService.create(blog)
    console.log(response)
    let notifState = {
      message: "Post was succesful",
      type:"success"
    }
    setNotif(notifState)
    setTimeout(() => {
      setNotif({...notif, message:null})
    }, 5000)

    }catch (exception){
      let notifState = {
        message: "Post failed",
        type:"error"
      }
      setNotif(notifState)
      setTimeout(() => {
        setNotif({...notif, message:null})
      }, 5000)
  
    }
  }


  const handleLogin = async (event) =>{
    event.preventDefault()
    try{
      let user = await loginService.login({
        username:username.value,
        password:password.value
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      let notifState ={
        message: `Logging in was succesful`,
        type:'success'
      }
      setNotif(notifState)
      setTimeout(() => {
        setNotif({...notif, message:null})
      }, 5000)


    }catch (exception){
      let notifState = {
        message:"Wrong username or password",
        type:'error'
      }
      setNotif(notifState)
      setTimeout(()=>{
        setNotif({...notif,message:null})
      }, 5000)

    }

  }


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
    console.log(blogs.likes)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
    

  }
  const likeHandler = async (event) => {
    event.preventDefault()
    let likedBlog = blogs.find(blog => blog.id === event.target.value)
    likedBlog.likes++
    try{
      await blogService.update(likedBlog.id, likedBlog)
      let newList = await blogService.getAll()
      setBlogs(newList)
      let notifState = {
        message: `You liked ${likedBlog.title}`,
        type: "success"
      }
      setNotif(notifState)
      setTimeout(() => {
        setNotif({...notif, message:null})
      }, 5000)
    }catch(exception){
      let notifState = {
        message: 'Like failed',
        type:'error'
      }
      setNotif(notifState)
      setTimeout(() => {
        setNotif({...notif, message:null})
      },5000)
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
      }catch{
        console.log('failed')
      }
    }
    
  }
  /* eslint-disable */
  let reset, usernameForm, passwordForm

  ({reset, ...usernameForm} = username);
  ({reset, ...passwordForm} = password)
  /* eslint-enable*/

  if (user === null){
    return(
      
        <div>
          <h1>Login</h1>
          <Notification notif={notif}/>
          <form onSubmit = {handleLogin}>
              Username: <input {...username}/>
              Password: <input {...password}/>
              <button type="submit">Kirjaudu</button>
      </form>
      </div>
    )
  }else{

  return (
    <div>
      <h2>BLOG-APP</h2>
      <Notification notif={notif}/>
      <ShowBlogs 
      blogs={blogs}
      username={user.username}
      likeHandler={likeHandler}
      removeHandler={removeHandler}
      user = {user}
      /> 

      <BlogForm 
      addBlog = {addBlog}
      handleAuthorChange = {handleAuthorChange}
      handleTitleChange = {handleTitleChange}
      handleUrlChange = {handleUrlChange}
      title = {title}
      author = {author}
      url = {url}
      />

    </div>
  )
}
}

export default App