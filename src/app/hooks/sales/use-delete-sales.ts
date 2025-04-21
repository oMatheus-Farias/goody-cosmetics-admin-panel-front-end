import { useMutation } from '@tanstack/react-query'

import { SalesServices } from '@/app/services/sales-services'

export function useDeleteSales() {
  const { mutateAsync: deleteSalesFn, isPending } = useMutation({
    mutationFn: SalesServices.deleteSales,
  })
  return { deleteSalesFn, isPending }
}
