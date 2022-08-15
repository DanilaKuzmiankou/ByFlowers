export interface IProduct {
    id: number,
    name: string,
    description: string,
    count: number,
    price: number,
    pictures: IPicture[]
}

export interface IPicture {
    id? : number,
    productId? : number,
    picture: string
}

export interface IBasketProduct {
    count: number,
    product: IProduct
}

export interface ProductsResponse {
    count: number
    products: IProduct[],
}
