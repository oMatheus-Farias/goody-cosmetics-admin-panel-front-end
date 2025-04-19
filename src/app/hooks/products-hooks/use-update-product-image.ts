import { useMutation } from '@tanstack/react-query'

import { ProductsServices } from '@/app/services/products-services'

export function useUpdateProductImage() {
  const { mutateAsync: updateProductImageFn } = useMutation({
    mutationFn: ProductsServices.updateProductImage,
  })
  return { updateProductImageFn }
}
