import React from 'react'
import {connect} from 'react-redux'

const UserInfo = username => {
    console.log(username)
    return <div></div>
}

const mapStateToProps = state =>{
    return{ 
         users: state.users
        }
  
}

export default connect(
    mapStateToProps,
    null
)(UserInfo)