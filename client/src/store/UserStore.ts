import {makeAutoObservable} from "mobx";
import {User} from "../types/UserModel";


class UserStore {

    user:User = {}
    loggedIn:boolean = false

    constructor() {
        makeAutoObservable(this)
    }



}

export default new UserStore()