import { Pen } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import UpdatePasswordForm from './components/update-password-form'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdatePasswordModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 font-normal text-gray-700 sm:justify-start">
            <Pen className="w-4" />
            Atualizar senha
          </DialogTitle>
          <DialogDescription className="font-light">
            Altere sua senha abaixo e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <UpdatePasswordForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
