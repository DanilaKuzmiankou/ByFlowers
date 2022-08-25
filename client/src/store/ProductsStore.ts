import {AxiosResponse} from "axios";
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
    sortOptions: string[] = [] // format: ['price', 'ASC']

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
            this.maxProductPrice, this.itemsLimit, this.itemsOffset, this.sortOptions)
            const products = response.data.products
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
        this.itemsLimit = itemsLimit
    }

    setItemsOffset(itemsOffset:number){
        this.itemsOffset = itemsOffset
    }

    setSortOptions(sortOptions:string[]){
        this.sortOptions = sortOptions
    }

}

export default new ProductsStore()