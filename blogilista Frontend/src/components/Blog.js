import React, {useState} from 'react'


const Blog = ({ blog, likeHandler , removeHandler, currUser }) => {
  const [visible, setVisible] = useState(false)
  const [delVisible, setDelVisible] =useState(false)
  let user = blog.user
  let username = user.map(u => u.username)

  const toggleVisibility = (event) => {
    toggleDelete()
    event.preventDefault()
    if(visible === false){
      setVisible(true)
    }else{
      setVisible(false) 
  }
}

const toggleDelete = () => {
  let user = blog.user
  let username = user.map(u => u.username)
  let currUsername = currUser.username
  console.log(currUsername)
  console.log(username.toString() )

  if (username.toString() === currUsername) {
    setDelVisible(true)
  }else{
    setDelVisible(false)
  }
} 


  const showDelete = {
    display : delVisible ? "": "none",
  }

  const showMore = {
    display : visible ? '' : "none",
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style = {blogStyle}>
   <p>{blog.title},  {blog.author}</p>
    <div style= {showMore}>
    <p>likes: {blog.likes}</p>
    <button onClick={likeHandler} value={blog.id}>like</button>
    <p>{blog.url}</p>
    <p>Added By {username}</p>
    <div style= {showDelete}>
      <button onClick={removeHandler} value={blog.id}>Delete blog</button>
    </div>
    </div>
    <button onClick={toggleVisibility}>Show</button>
  </div>
  )
  }

export default Blog