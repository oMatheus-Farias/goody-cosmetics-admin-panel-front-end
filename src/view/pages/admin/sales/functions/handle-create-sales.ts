import type { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import type { ICreateSalesProps } from '@/app/services/sales-services/interfaces'

import type { TCreateSalesForm } from '../components'

type TProps = {
  data: TCreateSalesForm
  queryClient: QueryClient
  onOpenChange: (open: boolean) => void
  createSalesFn: UseMutateAsyncFunction<void, Error, ICreateSalesProps, unknown>
}

export async function handleCreateSales({
  data,
  queryClient,
  onOpenChange,
  createSalesFn,
}: TProps) {
  try {
    const formattedDate = new Date(data.saleDate).toISOString()
    await createSalesFn({
      saleDate: formattedDate,
      items: data.items.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
    })
    await queryClient.invalidateQueries({ queryKey: ['sales'] })
    toast.success('Venda cadastrada com sucesso!')
    onOpenChange(false)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during create sale:', error)
    }
    toast.error(
      'Ocorreu um erro ao cadastrar a venda. Tente novamente mais tarde.',
    )
  }
}
