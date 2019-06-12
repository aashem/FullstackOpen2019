import React from 'react'
import blogServices from '../services/blogServices'
import {connect} from 'react-redux'
import {initializeBlogs, voteBlog, deleteBlog} from '../reducers/blogReducer'
import {changeMessage} from '../reducers/notificationReducer'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom' 
import {Table} from 'react-bootstrap'








const ListBlogs = props => {
    

   const likeBlog = event =>{
       console.log(event.target)
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

   const createComment = event => {
       event.preventDefault()
       let comment = {
           content: event.target.comment.value
       }
       console.log(comment)
       console.log(event.target.id.value)
       blogServices.postComment(event.target.id.value, comment)
       props.initializeBlogs()

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
        
        const commentLister = (comments) => {

            const makeId = () => {
                let id = Math.floor(Math.random()*10000)
                return id
            }
            
            let list = comments.map(c => 
            <li key = {makeId()}>{c}</li>)
            return list
        }
        let comments = blog[0].comments
        let blogInfo = blog.map(b => 
        <div key = {b.id}>
            <h1>Title: {b.title}</h1>
            <p>Author: {b.author}</p>
            <p>Likes: {b.likes}</p>
            <a href ={b.url}>{b.url}</a>
            <p>Added by: {b.user[0].username}</p>
            <button onClick = {likeBlog} value = {b.id}>Like</button>
            <button onClick = {removeBlog} value = {b.id}>Delete</button>
            <h1>Comments</h1>
            <form onSubmit = {createComment}> 
                <input name = "comment"></input>
                <button type="submit" name = "id" value={b.id}>Add Comment</button>
            </form>
            <div>
                Comments
                {commentLister(comments)}
            </div>
        </div>)
        return( 
             <div>
                 
             {blogInfo}
                 
             </div>
        )
   }

    const listComponent = ({match}) => {
        let sortedBlogs = props.blogs.sort((a,b) => {return b.likes - a.likes})
        let list = sortedBlogs.map(blog =>
             <tr key = {blog.id}>
                 <td><Link to ={`${match.url}/${blog.id}`}>{blog.title}</Link></td>
             </tr>
             )
        return(
            <div>
        <h1>Blogs</h1>
        <Table striped hover>
            <tbody>
        {list}
            </tbody>
        </Table>
        </div>

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
        blogs: state.blogs,

    }
}

const mapDispatchToProps = {
    initializeBlogs,
    voteBlog,
    deleteBlog,
    changeMessage,

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListBlogs)