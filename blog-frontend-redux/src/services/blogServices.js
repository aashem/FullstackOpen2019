import Axios from 'axios'

let baseUrl = ('/api/blogs')
let token = null

const setToken = newToken =>{
    token = `Bearer ${newToken}`
}

const getAll = async() => {
    let res = await Axios.get(baseUrl)
    return res.data
}

const update = async(id, newBlog) => {
    const res = await Axios.put(baseUrl+`/${id}`, newBlog)
    return res.data
}

const remove = async(id) => {
    let config = {
        headers : {authorization : token}
    }
    const res = await Axios.delete(baseUrl + `/${id}`, config)
    return res.data
}

const create = async(newBlog) => {
    let config = {
        headers : {authorization : token}
    }
    const res = await Axios.post(baseUrl, newBlog, config)
    return res.data
}

export default {setToken, getAll, update, remove, create}
