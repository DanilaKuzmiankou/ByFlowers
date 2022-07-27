export type Product = {
    id: number,
    name: string,
    description: string,
    count: number,
    price: number,
    pictures: Picture[]
}

type Picture = {
    id? : number,
    productId? : number,
    picture: string
}