import React from 'react'
import Blog from './Blog'

const logout = () =>{
    window.localStorage.clear()
}

const ShowBlogs = ({blogs, username}) => {
    const bList = blogs.map(blog => <Blog key = {blog.id} blog = {blog}/>)
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