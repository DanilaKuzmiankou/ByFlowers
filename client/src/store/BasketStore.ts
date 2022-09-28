import { makeAutoObservable, runInAction } from 'mobx'
import { AxiosResponse } from 'axios'
import { deleteBasketProduct, getBasketProducts } from '../api/store/Basket'
import { IBasketActualProduct, IBasketProduct } from '../models/IProduct'

class BasketStore {
  basketProductsTypesCount: number = 0

  basketProductsCost: number[] = []

  basketProducts = [] as IBasketProduct[]

  isBasketOpen: boolean = false

  isCompleteOrderOpen: boolean = false

  basketProductsActual: IBasketActualProduct[] = []

  basketOrderTotal: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  async updateBasket(email: string) {
    let response: AxiosResponse<IBasketProduct[]>
    try {
      response = await getBasketProducts(email)
      console.log('resp', response.data)
      runInAction(() => {
        this.setBasketProductsTypes(response.data)
        this.setBasketProductsActual(response.data)
      })
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async deleteProduct(email: string, id: number, arrayIndex: number) {
    let response: AxiosResponse<IBasketProduct[]>
    try {
      response = await deleteBasketProduct(email, id)
      runInAction(() => {
        this.setBasketProductsTypes(response.data)
        this.basketProductsCost = [...this.basketProductsCost].splice(
          arrayIndex,
          1,
        )
      })
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  setBasketProductsTypes(basketProducts: IBasketProduct[]) {
    this.basketProducts = basketProducts
    this.basketProductsTypesCount = basketProducts.length
  }

  setIsBasketOpen(isBasketOpen: boolean) {
    this.isBasketOpen = isBasketOpen
  }

  setBasketProductsCost(index: number, cost: number) {
    const newBasketProductsCost = [...this.basketProductsCost]
    newBasketProductsCost[index] = cost
    this.basketProductsCost = newBasketProductsCost
    this.basketOrderTotal = this.basketProductsCost.reduce(
      (partialSum, a) => partialSum + a,
      0,
    )
  }

  setBasketProductsActual(basketProducts: IBasketProduct[]) {
    const newBasketProductsActual: IBasketActualProduct[] = []
    basketProducts.map((basketProduct) =>
      newBasketProductsActual.push({
        id: basketProduct.product.id,
        count: basketProduct.count,
      }),
    )
    this.basketProductsActual = newBasketProductsActual
  }

  changeBasketProductsActual(id: number, count: number) {
    const newBasketProductsActual: IBasketActualProduct[] = [
      ...this.basketProductsActual,
    ]
    newBasketProductsActual.map((product): IBasketActualProduct => {
      if (product.id === id) product.count = count
      return product
    })
    this.basketProductsActual = newBasketProductsActual
  }

  setIsCompleteOrderOpen(isCompleteOrderOpen: boolean) {
    this.isCompleteOrderOpen = isCompleteOrderOpen
  }

  clearBasket() {
    this.basketOrderTotal = 0
    this.basketProducts = []
    this.basketProductsActual = []
    this.basketProductsTypesCount = 0
  }
}

export default new BasketStore()
