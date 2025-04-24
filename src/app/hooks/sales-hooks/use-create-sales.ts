import { useMutation } from '@tanstack/react-query'

import { SalesServices } from '@/app/services/sales-services'

export function useCreateSales() {
  const { mutateAsync: createSalesFn } = useMutation({
    mutationFn: SalesServices.createSales,
  })
  return { createSalesFn }
}
