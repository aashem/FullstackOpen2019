import React from 'react'
import Blog from './Blog'


const logout = () =>{
    window.localStorage.clear()
}

const ShowBlogs = ({blogs, username, likeHandler, removeHandler, user}) => {
    let sortedBlogs = blogs.sort((a, b) => {return b.likes - a.likes})
    const bList = sortedBlogs.map(blog => <Blog key = {blog.id} blog = {blog} likeHandler = {likeHandler} removeHandler = {removeHandler} currUser = {user}/>)
    return(

            <form onSubmit={logout}>
                <div>
                    <button type="submit">Logout</button>
                        <p>logged in as {username}</p>
                        {bList} 
                </div>
            </form>    
    )
}

export default ShowBlogs