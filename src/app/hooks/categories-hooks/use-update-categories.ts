import { useMutation } from '@tanstack/react-query'

import { CategoriesServices } from '@/app/services/categories-services'

export function useUpdateCategories() {
  const { mutateAsync: updateCategoriesFn } = useMutation({
    mutationFn: CategoriesServices.updateCategories,
  })
  return { updateCategoriesFn }
}
