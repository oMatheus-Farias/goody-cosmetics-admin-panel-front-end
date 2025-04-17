import type { QueryClient, UseMutateAsyncFunction } from '@tanstack/react-query'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { UpdateError } from '@/app/errors/update-error'
import type {
  IGetCategoriesReturn,
  IUpdateProps,
} from '@/app/services/categories-services/interfaces'

import type { TUpdateCategoriesForm } from '../components/update-categories-form'

type TProps = {
  data: TUpdateCategoriesForm
  category: IGetCategoriesReturn
  queryClient: QueryClient
  onOpenChange: (open: boolean) => void
  updateCategoriesFn: UseMutateAsyncFunction<void, Error, IUpdateProps, unknown>
}

type TUpdateInput = {
  name?: string
}

export async function handleUpdateCategories({
  data,
  category,
  queryClient,
  onOpenChange,
  updateCategoriesFn,
}: TProps) {
  try {
    const updateInput: TUpdateInput = {}

    if (data.name !== category?.name) {
      updateInput.name = data.name as string
    }
    if (Object.keys(updateInput).length === 0) {
      throw new UpdateError(
        'Nenhum campo foi alterado. Para atualizar, altere pelo menos um campo.',
      )
    }
    await updateCategoriesFn({
      categoryId: category?.id,
      name: updateInput.name,
    })
    await queryClient.invalidateQueries({ queryKey: ['categories'] })
    toast.success('Categoria atualizada com sucesso!')
    onOpenChange(false)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during update category:', error)
    }
    if (error instanceof UpdateError) {
      return toast.error(error.message)
    }
    toast.error(
      'Ocorreu um erro ao criar a categoria. Tente novamente mais tarde.',
    )
  }
}
