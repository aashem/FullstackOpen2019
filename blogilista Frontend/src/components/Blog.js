import React, {useState} from 'react'


const Blog = ({ blog, likeHandler  }) => {
  const [visible, setVisible] = useState(false)
  let user = blog.user
  let username = user.map(u => u.username)

  const toggleVisibility = (event) => {
    event.preventDefault()
    console.log(username)
    if(visible === false){
      setVisible(true)
    }else{
      setVisible(false) 
  }
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
    </div>
    <button onClick={toggleVisibility} >Show</button>
  </div>
  )
  }

export default Blog