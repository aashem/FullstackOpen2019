import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return [...state, action.data]  
        case 'DEL_BLOG':
            return state  
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        let blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        let blog = await blogService.create(content)
        dispatch({
            type:'ADD_BLOG',
            data: blog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type:'DEL_BLOG',
        })
    }
}

export default blogReducer