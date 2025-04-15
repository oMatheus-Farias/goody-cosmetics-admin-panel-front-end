import { Trash2 } from 'lucide-react'
import { useState } from 'react'

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
}

export function DeleteAlertDialog({ onOpenChange }: TProps) {
  const [openAlertDialog, setOpenAlertDialog] = useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setOpenAlertDialog(isOpen)
    onOpenChange(isOpen)
  }

  return (
    <AlertDialog open={openAlertDialog} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Excluir"
          onClick={(e) => {
            e.stopPropagation()
            setOpenAlertDialog(true)
          }}
          className="flex w-full justify-start px-2 hover:cursor-pointer"
        >
          <Trash2 aria-label="Excluir" />
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
            onClick={() => {
              setOpenAlertDialog(false)
              onOpenChange(false)
            }}
            className="bg-goodycosmetics-primary-500 hover:bg-goodycosmetics-primary-600 hover:cursor-pointer"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
