import type { IGetCategoriesReturn } from './get-categories-return'

export interface IGetAllWithParamsReturn {
  categories: IGetCategoriesReturn[]
  meta: {
    pageIndex: number
    limit: number
    countPerPage: number
    totalCount: number
  }
}
