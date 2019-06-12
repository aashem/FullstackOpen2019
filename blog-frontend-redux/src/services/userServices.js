import Axios from 'axios'
const baseUrl  = ('/api/users')

const getAll = async() => {
    let res = await Axios.get(baseUrl)
    return res.data
}

const getById = async(id) => {
    let res = await Axios.get(baseUrl + `/${id}`)
    return res.data
}

export default {getAll, getById}