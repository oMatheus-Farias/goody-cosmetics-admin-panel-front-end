import { useMutation } from '@tanstack/react-query'

import { ProductsServices } from '@/app/services/products-services'

export function useDeleteProducts() {
  const { mutateAsync: deleteProductsFn, isPending } = useMutation({
    mutationFn: ProductsServices.deleteProducts,
  })
  return { deleteProductsFn, isPending }
}
