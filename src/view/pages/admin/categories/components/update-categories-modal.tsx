import { Pen } from 'lucide-react'

import type { IGetCategoriesReturn } from '@/app/services/categories-services/interfaces'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/view/components/ui/dialog'

import { UpdateCategoriesForm } from './update-categories-form'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: IGetCategoriesReturn
}

export function UpdateCategoriesModal({ open, onOpenChange, category }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 font-normal text-gray-700 sm:justify-start">
            <Pen className="w-4" />
            Atualizar categoria
          </DialogTitle>
          <DialogDescription className="font-light">
            Atualize a categoria selecionada.
          </DialogDescription>
        </DialogHeader>
        <UpdateCategoriesForm category={category} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
