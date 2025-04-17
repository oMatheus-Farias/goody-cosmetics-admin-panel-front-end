import { IGetProductsReturn } from './get-products-return'

export interface IGetAllWithParamsReturn {
  products: IGetProductsReturn[]
  meta: {
    pageIndex: number
    limit: number
    countPerPage: number
    totalCount: number
  }
}
