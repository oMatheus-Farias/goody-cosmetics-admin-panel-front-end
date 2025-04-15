import { httpClient } from '@/app/configs/http-client'

import type {
  IGetAllWithParamsProps,
  IGetAllWithParamsReturn,
} from './interfaces'

export class CategoriesServices {
  static async getAllCategoriesWithParams({
    pageIndex,
    searchTerm,
  }: IGetAllWithParamsProps) {
    const { data } = await httpClient.get<IGetAllWithParamsReturn>(
      `/api/categories/params?pageIndex=${pageIndex}&searchTerm=${searchTerm}`,
    )
    return data
  }
  static async deleteCategories(categoryId: string) {
    await httpClient.delete(`/api/categories/${categoryId}`)
  }
}
