import React from 'react'
import {connect} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {changeMessage} from '../reducers/notificationReducer'

const BlogForm = props => {

    const addBlog = event => {
        event.preventDefault()
        console.log(event.target.title.value)
        let blog = {
            author: event.target.author.value,
            title: event.target.title.value,
            url: event.target.url.value,
        }
        props.createBlog(blog)
        props.changeMessage("Blog Created", 5)
        event.target.reset()
    }
    return(
        <form onSubmit = {addBlog}>
            <div>
                <p >Author</p>
                <input name ='author'>
                </input>
                <p>Title</p>
                <input name = 'title'>
                </input>
                <p>Url</p>
                <input name = 'url'>
                </input>
                <button type='submit'>Add</button>
            </div>
        </form>
    )
}

const mapDispatchToProps = {
    createBlog,
    changeMessage
}
export default connect(
    null,
    mapDispatchToProps
)(BlogForm)