import React from 'react'

const Notification = ({notif}) => {
    const message = notif.message
    const type = notif.type
    if (message === null){
      return null
    }
    const style = {
          background: 'lightgrey',
          fontSize: '20px',
          borderStyle: 'solid',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '10px'
    }
    let notifStyle = null;
    if (type === 'success'){
      notifStyle = {...style, color : 'green'}
    }
    else{
      notifStyle = {...style, color: 'red'}
    }
  
    return(
      <div style ={notifStyle}>
        {message}
      </div>
    )
  }

  export default Notification