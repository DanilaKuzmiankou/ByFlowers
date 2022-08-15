import $api from '../index.network';
import {AuthResponse} from "../../models/AuthResponse";
import axios, {AxiosResponse} from  "axios"
import {IBasketProduct, IProduct} from "../../models/IProduct";

export async function addToBasket(id:number, count:number, email:string, ): Promise<AxiosResponse<number>> {
    return $api.post<number>('/basket/add', {id, count, email})
}

export async function getBasketProductCount(id:number, email:string, ): Promise<AxiosResponse<number>> {
    return $api.get<number>('/basket/count', {
        params: {
            id,
            email
        }
    })
}

export async function getBasketProducts(email:string, ): Promise<AxiosResponse<IBasketProduct[]>> {
    return $api.get<IBasketProduct[]>('/basket/products', {
        params: {
            email
        }
    })
}