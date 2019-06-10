import React,{useEffect} from 'react'
import {clearNotif} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const Notification = props => {
    let content = props.content
    let time = props.timeout

    useEffect(()=> {
        setTimeout(()=>{
            props.clearNotif()
        },time)
    }, [props.timeout])

    const notifStyle = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    if(!content){
        return <></>
    }else{
        return <div style={notifStyle}>{props.content}</div>
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