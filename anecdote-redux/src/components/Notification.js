import React, {useEffect} from 'react';
import {clearMessage} from '../reducers/notificationReducer'



const Notification = (props) => {
  let content = props.store.getState().notification.content
  let time = props.store.getState().notification.timeout
  console.log(typeof ime)
  console.log(time)


  useEffect(()=> {
    setTimeout(()=> {
      props.store.dispatch(clearMessage())
    },time)
  }, [props.store.getState().notification.timeout])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
  }
  
  
  if(!content){
    return <></>
  }
  return(<div style={style}>{content}</div>)
}

export default Notification
