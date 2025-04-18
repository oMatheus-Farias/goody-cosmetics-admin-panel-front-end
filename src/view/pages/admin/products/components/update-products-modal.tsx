import { Pen } from 'lucide-react'

import type { IGetProductsReturn } from '@/app/services/products-services/interfaces'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/view/components/ui/dialog'

import { UpdateProductsForm } from './update-products-form'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: IGetProductsReturn
}

export function UpdateProductsModal({ open, onOpenChange, product }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[96%] overflow-auto sm:max-w-[425px] [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 font-normal text-gray-700 sm:justify-start">
            <Pen className="w-4" />
            Atualizar produto
          </DialogTitle>
          <DialogDescription className="font-light">
            Atualize o produto selecionado.
          </DialogDescription>
        </DialogHeader>
        <UpdateProductsForm product={product} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
