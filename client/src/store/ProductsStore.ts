import {makeAutoObservable} from "mobx";
import {getProducts} from "../api/store/Product";
import {Product} from "../types/Product";

class ProductsStore {
    products:Product[] = []
    selectedProductsName:string = ''
    constructor() {
        makeAutoObservable(this)
    }

    async fetchProducts(productsNames:string[]) {
        console.log(await getProducts(productsNames))
        this.products = await getProducts(productsNames)
    }

    setProducts(products:Product[]){
        this.products = products
    }

    setSelectedProductsName(selectedProductsName:string) {
        this.selectedProductsName = selectedProductsName
    }


}

export default new ProductsStore()