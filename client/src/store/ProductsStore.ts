import {makeAutoObservable, runInAction} from "mobx";
import {getProducts} from "../api/store/Product";
import {ProductModel} from "../types/ProductModel";

class ProductsStore {

    products:ProductModel[] = []
    selectedProductsName:string = ''
    selectedNavbarProduct:string = ''
    minProductPrice:number = -1
    maxProductPrice:number = -1
    drawerIsOpen:boolean = false
    itemsLimit:number = 10
    itemsOffset:number = 0
    productsNames: string[] = []
    productsCount: number = 0
    constructor() {
        makeAutoObservable(this)
    }

    async fetchNewProducts(productsNames:string[]) {
        this.productsNames = productsNames
       await this.fetchProducts()
    }

    async fetchProducts() {
        const response = await getProducts(this.productsNames, this.minProductPrice,
            this.maxProductPrice, this.itemsLimit, this.itemsOffset)
        const products = response[0]
        this.productsCount = response[1]
        runInAction(() => {
            this.products = products
        })
    }

    async fetchSameProducts() {
       await this.fetchProducts()
    }

    setProducts(products:ProductModel[]){
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

    setDrawerIsOpen(open:boolean){
        this.drawerIsOpen = open
    }

    setItemsLimit(itemsLimit:number){
        this.itemsLimit = itemsLimit
    }

    setItemsOffset(itemsOffset:number){
        this.itemsOffset = itemsOffset
    }


}

export default new ProductsStore()