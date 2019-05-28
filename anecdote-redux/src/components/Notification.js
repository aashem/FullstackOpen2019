import React, {useEffect} from 'react';
import {clearMessage} from '../reducers/notificationReducer'
import {connect} from 'react-redux'


const Notification = (props) => {
  let content = props.content
  let time = props.timeout



  useEffect(()=> {
    setTimeout(()=> {
      props.clearMessage()
    },time)
  }, [props.timeout])

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
const mapStateToProps = state =>{
  return{
    content: state.notification.content,
    timeout: state.notification.timeout
  }

}

const mapDispatchToState = {
  clearMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Notification)
