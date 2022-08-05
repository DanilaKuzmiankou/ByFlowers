import {makeAutoObservable} from "mobx";
import {User} from "../types/UserModel";
import {registration} from "../api/store/User";


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

    setUser(user: User){
        if(user){
            this.user = user
            this.loggedIn = true
        }
    }

}

export default new UserStore()