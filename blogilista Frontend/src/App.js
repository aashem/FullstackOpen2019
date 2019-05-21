import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import ShowBlogs from './components/showBlogs'
import loginService from './services/login'
import Notification from './components/notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notif, setNotif] = useState({
    message: null,
    type:null,
  })

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
        username,password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  
  const loginForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input 
            type='text' 
            value={username}
            name='Username' 
            onChange={handleUsernameChange}/>
          <p></p>
          </div>
          <div>
          salasana
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
          />
          </div>
        <button type="submit">kirjaudu</button>
      </form>
    )
  }

  const blogForm = () => {
    return(<form onSubmit = {addBlog}>
        <div>
          <p>Title</p>
        <input
          type ='text'
          value={title}
          onChange={handleTitleChange}
        />
        </div>
        <div>
          <p>Author</p>
        <input
          type ="text"
          value={author}
          onChange={handleAuthorChange}
          />
        </div>
        <div>
          <p>Url</p>
        <input
          type = "text"
          value={url}
          onChange={handleUrlChange}
        />
        </div>
          <button type='submit'>Tallena uusi blogi</button>

    </form>
    )
  }

  return (
    <div>
      <h2>BLOG-APP</h2>
      <Notification notif={notif}/>
      {user !== null &&
      <ShowBlogs 
      blogs={blogs}
      username={user.username}/> 
      }
      {user === null ?
      loginForm():
      blogForm()
      }
    </div>
  )
}

export default App