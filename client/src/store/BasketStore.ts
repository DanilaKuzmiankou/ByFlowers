import {makeAutoObservable, runInAction} from "mobx";
import {deleteBasketProduct, getBasketProducts} from "../api/store/Basket";
import {IBasketActualProduct, IBasketProduct} from "../models/IProduct";
import {AxiosResponse} from "axios";

class BasketStore {

    basketProductsTypesCount:number = 0
    basketProductsCost:number[] = []
    basketProducts = [] as IBasketProduct[]
    isBasketOpen:boolean = false
    isCompleteOrderOpen: boolean = false
    basketProductsActual: IBasketActualProduct[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async updateBasket(email:string){
        let response: AxiosResponse<IBasketProduct[]>
        try {
        response = await getBasketProducts(email)
        runInAction(() => {
            this.setBasketProductsTypes(response.data)
            this.setBasketProductsActual(response.data)
        })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async deleteProduct(email:string, id: number, arrayIndex:number) {
        let response: AxiosResponse<IBasketProduct[]>
        try {
        response = await deleteBasketProduct(email, id)
        runInAction(() => {
            this.setBasketProductsTypes(response.data)
            this.basketProductsCost = [...this.basketProductsCost].splice(arrayIndex, 1);
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

    setBasketProductsActual(basketProducts: IBasketProduct[]){
        const newBasketProductsActual:IBasketActualProduct[] = []
        basketProducts.map(basketProduct => {
            newBasketProductsActual.push({id: basketProduct.product.id, count: basketProduct.count})
        })
        this.basketProductsActual = newBasketProductsActual
    }

    changeBasketProductsActual(id: number, count: number) {
        const newBasketProductsActual:IBasketActualProduct[] = [...this.basketProductsActual]
        newBasketProductsActual.map(product => {
            if(product.id === id) product.count = count
        })
        this.basketProductsActual = newBasketProductsActual
    }

    setIsCompleteOrderOpen(isCompleteOrderOpen:boolean) {
        this.isCompleteOrderOpen = isCompleteOrderOpen
    }

}

export default new BasketStore()