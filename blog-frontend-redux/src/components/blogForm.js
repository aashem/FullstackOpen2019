import React from 'react' 
import {createBlog} from '../reducers/blogReducer'
import {changeMessage} from '../reducers/notificationReducer'
import {connect} from 'react-redux'
const BlogForm = props => {



const addBlog = (event) => {
  event.preventDefault()
  let newBlog = {
    title: event.target.title.value,
    author: event.target.author.value,
    url: event.target.url.value
  } 
  props.createBlog(newBlog)
  props.changeMessage('blog added', 5)
  event.target.reset()
}



    return(
    <form onSubmit = {addBlog}>
        <div>
          <p>Title</p>
        <input
         name = 'title'
        />
        </div>
        <div>
          <p>Author</p>
        <input
          name = 'author'
          />
        </div>
        <div>
          <p>Url</p>
        <input
          name = 'url'
        />
        </div>
          <button type='submit'>Tallena uusi blogi</button>

    </form>
    )
  }

  const mapStateToProps = () =>{
    return{}
  }

  const mapDispatchToProps = {
    createBlog,
    changeMessage
  }


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)