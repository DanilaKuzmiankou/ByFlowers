import axios, { AxiosResponse } from 'axios'
import $api from '../index.network'
import { AuthResponse } from '../../models/AuthResponse'

export async function registration(
  email: string,
  password: string,
  phone: string,
  name: string,
): Promise<AxiosResponse<AuthResponse>> {
  return $api.post<AuthResponse>('/user/registration', {
    email,
    password,
    phone,
    name,
  })
}

export async function login(
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> {
  return $api.post<AuthResponse>('/user/login', { email, password })
}

export async function logout(): Promise<void> {
  return $api.post('/user/logout')
}

export async function checkAuth(): Promise<AxiosResponse<AuthResponse>> {
  return axios.get<AuthResponse>(
    `${process.env.REACT_APP_SERVER_URL}/user/refresh`,
    { withCredentials: true },
  )
}
