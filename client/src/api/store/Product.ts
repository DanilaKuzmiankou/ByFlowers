import axios, {AxiosResponse} from "axios";
import {IProduct, ProductsResponse} from "../../models/IProduct";


export async function getProducts(types:string[], minPrice:number, maxPrice:number, limit:number, offset:number):Promise<AxiosResponse<ProductsResponse>> {
    const typesStr = types.join(',')
    return axios.get<ProductsResponse>(`${process.env.REACT_APP_SERVER_URL}/product/products`, {
        params: {
            types: typesStr,
            minPrice,
            maxPrice,
            limit,
            offset
        }
    })
}

export async function getRecommendationProducts(limit:number):Promise<AxiosResponse<IProduct[]>> {
    return axios.get<IProduct[]>(`${process.env.REACT_APP_SERVER_URL}/product/recommendationProducts`, {
        params: {
            limit
        }
    })
}