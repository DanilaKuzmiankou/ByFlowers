import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import { checkAuth, login, logout, registration } from '../api/store/User'
import basketStore from './BasketStore'

class UserStore {
  user = {} as IUser

  isAuthDialogOpen: boolean = false

  isAuth: boolean = false

  isLoginPageOpen: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  setUser(user: IUser) {
    this.user = user
  }

  setIsAuthDialogOpen(isAuthDialogOpen: boolean) {
    this.isAuthDialogOpen = isAuthDialogOpen
  }

  setIsLoginPageOpen(isLoginPageOpen: boolean) {
    this.isLoginPageOpen = isLoginPageOpen
  }

  async login(email: string, password: string) {
    let response
    try {
      response = await login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
      response = e.response?.data
    }
    return response
  }

  async registration(
    email: string,
    password: string,
    phone: string,
    name: string,
  ) {
    let response
    try {
      response = await registration(email, password, phone, name)
      localStorage.setItem('token', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
      response = e.response?.data
    }
    return response
  }

  async logout() {
    try {
      await logout()
      localStorage.removeItem('token')
      this.setIsAuth(false)
      this.setUser({} as IUser)
      basketStore.setBasketProductsTypes([])
      basketStore.setBasketProductsActual([])
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async checkIsUserAuth() {
    try {
      const response = await checkAuth()
      localStorage.setItem('token', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    } finally {
      // this.setLoading(false)
    }
  }
}

export default new UserStore()
