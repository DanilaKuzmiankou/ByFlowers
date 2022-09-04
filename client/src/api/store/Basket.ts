import axios, { AxiosResponse } from 'axios'
import $api from '../index.network'
import { AddToBasketResponse, IBasketProduct } from '../../models/IProduct'
import { GetRussianCitiesResponse } from '../../models/GetRussianCitiesResponse'

export async function addToBasket(
  id: number,
  count: number,
  email: string,
): Promise<AxiosResponse<AddToBasketResponse>> {
  return $api.post<AddToBasketResponse>('/basket/add', { id, count, email })
}

export async function getBasketProductCount(
  id: number,
  email: string,
): Promise<AxiosResponse<number>> {
  return $api.get<number>('/basket/count', {
    params: {
      id,
      email,
    },
  })
}

export async function getBasketProducts(
  email: string,
): Promise<AxiosResponse<IBasketProduct[]>> {
  return $api.get<IBasketProduct[]>('/basket/products', {
    params: {
      email,
    },
  })
}

export async function deleteBasketProduct(
  email: string,
  id: number,
): Promise<AxiosResponse<IBasketProduct[]>> {
  return $api.delete<IBasketProduct[]>('/basket/product', {
    params: {
      email,
      id,
    },
  })
}

export async function completeOrder(
  email: string,
  name: string,
  phone: string,
  city: string,
): Promise<AxiosResponse<AddToBasketResponse>> {
  return $api.post<AddToBasketResponse>('/basket/order', {
    email,
    name,
    phone,
    city,
  })
}

export async function getRussianCities(): Promise<
  AxiosResponse<GetRussianCitiesResponse>
> {
  return axios.get<GetRussianCitiesResponse>(
    'https://parseapi.back4app.com/classes/Russia_City?limit=9999&order=name&keys=name',
    {
      headers: {
        'X-Parse-Application-Id': process.env
          .REACT_APP_X_PARSE_APPLICATION_ID as string,
        'X-Parse-REST-API-Key': process.env
          .REACT_APP_X_PARSE_REST_API_KEY as string,
      },
      params: {
        where: {
          population: {
            $gt: 100000,
          },
        },
      },
    },
  )
}
