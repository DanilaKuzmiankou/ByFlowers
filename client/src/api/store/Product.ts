import axios, {AxiosResponse} from "axios";
import {IProduct, ProductsResponse} from "../../models/IProduct";


export async function getProducts(types:string[], minPrice:number, maxPrice:number, limit:number, offset:number, orderExpression?: string[]):Promise<AxiosResponse<ProductsResponse>> {
    const typesStr = types.join(',')
    return axios.get<ProductsResponse>(`${process.env.REACT_APP_SERVER_URL}/product/products`, {
        params: {
            types: typesStr,
            minPrice,
            maxPrice,
            limit,
            offset,
            orderExpression
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

export async function getProduct(id:number):Promise<AxiosResponse<IProduct>> {
    return axios.get<IProduct>(`${process.env.REACT_APP_SERVER_URL}/product/product`, {
        params: {
            id
        }
    })
}

export async function getProductsTypes(isFlower:boolean):Promise<AxiosResponse<string[]>> {
    return axios.get<string[]>(`${process.env.REACT_APP_SERVER_URL}/product/types`, {
        params: {
            isFlower
        }
    })
}
