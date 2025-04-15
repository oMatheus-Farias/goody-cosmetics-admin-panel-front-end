import type { QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'

import type { TCreateCategoriesForm } from '../components'

type TProps = {
  data: TCreateCategoriesForm
  queryClient: QueryClient
  onOpenChange: (open: boolean) => void
  createCategoriesFn: (name: string) => Promise<void>
}

export async function handleCreateCategories({
  data,
  queryClient,
  onOpenChange,
  createCategoriesFn,
}: TProps) {
  try {
    await createCategoriesFn(data.name)
    await queryClient.invalidateQueries({ queryKey: ['categories'] })
    toast.success('Categoria criada com sucesso!')
    onOpenChange(false)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during create category:', error)
    }
    toast.error(
      'Ocorreu um erro ao criar a categoria. Tente novamente mais tarde.',
    )
  }
}
