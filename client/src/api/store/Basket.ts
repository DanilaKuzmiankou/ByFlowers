import $api from '../index.network';
import {AxiosResponse} from "axios"
import {AddToBasketResponse, IBasketProduct} from "../../models/IProduct";

export async function addToBasket(id:number, count:number, email:string): Promise<AxiosResponse<AddToBasketResponse>> {
    return $api.post<AddToBasketResponse>('/basket/add', {id, count, email})
}

export async function getBasketProductCount(id:number, email:string): Promise<AxiosResponse<number>> {
    return $api.get<number>('/basket/count', {
        params: {
            id,
            email
        }
    })
}

export async function getBasketProducts(email:string): Promise<AxiosResponse<IBasketProduct[]>> {
    return $api.get<IBasketProduct[]>('/basket/products', {
        params: {
            email
        }
    })
}

export async function deleteBasketProduct(email:string, id:number): Promise<AxiosResponse<IBasketProduct[]>> {
    return $api.delete<IBasketProduct[]>('/basket/product', {
        params: {
            email,
            id
        }
    })
}