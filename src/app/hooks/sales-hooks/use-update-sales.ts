import { useMutation } from '@tanstack/react-query'

import { SalesServices } from '@/app/services/sales-services'

export function useUpdateSales() {
  const { mutateAsync: updateSalesFn } = useMutation({
    mutationFn: SalesServices.updateSales,
  })
  return { updateSalesFn }
}
