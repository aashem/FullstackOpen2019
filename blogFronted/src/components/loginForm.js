import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useField} from '../hooks/index'


const LoginForm = ({handleSubmit, handleUsernameChange, handlePasswordChange, username, password}) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = {display : loginVisible ? "none" : ""}
  const showWhenVisible = {display : loginVisible ? "" : "none"}

  return(
   
      <div>
          <div style={hideWhenVisible}>
            <button onClick={() =>setLoginVisible(true)}>show login</button>
          </div>
        <div style ={showWhenVisible}>
        käyttäjätunnus
        <input 
          type='text' 
          value={username}
          name='Username' 
          onChange={handleUsernameChange}/>
        <p></p>
       

        salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
          <form onSubmit={handleSubmit}>
            <button type="submit">Login</button>
          </form>
          <button onClick={()  => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
  
  )

}

LoginForm.propTypes ={
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm
