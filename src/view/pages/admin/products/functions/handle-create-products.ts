import type { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query'
import type { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'

import type { TCreateProductsForm } from '../components'
type TForm = UseFormReturn<
  {
    categoryId: string
    name: string
    description: string
    oldPrice: number
    currentPrice: number
    stockQuantity: number
    image01: File
    image02: File
  },
  unknown,
  {
    categoryId: string
    name: string
    description: string
    oldPrice: number
    currentPrice: number
    stockQuantity: number
    image01: File
    image02: File
  }
>
type TProps = {
  data: TCreateProductsForm
  form: TForm
  queryClient: QueryClient
  setPreviewImage01: (image: string | null) => void
  setPreviewImage02: (image: string | null) => void
  createProductsFn: UseMutateAsyncFunction<void, Error, FormData, unknown>
}

export async function handleCreateProducts({
  data,
  form,
  queryClient,
  setPreviewImage01,
  setPreviewImage02,
  createProductsFn,
}: TProps) {
  try {
    const formData = new FormData()
    formData.append('categoryId', data.categoryId)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('oldPrice', String(data.oldPrice))
    formData.append('currentPrice', String(data.currentPrice))
    formData.append('stockQuantity', String(data.stockQuantity))
    formData.append('image01', data.image01)
    formData.append('image02', data.image02)

    await createProductsFn(formData)
    await queryClient.invalidateQueries({ queryKey: ['products'] })
    form.reset()
    setPreviewImage01(null)
    setPreviewImage02(null)
    toast.success('Produto cadastrado com sucesso!')
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during create product:', error)
    }
    toast.error(
      'Ocorreu um erro ao cadastrar o produto. Tente novamente mais tarde.',
    )
  }
}
