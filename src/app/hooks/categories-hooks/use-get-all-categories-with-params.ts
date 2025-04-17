import { useQuery } from '@tanstack/react-query'

import { CategoriesServices } from '@/app/services/categories-services'
import type { IGetAllWithParamsProps } from '@/app/services/categories-services/interfaces'

export function useGetAllCategoriesWithParams({
  pageIndex,
  searchTerm,
}: IGetAllWithParamsProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories', pageIndex, searchTerm],
    queryFn: () =>
      CategoriesServices.getAllCategoriesWithParams({ pageIndex, searchTerm }),
    staleTime: 1000 * 60 * 60,
  })
  return { categories, isLoading }
}
