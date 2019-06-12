import React,{useEffect} from 'react'
import {clearNotif} from '../reducers/notificationReducer'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'

const Notification = props => {
    let content = props.content
    let time = props.timeout

    useEffect(()=> {
        setTimeout(()=>{
            props.clearNotif()
        },time)
    }, [props.timeout])

   
    if(!content){
        return <></>
    }else{
        return <Alert variant='success'>{props.content}</Alert>
    }
  
}

const mapStateToProps = state => {
    return{
        content: state.notification.content,
        timeout: state.notification.timeout
    }
}

const mapDispatchToProps= {
    clearNotif
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification)