import { EllipsisVertical, Pencil } from 'lucide-react'
import { useState } from 'react'

import type { IGetSalesReturn } from '@/app/services/sales-services/interfaces'
import { Button } from '@/view/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu'

import { DeleteAlertDialog, UpdateSalesModal } from '.'

type TProps = {
  sale: IGetSalesReturn
}

export function SaleActionOptionsDropdownMenu({ sale }: TProps) {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

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
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="p-0"
          >
            <DeleteAlertDialog onOpenChange={setOpen} saleId={sale.id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateSalesModal
        open={openModal}
        onOpenChange={setOpenModal}
        sale={sale}
      />
    </>
  )
}
