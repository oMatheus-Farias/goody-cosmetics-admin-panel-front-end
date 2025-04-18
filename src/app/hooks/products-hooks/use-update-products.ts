import { useMutation } from '@tanstack/react-query'

import { ProductsServices } from '@/app/services/products-services'

export function useUpdateProducts() {
  const { mutateAsync: updateProductsFn } = useMutation({
    mutationFn: ProductsServices.updateProducts,
  })
  return { updateProductsFn }
}
