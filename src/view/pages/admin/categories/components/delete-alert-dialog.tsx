import { useQueryClient } from '@tanstack/react-query'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { useDeleteCategories } from '@/app/hooks/categories-hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/view/components/ui/alert-dialog'
import { Button } from '@/view/components/ui/button'

type TProps = {
  onOpenChange: (isOpen: boolean) => void
  categoryId: string
}

export function DeleteAlertDialog({ onOpenChange, categoryId }: TProps) {
  const queryClient = useQueryClient()
  const [openAlertDialog, setOpenAlertDialog] = useState(false)
  const { deleteCategoriesFn, isPending } = useDeleteCategories()

  function handleOpenChange(isOpen: boolean) {
    setOpenAlertDialog(isOpen)
    onOpenChange(isOpen)
  }
  async function handleDelete(categoryId: string) {
    try {
      await deleteCategoriesFn(categoryId)
      setOpenAlertDialog(false)
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoria excluída com sucesso!')
    } catch (error) {
      if (env.VITE_NODE_ENV !== 'production') {
        console.error('Error deleting category:', error)
      }
      toast.error('Erro ao excluir categoria. Tente novamente mais tarde.')
    }
  }

  return (
    <AlertDialog open={openAlertDialog} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Excluir"
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation()
            setOpenAlertDialog(true)
          }}
          className="flex w-full justify-start px-2 hover:cursor-pointer"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Deseja mesmo excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente esse
            registro.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpenAlertDialog(false)}
            className="hover:cursor-pointer"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            type="button"
            aria-label="Excluir"
            onClick={() => handleDelete(categoryId)}
            className="bg-goodycosmetics-primary-500 hover:bg-goodycosmetics-primary-600 flex items-center gap-1 hover:cursor-pointer"
          >
            {isPending && <LoaderCircle className="animate-spin" />}
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
