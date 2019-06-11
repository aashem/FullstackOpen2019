import React, {useEffect} from 'react'
import {clearMessage} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const Notification = (props) => {
    let content = props.content
    let time = props.timeout

    useEffect(()=>{
      setTimeout(()=> {
        props.clearMessage()
      }, time)
    }, [props.timeout])

    
    const style = {
          background: 'lightgrey',
          fontSize: '20px',
          borderStyle: 'solid',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '10px'
    }
    if(!content){
      return <></>
    }
    return(<div style= {style}>{content}</div>)
  }

  const mapStateToProps = state => {
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