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

export interface ProductsResponse {
    products: IProduct[],
    count: number
}