import axios from 'axios'

export default () => {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
    headers: { ...axios.defaults.headers },
  })

  return api
}
