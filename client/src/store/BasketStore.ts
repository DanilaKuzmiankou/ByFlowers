import {makeAutoObservable} from "mobx";
import {getBasketProducts} from "../api/store/Basket";
import {IBasketProduct} from "../models/IProduct";

class BasketStore {

    basketProductsCount:number = 0
    basketProducts = [] as IBasketProduct[]
    isBasketOpen:boolean = false


    constructor() {
        makeAutoObservable(this)
    }

    async updateBasket(email:string){
        const response = await getBasketProducts(email)
        this.setBasketProducts(response.data)
        console.log('res[: ', response)
    }

    setBasketProductsCount(basketProduct:number){
        this.basketProductsCount = basketProduct
    }

    setBasketProducts(basketProducts:IBasketProduct[]){
        this.basketProducts = basketProducts
    }

    setIsBasketOpen(isBasketOpen:boolean){
        console.log('basket:', isBasketOpen)
        this.isBasketOpen = isBasketOpen
    }

}

export default new BasketStore()