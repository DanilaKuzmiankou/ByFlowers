import {makeAutoObservable} from "mobx";
import {User} from "../types/UserModel";
import {registration, login} from "../api/store/User";


class UserStore {

    user:User = {}
    loggedIn:boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    async register(user: User){
        const response = await registration(user, 'fsdfsd')
        console.log('resp: ', response)
    }

    async login(user: User){
        const response = await login(user, 'fsdfsd')
        console.log('resp login: ', response)
    }

    setUser(user: User){
        if(user){
            this.user = user
            this.loggedIn = true
        }
    }

}

export default new UserStore()