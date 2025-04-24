import { useQuery } from '@tanstack/react-query'

import { ProductsServices } from '@/app/services/products-services'

export function useGetAllProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ProductsServices.getAllProducts,
  })
  return { products, isLoading }
}
