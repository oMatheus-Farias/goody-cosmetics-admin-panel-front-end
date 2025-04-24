import { Plus } from 'lucide-react'

import { Button } from '@/view/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/view/components/ui/dialog'

import { CreateSalesForm } from '.'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSalesModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          aria-label="Cadastrar"
          className="bg-goodycosmetics-primary-400 hover:bg-goodycosmetics-primary-500 flex w-full items-center gap-1 transition-colors duration-150 ease-linear hover:cursor-pointer md:w-28"
        >
          <Plus />
          Cadastrar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[96%] overflow-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-1 font-normal text-gray-700 sm:justify-start">
            <Plus className="w-4" />
            Cadastrar venda
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar uma nova venda.
          </DialogDescription>
        </DialogHeader>
        <CreateSalesForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
