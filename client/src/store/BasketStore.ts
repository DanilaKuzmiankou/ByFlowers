import {makeAutoObservable, runInAction, toJS} from "mobx";
import {deleteBasketProduct, getBasketProducts} from "../api/store/Basket";
import {IBasketProduct} from "../models/IProduct";
import {AxiosResponse} from "axios";

class BasketStore {

    basketProductsTypesCount:number = 0
    basketProductsCost:number[] = []
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
            this.setBasketProductsTypes(response.data)
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
            this.setBasketProductsTypes(response.data)
        })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    setBasketProductsTypes(basketProducts:IBasketProduct[]){
        this.basketProducts = basketProducts
        this.basketProductsTypesCount = basketProducts.length
    }

    setIsBasketOpen(isBasketOpen:boolean){
        this.isBasketOpen = isBasketOpen
    }

    setBasketProductsCost(index: number, cost: number) {
        const newBasketProductsCost = [...this.basketProductsCost]
        newBasketProductsCost[index] = cost
        this.basketProductsCost = newBasketProductsCost
    }
}

export default new BasketStore()