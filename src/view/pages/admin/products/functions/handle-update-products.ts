import type { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { UpdateError } from '@/app/errors/update-error'
import type { IGetProductsReturn } from '@/app/services/products-services/interfaces'
import type { IUpdateProps } from '@/app/services/products-services/interfaces/update-props'

import type { TUpdateProductsForm } from '../components'

type TProps = {
  data: TUpdateProductsForm
  product: IGetProductsReturn
  queryClient: QueryClient
  onOpenChange: (open: boolean) => void
  updateProductsFn: UseMutateAsyncFunction<void, Error, IUpdateProps, unknown>
}
type TUpdateInput = {
  categoryId?: string
  name?: string
  description?: string
  oldPrice?: number
  currentPrice?: number
  stockQuantity?: number
}

export async function handleUpdateProducts({
  data,
  product,
  queryClient,
  onOpenChange,
  updateProductsFn,
}: TProps) {
  try {
    const updateInput: TUpdateInput = {}

    if (data.categoryId !== product?.categories.id) {
      updateInput.categoryId = data.categoryId
    }
    if (data.name !== product?.name) {
      updateInput.name = data.name
    }
    if (data.description !== product?.description) {
      updateInput.description = data.description
    }
    if (data.oldPrice !== product?.oldPrice) {
      updateInput.oldPrice = data.oldPrice
    }
    if (data.currentPrice !== product?.currentPrice) {
      updateInput.currentPrice = data.currentPrice
    }
    if (data.stockQuantity !== product?.stockQuantity) {
      updateInput.stockQuantity = Number(data.stockQuantity)
    }
    if (Object.keys(updateInput).length === 0) {
      throw new UpdateError(
        'Nenhum campo foi alterado. Para atualizar, altere pelo menos um campo.',
      )
    }
    await updateProductsFn({
      productId: product?.id,
      data: updateInput,
    })
    await queryClient.invalidateQueries({ queryKey: ['products'] })
    toast.success('Produto atualizado com sucesso!')
    onOpenChange(false)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during update product:', error)
    }
    if (error instanceof UpdateError) {
      return toast.error(error.message)
    }
    toast.error(
      'Ocorreu um erro ao editar o produto. Tente novamente mais tarde.',
    )
  }
}
