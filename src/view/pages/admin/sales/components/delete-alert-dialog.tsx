import { useQueryClient } from '@tanstack/react-query'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { useDeleteSales } from '@/app/hooks/sales'
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
  saleId: string
}

export function DeleteAlertDialog({ onOpenChange, saleId }: TProps) {
  const queryClient = useQueryClient()
  const [openAlertDialog, setOpenAlertDialog] = useState(false)
  const { deleteSalesFn, isPending } = useDeleteSales()

  function handleOpenChange(isOpen: boolean) {
    setOpenAlertDialog(isOpen)
    onOpenChange(isOpen)
  }
  async function handleDelete(saleId: string) {
    try {
      await deleteSalesFn(saleId)
      setOpenAlertDialog(false)
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ['sales'] })
      toast.success('Venda excluída com sucesso!')
    } catch (error) {
      if (env.VITE_NODE_ENV !== 'production') {
        console.error('Error deleting sale:', error)
      }
      toast.error('Erro ao excluir venda. Tente novamente mais tarde.')
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
            onClick={() => handleDelete(saleId)}
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
