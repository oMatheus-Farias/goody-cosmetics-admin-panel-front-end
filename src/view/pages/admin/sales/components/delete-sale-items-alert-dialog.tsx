import { useQueryClient } from '@tanstack/react-query'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { UseFieldArrayRemove } from 'react-hook-form'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { useDeleteSaleItems } from '@/app/hooks/sales-hooks'
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

import type { IFieldSalesProps } from '../interfaces'

type TProps = {
  saleItemId: string
  fields: IFieldSalesProps
  remove: UseFieldArrayRemove
}

export function DeleteSaleItemsAlertDialog({
  saleItemId,
  fields,
  remove,
}: TProps) {
  const queryClient = useQueryClient()
  const [openAlertDialog, setOpenAlertDialog] = useState(false)
  const { deleteSaleItemsFn, isPending } = useDeleteSaleItems()

  async function handleDelete(saleItemId: string) {
    try {
      await deleteSaleItemsFn(saleItemId)
      const indexToRemove = fields.findIndex(
        (field) => field.saleItemId === saleItemId,
      )
      if (indexToRemove !== -1) {
        remove(indexToRemove)
      }
      setOpenAlertDialog(false)
      queryClient.invalidateQueries({ queryKey: ['sales'] })
      toast.success('Item excluído com sucesso!')
    } catch (error) {
      if (env.VITE_NODE_ENV !== 'production') {
        console.error('Error deleting sale item:', error)
      }
      toast.error('Erro ao excluir item da venda. Tente novamente mais tarde.')
    }
  }

  return (
    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="Excluir"
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation()
            setOpenAlertDialog(true)
          }}
          className="flex w-fit items-center gap-1 rounded-full border border-rose-500 px-3 py-0.5 text-xs font-medium text-rose-400 transition-all duration-150 ease-linear hover:cursor-pointer hover:bg-rose-50 disabled:border-gray-300 disabled:text-gray-300 disabled:hover:cursor-not-allowed disabled:hover:bg-transparent"
        >
          {isPending ? (
            <LoaderCircle className="w-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5" />
          )}
          Excluir item
        </button>
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
            onClick={() => handleDelete(saleItemId)}
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
