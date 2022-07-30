import {makeAutoObservable, runInAction} from "mobx";
import {getProducts} from "../api/store/Product";
import {Product} from "../types/Product";

class ProductsStore {

    products:Product[] = []
    selectedProductsName:string = ''
    selectedNavbarProduct:string = ''
    minProductPrice:number = -1
    maxProductPrice:number = -1
    drawerIsOpen:boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    async fetchProducts(productsNames:string[]) {
        console.log('names:', productsNames)
        const products = await getProducts(productsNames, this.minProductPrice, this.maxProductPrice)
        console.log(products)
        runInAction(() => {
            this.products = products
        })
    }

    setProducts(products:Product[]){
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


}

export default new ProductsStore()