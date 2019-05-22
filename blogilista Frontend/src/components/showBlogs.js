import React from 'react'
import Blog from './Blog'

const logout = () =>{
    window.localStorage.clear()
}

const ShowBlogs = ({blogs, username, likeHandler}) => {
    const bList = blogs.map(blog => <Blog key = {blog.id} blog = {blog} likeHandler = {likeHandler}/>)
  

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