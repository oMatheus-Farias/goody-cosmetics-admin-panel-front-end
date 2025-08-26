import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { useDeleteProducts } from '@/app/hooks/products-hooks'
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
  productId: string
}

export function DeleteAlertDialog({ onOpenChange, productId }: TProps) {
  const queryClient = useQueryClient()
  const [openAlertDialog, setOpenAlertDialog] = useState(false)
  const { deleteProductsFn, isPending } = useDeleteProducts()

  function handleOpenChange(isOpen: boolean) {
    setOpenAlertDialog(isOpen)
    onOpenChange(isOpen)
  }
  async function handleDelete(productId: string) {
    try {
      await deleteProductsFn(productId)
      setOpenAlertDialog(false)
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Produto excluído com sucesso!')
    } catch (error) {
      if (env.VITE_NODE_ENV !== 'production') {
        console.error('Error deleting product:', error)
      }
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error(
          'Este produto não pode ser excluído, pois já foi registrado em uma venda.',
        )
        return
      }
      toast.error('Erro ao excluir produto. Tente novamente mais tarde.')
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
            onClick={() => handleDelete(productId)}
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
