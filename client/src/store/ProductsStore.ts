import { AxiosResponse } from "axios";
import {makeAutoObservable, runInAction} from "mobx";
import {getProducts} from "../api/store/Product";
import {IProduct, ProductsResponse} from "../models/IProduct";

class ProductsStore {

    products: IProduct[] = []
    selectedProductsName: string = ''
    selectedNavbarProduct: string = ''
    minProductPrice: number = -1
    maxProductPrice: number = -1
    isDrawerOpen: boolean = false
    itemsLimit: number = 10
    itemsOffset: number = 0
    productsNames: string[] = []
    productsCount: number = 0
    currentProductCount: number = 1

    constructor() {
        makeAutoObservable(this)
    }

    async fetchNewProducts(productsNames: string[]) {
        this.productsNames = productsNames
        await this.fetchProducts()
    }

    async fetchProducts() {
        let response: AxiosResponse<ProductsResponse>
        try {
            response = await getProducts(this.productsNames, this.minProductPrice,
            this.maxProductPrice, this.itemsLimit, this.itemsOffset)
            const products = response.data.products
            console.log('pr', products)
            runInAction(() => {
                this.products = products
                this.productsCount = response.data.count
            })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    setProducts(products:IProduct[]){
        this.products = products
    }

    setSelectedProductsName(selectedProductsName:string) {
        this.selectedProductsName = selectedProductsName
    }

    setSelectedNavbarProduct(selectedNavbarProduct:string) {
        this.selectedNavbarProduct = selectedNavbarProduct
    }

    setMinProductPrice(minProductPrice:number){
        this.minProductPrice = minProductPrice
    }

    setMaxProductPrice(maxProductPrice:number){
        this.maxProductPrice = maxProductPrice
    }

    setIsDrawerOpen(open:boolean){
        this.isDrawerOpen = open
    }

    setItemsLimit(itemsLimit:number){
        console.log('new lim', itemsLimit)
        this.itemsLimit = itemsLimit
    }

    setItemsOffset(itemsOffset:number){
        this.itemsOffset = itemsOffset
    }

    setCurrentProductCount(count: number){
        this.currentProductCount = count
    }

}

export default new ProductsStore()