import React from 'react'
const Blog = ({ blog }) => (
  <div>
   <p>title: {blog.title} <li>author: {blog.author}</li> likes: {blog.likes}</p>
  </div>
)

export default Blog