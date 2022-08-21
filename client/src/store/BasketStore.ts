import {makeAutoObservable, runInAction} from "mobx";
import {deleteBasketProduct, getBasketProducts} from "../api/store/Basket";
import {IBasketProduct} from "../models/IProduct";
import {AxiosResponse} from "axios";

class BasketStore {

    basketProductsCount:number = 0
    basketProducts = [] as IBasketProduct[]
    isBasketOpen:boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    async updateBasket(email:string){
        let response: AxiosResponse<IBasketProduct[]>
        try {
        response = await getBasketProducts(email)
        runInAction(() => {
            this.setBasketProducts(response.data)
        })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async deleteProduct(email:string, id: number) {
        let response: AxiosResponse<IBasketProduct[]>
        try {
        response = await deleteBasketProduct(email, id)
        runInAction(() => {
            this.setBasketProducts(response.data)
        })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    setBasketProducts(basketProducts:IBasketProduct[]){
        this.basketProducts = basketProducts
        this.basketProductsCount = basketProducts.length
    }

    setIsBasketOpen(isBasketOpen:boolean){
        this.isBasketOpen = isBasketOpen
    }
}

export default new BasketStore()