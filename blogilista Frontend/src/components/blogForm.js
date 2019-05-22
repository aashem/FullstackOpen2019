import React from 'react' 
const BlogForm = ({addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, title ,author , url}) => {
    return(<form onSubmit = {addBlog}>
        <div>
          <p>Title</p>
        <input
          type ='text'
          value={title}
          onChange={handleTitleChange}
        />
        </div>
        <div>
          <p>Author</p>
        <input
          type ="text"
          value={author}
          onChange={handleAuthorChange}
          />
        </div>
        <div>
          <p>Url</p>
        <input
          type = "text"
          value={url}
          onChange={handleUrlChange}
        />
        </div>
          <button type='submit'>Tallena uusi blogi</button>

    </form>
    )
  }

export default BlogForm