import { httpClient } from '@/app/configs/http-client'

import type {
  IGetAllWithParamsProps,
  IGetAllWithParamsReturn,
  IUpdateSalesProps,
} from './interfaces'

export class SalesServices {
  static async getAllSalesWithParams({
    pageIndex,
    searchTerm,
  }: IGetAllWithParamsProps) {
    const { data } = await httpClient.get<IGetAllWithParamsReturn>(
      `/api/sales/params?pageIndex=${pageIndex}&searchTerm=${searchTerm}`,
    )
    return data
  }
  static async updateSales(data: IUpdateSalesProps) {
    await httpClient.patch(`/api/sales/${data.saleId}`, {
      saleDate: data.saleDate,
      items: data.items,
    })
  }
  static async deleteSales(saleId: string) {
    await httpClient.delete(`/api/sales/${saleId}`)
  }
}
