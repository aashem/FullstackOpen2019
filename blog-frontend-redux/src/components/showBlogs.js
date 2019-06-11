import React from 'react'
import Blog from './Blog'
import {connect} from 'react-redux'


const logout = () =>{
    window.localStorage.clear()
}

const ShowBlogs = (props) => {
    let sortedBlogs = props.blogs.sort((a, b) => {return b.likes - a.likes})
    const bList = sortedBlogs.map(blog => <Blog key = {blog.id} blog = {blog} currUser={props.user} />)



    return(

            <form onSubmit={logout}>
                <div>
                    <button type="submit">Logout</button>
                        <p>logged in as {props.user.username}</p>
                        {bList} 
                </div>
            </form>    
    )
}
const mapStateToProps = state => {
    return {
        user: state.user,
        blogs:state.blogs
    }
}


export default connect(
    mapStateToProps,
    null
) (ShowBlogs)