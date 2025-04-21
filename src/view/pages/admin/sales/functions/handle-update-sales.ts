import type { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { UpdateError } from '@/app/errors/update-error'
import type {
  IGetSalesReturn,
  IUpdateSalesProps,
} from '@/app/services/sales-services/interfaces'

import type { TUpdateSalesForm } from '../components'

type TProps = {
  data: TUpdateSalesForm
  sale: IGetSalesReturn
  queryClient: QueryClient
  onOpenChange: (open: boolean) => void
  updateSalesFn: UseMutateAsyncFunction<void, Error, IUpdateSalesProps, unknown>
}

export async function handleUpdateSales({
  data,
  sale,
  queryClient,
  onOpenChange,
  updateSalesFn,
}: TProps) {
  try {
    const updatedItems = data.items.filter((item, index) => {
      const originalItem = sale.items[index]
      return (
        item.quantity !== originalItem.quantity ||
        item.unitPrice !== originalItem.unitPrice
      )
    })
    const formattedDate = new Date(data.saleDate).toISOString()
    const saleDateIsChanged = formattedDate !== sale.saleDate
    if (updatedItems.length === 0 && !saleDateIsChanged) {
      throw new UpdateError(
        'Nenhum campo foi alterado. Para atualizar, altere pelo menos um campo.',
      )
    }

    await updateSalesFn({
      saleId: sale.id,
      saleDate: formattedDate,
      items: updatedItems.map((item) => ({
        saleItemId: item.saleItemId,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
    })
    await queryClient.invalidateQueries({ queryKey: ['sales'] })
    toast.success('Venda atualizada com sucesso!')
    onOpenChange(false)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during update sale:', error)
    }
    if (error instanceof UpdateError) {
      return toast.error(error.message)
    }
    toast.error(
      'Ocorreu um erro ao editar a venda. Tente novamente mais tarde.',
    )
  }
}
