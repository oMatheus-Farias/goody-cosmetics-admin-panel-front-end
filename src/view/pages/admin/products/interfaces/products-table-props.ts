import type { IGetAllWithParamsReturn } from '@/app/services/products-services/interfaces'

export interface IProductsTableProps {
  products: IGetAllWithParamsReturn
  setSearchParams: (params: URLSearchParams) => void
}
