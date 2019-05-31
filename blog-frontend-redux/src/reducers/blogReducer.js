import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return [...state, action.data]    
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

export default blogReducer