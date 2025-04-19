import type { IGetAllWithParamsReturn } from '@/app/services/sales-services/interfaces'

export interface ISalesTableProps {
  sales: IGetAllWithParamsReturn
  setSearchParams: (params: URLSearchParams) => void
}
