export type ProductModel = {
    id: number,
    name: string,
    description: string,
    count: number,
    price: number,
    pictures: Picture[]
}

export type Picture = {
    id? : number,
    productId? : number,
    picture: string
}