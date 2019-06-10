import Axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const res = await Axios.post(baseUrl, credentials)
    return res.data
}
export default {login}