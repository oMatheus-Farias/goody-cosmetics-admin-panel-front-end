import { Pen } from 'lucide-react'

import type { IGetProductsReturn } from '@/app/services/products-services/interfaces'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/view/components/ui/dialog'

import { UpdateProductImage02Form } from './update-product-image-02-form'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: IGetProductsReturn
}

export function UpdateProductImage02Modal({
  open,
  onOpenChange,
  product,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[96%] overflow-auto sm:max-w-[425px] [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 font-normal text-gray-700 sm:justify-start">
            <Pen className="w-4" />
            Atualizar segunda imagem do produto
          </DialogTitle>
          <DialogDescription className="font-light">
            Atualize a segunda imagem do produto.
          </DialogDescription>
        </DialogHeader>
        <UpdateProductImage02Form
          product={product}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  )
}
