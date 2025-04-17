import { httpClient } from '@/app/configs/http-client'

import type {
  IGetAllWithParamsProps,
  IGetAllWithParamsReturn,
} from './interfaces'

export class ProductsServices {
  static async getAllProductsWithParams({
    pageIndex,
    searchTerm,
  }: IGetAllWithParamsProps) {
    const { data } = await httpClient.get<IGetAllWithParamsReturn>(
      `/api/products/params?pageIndex=${pageIndex}&searchTerm=${searchTerm}`,
    )
    return data
  }
}
