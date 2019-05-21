/*import React, { useState, useEffect} from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const [user, setUser] = useState(null)
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      let user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })
  
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


    }catch (exception){
      console.log('wrong username or password')

    }

  }

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
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

  const returnUser = () => {
      return(user)
  }
export default loginForm()*/