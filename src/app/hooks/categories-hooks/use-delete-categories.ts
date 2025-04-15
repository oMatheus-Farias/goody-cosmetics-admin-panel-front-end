import { useMutation } from '@tanstack/react-query'

import { CategoriesServices } from '@/app/services/categories-services'

export function useDeleteCategories() {
  const { mutateAsync: deleteCategoriesFn, isPending } = useMutation({
    mutationFn: CategoriesServices.deleteCategories,
  })
  return { deleteCategoriesFn, isPending }
}
