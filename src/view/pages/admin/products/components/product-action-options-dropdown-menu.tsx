import { EllipsisVertical, Image, Pencil } from 'lucide-react'
import { useState } from 'react'

import type { IGetProductsReturn } from '@/app/services/products-services/interfaces'
import { Button } from '@/view/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu'

import {
  DeleteAlertDialog,
  UpdateProductImage01Modal,
  UpdateProductImage02Modal,
  UpdateProductsModal,
} from './'

type TProps = {
  product: IGetProductsReturn
}

export function ProductActionOptionsDropdownMenu({ product }: TProps) {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModalProductImage01, setOpenModalProductImage01] = useState(false)
  const [openModalProductImage02, setOpenModalProductImage02] = useState(false)

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Ações"
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="hover:cursor-pointer hover:bg-gray-200"
          >
            <EllipsisVertical aria-label="Ações" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-1">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Editar"
              onClick={() => setOpenModal(true)}
              className="flex w-full justify-start px-2 hover:cursor-pointer"
            >
              <Pencil aria-label="Editar" />
              Editar
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Editar imagens"
              onClick={() => setOpenModalProductImage01(true)}
              className="flex w-full justify-start px-2 hover:cursor-pointer"
            >
              <Image aria-label="Editar" />
              Atualizar 1ª imagem
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Editar imagens"
              onClick={() => setOpenModalProductImage02(true)}
              className="flex w-full justify-start px-2 hover:cursor-pointer"
            >
              <Image aria-label="Editar" />
              Atualizar 2ª imagem
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="p-0"
          >
            <DeleteAlertDialog onOpenChange={setOpen} productId={product.id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateProductsModal
        open={openModal}
        onOpenChange={setOpenModal}
        product={product}
      />
      <UpdateProductImage01Modal
        open={openModalProductImage01}
        onOpenChange={setOpenModalProductImage01}
        product={product}
      />
      <UpdateProductImage02Modal
        open={openModalProductImage02}
        onOpenChange={setOpenModalProductImage02}
        product={product}
      />
    </>
  )
}
