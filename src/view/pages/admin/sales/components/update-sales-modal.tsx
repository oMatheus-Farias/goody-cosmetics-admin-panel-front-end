import { Pen } from 'lucide-react'

import type { IGetSalesReturn } from '@/app/services/sales-services/interfaces'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/view/components/ui/dialog'

import { UpdateSalesForm } from '.'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sale: IGetSalesReturn
}

export function UpdateSalesModal({ open, onOpenChange, sale }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[96%] overflow-auto sm:max-w-[425px] [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 font-normal text-gray-700 sm:justify-start">
            <Pen className="w-4" />
            Atualizar venda
          </DialogTitle>
          <DialogDescription className="font-light">
            Atualize os dados da venda.
          </DialogDescription>
        </DialogHeader>
        <UpdateSalesForm sale={sale} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
