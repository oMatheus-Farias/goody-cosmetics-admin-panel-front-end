import { useMutation } from '@tanstack/react-query'

import { SalesServices } from '@/app/services/sales-services'

export function useDeleteSaleItems() {
  const { mutateAsync: deleteSaleItemsFn, isPending } = useMutation({
    mutationFn: SalesServices.deleteSaleItems,
  })
  return { deleteSaleItemsFn, isPending }
}
