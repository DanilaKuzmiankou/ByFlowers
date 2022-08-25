import {makeAutoObservable} from "mobx";
import {IUser} from "../models/IUser";
import {checkAuth, login, logout, registration} from "../api/store/User";


class UserStore {

    user = {} as IUser

    isAuth:boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth(isAuth:boolean){
        this.isAuth = isAuth
    }

    setUser(user: IUser){
        this.user = user
    }

    async login(email: string, password: string){
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

    async registration(email:string, password:string, phone: string, name: string){
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

    async logout(){
        try {
            const response = await logout()
            localStorage.removeItem('token')
            this.setIsAuth(false)
            this.setUser({} as IUser)
        } catch (e:any) {
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
            //this.setLoading(false)
        }
    }




}

export default new UserStore()