import type { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import type { IUpdateProductImageProps } from '@/app/services/products-services/interfaces'

import type { TUpdateProductImageForm } from '../components'

type TProps = {
  data: TUpdateProductImageForm
  imageId: string
  queryClient: QueryClient
  onOpenChange: (open: boolean) => void
  updateProductImageFn: UseMutateAsyncFunction<
    void,
    Error,
    IUpdateProductImageProps,
    unknown
  >
}

export async function handleUpdateProductImage({
  data,
  imageId,
  queryClient,
  onOpenChange,
  updateProductImageFn,
}: TProps) {
  try {
    const formData = new FormData()
    formData.append('productImage', data.image)

    await updateProductImageFn({
      imageId,
      data: formData,
    })
    await queryClient.invalidateQueries({ queryKey: ['products'] })
    toast.success('Imagem do produto atualizada com sucesso!')
    onOpenChange(false)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during update product image:', error)
    }
    toast.error(
      'Ocorreu um erro ao atualizar a imagem do produto. Tente novamente mais tarde.',
    )
  }
}
