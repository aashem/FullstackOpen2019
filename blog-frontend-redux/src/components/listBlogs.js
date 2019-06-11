import React from 'react'
import {connect} from 'react-redux'
import {initializeBlogs, voteBlog, deleteBlog} from '../reducers/blogReducer'
import {changeMessage} from '../reducers/notificationReducer'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom' 





const ListBlogs = props => {
    
    const listStyle ={
        padding: "5px",
        border: "dotted",
        borderWidth: "1px",
        fontFamily: "Arial",
        fontSize : "20px"
    }

    const blogStyle ={
    padding: "20px",
    background: 'lightgreen',
    border: "outset",
    borderRadius: "50px",
    borderWidth: "10px",
    fontSize: "20px",
    paddingLeft: "75px",
    fontFamily:"Arial"
   }

   const likeBlog = event =>{
       event.preventDefault()
        let likedBlog = props.blogs.find(blog => blog.id === event.target.value)
        props.voteBlog(likedBlog.id, likedBlog)
        props.changeMessage(`Liked blog from author ${likedBlog.author}`, 5)
   }

   const removeBlog = event => {
       props.deleteBlog(event.target.value)
       setTimeout(() => {
        props.initializeBlogs()
       }, 100)
       props.changeMessage(`deleted blog with id ${event.target.value}`, 5)
 
   }

   const singleBlog = ({match}) => {
    return (
        <div>
            <Route path = {`${match.url}/:id`} component = {blogInfo}/>
        </div>
    )
   }

   const blogInfo = ({match}) => {
        let blog = findBlog(match.params.id)
        return (
            <div>{blog}</div>
        )
   }

   const findBlog =  (id) => {
        let blog = props.blogs.filter(b => b.id === id)
        console.log(blog)
        let blogInfo = blog.map(b => 
        <div key = {b.id}>
            <h1>Title: {b.title}</h1>
            <p>Author: {b.author}</p>
            <p>Likes: {b.likes}</p>
            <p>Added by: {b.user[0].username}</p>
            <button onClick = {likeBlog} value = {b.id}>Like</button>
            <button onClick = {removeBlog} value = {b.id}>Delete</button>
        </div>)
        return(
            <div style = {blogStyle}>{blogInfo}</div>
        )
   }

    const listComponent = ({match}) => {
        let sortedBlogs = props.blogs.sort((a,b) => {return b.likes - a.likes})
        let list = sortedBlogs.map(blog =>
             <div style = {listStyle} key = {blog.id}>
                 <p><Link to ={`${match.path}/${blog.id}`}>{blog.title}</Link></p>
             </div>
             )
        return(
            <div>
        <h1>Blogs</h1>
        {list}</div>

        )     
    }
   

 

    return(
        <div>
            <Router>
                <Route exact path = '/blogs' component = {listComponent}/>
                <Route path = '/blogs' component = {singleBlog}/>
            </Router>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    voteBlog,
    deleteBlog,
    changeMessage
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListBlogs)