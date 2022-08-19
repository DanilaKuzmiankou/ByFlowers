import {makeAutoObservable} from "mobx";
import {deleteBasketProduct, getBasketProducts} from "../api/store/Basket";
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
    }

    async deleteProduct(email:string, id: number) {
        const response = await deleteBasketProduct(email, id)
        this.setBasketProducts(response.data)
    }

    setBasketProductsCount(basketProduct:number){
        this.basketProductsCount = basketProduct
    }

    setBasketProducts(basketProducts:IBasketProduct[]){
        this.basketProducts = []
        this.basketProducts = basketProducts
    }

    setIsBasketOpen(isBasketOpen:boolean){
        this.isBasketOpen = isBasketOpen

    }

}

export default new BasketStore()