import $api from '../index.network';
import {AuthResponse} from "../../models/AuthResponse";
import axios, {AxiosResponse} from  "axios"

export async function addToBasket(id:number, count:number, email:string, ): Promise<AxiosResponse<number>> {
    return $api.post<number>('/basket/add', {id, count, email})
}

export async function getBasketProductCount(id:number, email:string, ): Promise<AxiosResponse<number>> {
    console.log('id, email', id, email)
    return $api.get<number>('/basket/count', {
        params: {
            id,
            email
        }
    })
}