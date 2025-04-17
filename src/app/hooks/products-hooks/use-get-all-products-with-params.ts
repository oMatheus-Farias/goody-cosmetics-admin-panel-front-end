import { useQuery } from '@tanstack/react-query'

import type { IGetAllWithParamsProps } from '@/app/services/categories-services/interfaces'
import { ProductsServices } from '@/app/services/products-services'

export function useGetAllProductsWithParams({
  pageIndex,
  searchTerm,
}: IGetAllWithParamsProps) {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', pageIndex, searchTerm],
    queryFn: () =>
      ProductsServices.getAllProductsWithParams({ pageIndex, searchTerm }),
    staleTime: 1000 * 60 * 60,
  })
  return { products, isLoading }
}
