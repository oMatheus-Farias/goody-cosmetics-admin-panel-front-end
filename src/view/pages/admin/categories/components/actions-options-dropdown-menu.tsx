import { EllipsisVertical, Pencil } from 'lucide-react'
import { useState } from 'react'

import type { IGetCategoriesReturn } from '@/app/services/categories-services/interfaces'
import { Button } from '@/view/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu'

import { DeleteAlertDialog, UpdateCategoriesModal } from './'

type TProps = {
  category: IGetCategoriesReturn
}

export function ActionsOptionsDropdownMenu({ category }: TProps) {
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
              aria-label="Excluir"
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
            <DeleteAlertDialog
              onOpenChange={setOpen}
              categoryId={category.id}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateCategoriesModal
        open={openModal}
        onOpenChange={setOpenModal}
        category={category}
      />
    </>
  )
}
