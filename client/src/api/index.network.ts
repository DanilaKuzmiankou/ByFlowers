import axios from 'axios'
import { AuthResponse } from '../models/AuthResponse'

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
})

$api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<AuthResponse>(
          `${process.env.REACT_APP_SERVER_URL}/user/refresh`,
          { withCredentials: true },
        )
        localStorage.setItem('token', response.data.accessToken)
        return await $api.request(originalRequest)
      } catch (e) {
        console.log('Exception 401. Not authorized.')
      }
    }
    throw error
  },
)

export default $api
