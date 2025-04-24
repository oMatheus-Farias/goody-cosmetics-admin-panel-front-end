import { httpClient } from '@/app/configs/http-client'

import type {
  ICreateSalesProps,
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
  static async createSales(data: ICreateSalesProps) {
    await httpClient.post('/api/sales', {
      saleDate: data.saleDate,
      items: data.items,
    })
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
  static async deleteSaleItems(saleItemId: string) {
    await httpClient.delete(`/api/sales/items/${saleItemId}`)
  }
}
