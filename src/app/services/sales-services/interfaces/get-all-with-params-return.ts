import { IGetSalesReturn } from './get-sales-return'

export interface IGetAllWithParamsReturn {
  sales: IGetSalesReturn[]
  meta: {
    pageIndex: number
    limit: number
    countPerPage: number
    totalCount: number
  }
}
