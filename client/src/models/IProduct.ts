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

export interface IBasketActualProduct {
    id: number,
    count: number,
}

export interface ProductsResponse {
    count: number
    products: IProduct[],
}

export interface CountInputProps {
    counterGetCount: () => number,
    counterSetCount: (count: number) => void
}

export interface CityAutocompleteProps {
    getCity: () => string|undefined
    setFieldIsRequired: () => void
}

export interface AddToBasketResponse {
    count: number,
    message?: string
}