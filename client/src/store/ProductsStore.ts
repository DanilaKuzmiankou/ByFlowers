import { AxiosResponse } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { getProducts } from '../api/store/Product'
import { IProduct, ProductsResponse } from '../models/IProduct'

class ProductsStore {
  products: IProduct[] = []

  isFlowers: boolean = false

  plants: string[] = []

  flowers: string[] = []

  selectedProductsName: string = ''

  minProductPrice: number | string = ''

  maxProductPrice: number | string = ''

  isDrawerOpen: boolean = false

  itemsLimit: number = 10

  itemsOffset: number = 0

  productsNames: string[] = []

  productsCount: number = 0

  sortOptions: string[] = [] // format: ['price', 'ASC']

  sortOptionDescription: string = ''

  checkedProducts: string[] = []

  mainCheckbox: boolean[] = [false, false]

  productsCategories: string[] = this.flowers

  isNavbarMenuWasToggled: boolean | undefined = undefined

  newestProducts: IProduct[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setNewestProducts(newestProducts: IProduct[]) {
    this.newestProducts = newestProducts
  }

  setCheckedProducts(checkedProducts: string[]) {
    this.checkedProducts = checkedProducts
  }

  setMainCheckbox(mainCheckbox: boolean[]) {
    this.mainCheckbox = mainCheckbox
  }

  setProductsCategories(productsCategories: string[]) {
    this.productsCategories = productsCategories
  }

  setSortOptionDescription(sortOptionDescription: string) {
    this.sortOptionDescription = sortOptionDescription
  }

  setProductsNames(productsNames: string[]) {
    this.productsNames = productsNames
  }

  async fetchProducts(productsNames?: string[]) {
    let response: AxiosResponse<ProductsResponse>
    try {
      const minProductPrice =
        typeof this.minProductPrice === 'number' ? this.minProductPrice : -1
      const maxProductPrice =
        typeof this.maxProductPrice === 'number' ? this.maxProductPrice : -1
      response = await getProducts(
        productsNames ?? this.productsNames,
        minProductPrice,
        maxProductPrice,
        this.itemsLimit,
        this.itemsOffset,
        this.sortOptions,
      )
      const { products } = response.data
      runInAction(() => {
        this.products = products
        this.productsCount = response.data.count
      })
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  setIsFlowers(isFlowers: boolean) {
    this.isFlowers = isFlowers
    this.productsCategories = isFlowers ? this.flowers : this.plants
  }

  setProducts(products: IProduct[]) {
    this.products = products
  }

  setSelectedProductsName(selectedProductsName: string) {
    this.selectedProductsName = selectedProductsName
  }

  setMinProductPrice(minProductPrice: number | string) {
    this.minProductPrice = minProductPrice
    this.fetchProducts()
  }

  setMaxProductPrice(maxProductPrice: number | string) {
    this.maxProductPrice = maxProductPrice
    this.fetchProducts()
  }

  setIsDrawerOpen(open: boolean) {
    this.isDrawerOpen = open
  }

  setItemsLimit(itemsLimit: number) {
    this.itemsLimit = itemsLimit
  }

  setItemsOffset(itemsOffset: number) {
    this.itemsOffset = itemsOffset
  }

  setSortOptions(sortOptions: string[]) {
    this.sortOptions = sortOptions
  }

  setFlowers(flowers: string[]) {
    this.flowers = flowers
  }

  setPlants(plants: string[]) {
    this.plants = plants
  }

  setProductsCount(productsCount: number) {
    this.productsCount = productsCount
  }

  setIsNavbarMenuWasToggled(isFlowers: boolean, checkedProducts: string[]) {
    const currentProducts = isFlowers ? this.flowers : this.plants
    this.isFlowers = isFlowers
    this.productsCategories = currentProducts
    this.checkedProducts =
      checkedProducts.length > 0 ? checkedProducts : currentProducts
    this.isNavbarMenuWasToggled = !this.isNavbarMenuWasToggled
  }
}

export default new ProductsStore()
