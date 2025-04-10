import { IGetAllWithParamsReturn } from '@/app/services/categories-services/interfaces'

export interface ICategoriesTableProps {
  categories: IGetAllWithParamsReturn
  setSearchParams: (params: URLSearchParams) => void
}
