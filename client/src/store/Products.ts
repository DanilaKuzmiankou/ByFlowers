import {makeAutoObservable} from "mobx";
import {getProducts} from "../api/store/Product";

class ProductsStore {
    products:object[] = []
    constructor() {
        makeAutoObservable(this)
    }

    async fetchProducts(productsNames:string[]) {
        this.products = await getProducts(productsNames)
    }

}

export default new ProductsStore()