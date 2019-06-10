import blogServices from '../services/blogServices'
import { INIT_BLOGS, VOTE, DELETE, CREATE } from '../reducers/reducerTypes'

const blogReducer = (state = [], action) => {
    switch(action.type){
        case INIT_BLOGS:
            return action.data
        case CREATE:
            return [...state, action.data]
        case VOTE:
            return [...state]
        case DELETE:
            return [...state]
        default:
            return state
       
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        let blogs = await blogServices.getAll()
        dispatch({
            type: INIT_BLOGS,
            data: blogs
        })
    }
}

export const voteBlog = (id, newBlog) => {
    return async dispatch => {
        newBlog.likes++
        let blogs = await blogServices.update(id, newBlog)
        dispatch({
            type: VOTE,
            data: blogs
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        let blogs = await blogServices.remove(id)
        dispatch({
            type:DELETE,
            data: blogs
        })
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        let blog = await blogServices.create(newBlog)
        dispatch({
            type: CREATE,
            data: blog
        })
    }
}

export default blogReducer