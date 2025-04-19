import { useQuery } from '@tanstack/react-query'

import { CategoriesServices } from '@/app/services/categories-services'

export function useGetAllCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoriesServices.getAllCategories,
  })
  return { categories, isLoading }
}
