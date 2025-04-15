import { useMutation } from '@tanstack/react-query'

import { CategoriesServices } from '@/app/services/categories-services'

export function useCreateCategories() {
  const { mutateAsync: createCategoriesFn } = useMutation({
    mutationFn: CategoriesServices.createCategories,
  })
  return { createCategoriesFn }
}
