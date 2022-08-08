import {makeAutoObservable} from "mobx";

class BasketStore {

    basketProducts:number = 0

    constructor() {
        makeAutoObservable(this)
    }

    setBasketProducts(basketProduct:number){
        this.basketProducts = basketProduct
    }

}

export default new BasketStore()