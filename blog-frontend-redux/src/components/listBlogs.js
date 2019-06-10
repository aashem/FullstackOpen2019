import React from 'react'
import {connect} from 'react-redux'
import {initializeBlogs, voteBlog, deleteBlog} from '../reducers/blogReducer'
import {changeMessage} from '../reducers/notificationReducer'





const ListBlogs = props => {
    
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
    let sortedBlogs = props.blogs.sort((a,b) => {return b.likes - a.likes})
    let list = sortedBlogs.map(blog =>
         <div style = {blogStyle} key = {blog.id}>
             <p>Title: {blog.title}</p>
             <p>Author: {blog.author}</p>
             <p>Url: {blog.url}</p>
             <p>Likes: {blog.likes}</p>
             <p>Added by {blog.user[0].username}</p>
             <button onClick={likeBlog} value={blog.id}>Like</button>
             <button onClick={removeBlog} value={blog.id}>Delete</button>
         </div>
         )

 

    return(<div>
        <h1>Blogs</h1>
        {list}</div>)
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