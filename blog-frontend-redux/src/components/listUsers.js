import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

const ListUsers = props => {
   

    const userList = ({match}) => {
        let usersList = props.users.map(u =>
            <div key = {u.id}>
               <Link to = {`${match.path}/${u.username}`}>{u.username}</Link>
                <p>Blogs Created {u.blogs.length}</p>
           </div>)
        return (<div>
            {usersList} 
            </div>
        )
    }

    const singleUser = ({match}) => {
        return (
        <div>
            <Route path = {`${match.url}/:u`} component = {userInfo}/>
            </div>
        )
    }

    const userInfo = ({match}) => {
        console.log(match.params.u)
        let user = findUser(match.params.u)
        return <div>
        {user}
        </div>
    } 

    const findUser = (username) => {
        let user = props.users.filter(u => u.username === username )
        let userBlogs = user.map(u => u.blogs)
        let blogs = userBlogs[0]
        let blogsList
        if(blogs) {
        blogsList = blogs.map(b => <div key = {b.id}><p>Blog Title: {b.title}</p> </div>)
        }else{
        blogsList = 'None'
        }
    
        let userInfo = user.map(u =>
             <div key ={u.id}>
                 <p>Username: {u.username}</p>
                 <p>Name : {u.name}</p>
             </div>)
       return(<div>{userInfo}Blogs: {blogsList}</div>)
    }

    return (
    <div>
        <Router>
        <Route exact path = '/users' component = {userList}/>
        <Route path = '/users' component = {singleUser}/>
        </Router>
    </div>)
}



const mapStateToProps = state => {
    return{
    users: state.users,
    }
}

export default connect(mapStateToProps,null)(ListUsers)