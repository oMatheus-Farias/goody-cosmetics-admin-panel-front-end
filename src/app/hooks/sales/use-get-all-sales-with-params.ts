import { useQuery } from '@tanstack/react-query'

import { SalesServices } from '@/app/services/sales-services'
import type { IGetAllWithParamsProps } from '@/app/services/sales-services/interfaces'

export function useGetAllSalesWithParams({
  pageIndex,
  searchTerm,
}: IGetAllWithParamsProps) {
  const { data: sales, isLoading } = useQuery({
    queryKey: ['sales', pageIndex, searchTerm],
    queryFn: () =>
      SalesServices.getAllSalesWithParams({ pageIndex, searchTerm }),
    staleTime: 1000 * 60 * 60,
  })
  return { sales, isLoading }
}
