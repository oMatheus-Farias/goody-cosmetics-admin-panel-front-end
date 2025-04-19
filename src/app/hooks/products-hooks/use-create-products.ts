import { useMutation } from '@tanstack/react-query'

import { ProductsServices } from '@/app/services/products-services'

export function useCreateProducts() {
  const { mutateAsync: createProductsFn } = useMutation({
    mutationFn: ProductsServices.createProducts,
  })
  return { createProductsFn }
}
