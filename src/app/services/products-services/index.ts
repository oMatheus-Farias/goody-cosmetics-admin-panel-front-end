import { httpClient } from '@/app/configs/http-client'

import type {
  IGetAllWithParamsProps,
  IGetAllWithParamsReturn,
  IUpdateProductImageProps,
  IUpdateProps,
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
  static async createProducts(data: FormData) {
    await httpClient.post('/api/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  static async updateProducts({ productId, data }: IUpdateProps) {
    await httpClient.put(`/api/products/${productId}`, data)
  }
  static async updateProductImage({ imageId, data }: IUpdateProductImageProps) {
    await httpClient.put(`/api/products/images/${imageId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  static async deleteProducts(productId: string) {
    await httpClient.delete(`/api/products/${productId}`)
  }
}
