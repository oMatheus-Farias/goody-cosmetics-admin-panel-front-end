import { DoorOpen, Menu, Settings, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

import { NAVIGATION_LINKS } from '@/app/constants/navigation-links'

import NavLink from '../../nav-link'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Separator } from '../../ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../ui/sheet'
import UpdatePasswordModal from '../../update-password-modal'

export default function NavMenuMobile() {
  const [dropdownMenuOpen, setdropdownMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="bg-gray-50 hover:cursor-pointer hover:bg-gray-100"
        >
          <Menu className="w-8 text-gray-600" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col bg-white px-4 pb-4">
        <SheetHeader className="mt-5">
          <SheetTitle className="text-goodycosmetics-primary-800 flex justify-center font-normal uppercase">
            Menu
          </SheetTitle>
          <SheetDescription className="text-center font-light text-gray-600">
            Goody Cosméticos, a sua loja de cosméticos online!
          </SheetDescription>
        </SheetHeader>
        <Separator className="bg-gray-200/80" />
        <div className="mt-3 flex flex-1 flex-col gap-4">
          <span className="text-[10px] font-normal text-gray-400 uppercase">
            Páginas
          </span>
          <nav className="-mt-2 flex w-full flex-1 flex-col gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {NAVIGATION_LINKS.map((link) => (
              <SheetClose asChild key={link.to}>
                <NavLink to={link.to}>
                  {link.icon}
                  <span className="text-base font-normal">{link.label}</span>
                </NavLink>
              </SheetClose>
            ))}
          </nav>
        </div>
        <DropdownMenu
          open={dropdownMenuOpen}
          onOpenChange={setdropdownMenuOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button className="flex w-full items-center gap-1 rounded-[8px] bg-gray-100 px-2 py-2 text-gray-600 hover:cursor-pointer hover:bg-gray-200">
              <Settings className="w-4" aria-label="Configurações" />
              <span className="text-sm font-normal">Configurações</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-goodycosmetics-primary-800 text-center">
              Configurações
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="font-light text-gray-700 hover:cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault()
                  setModalOpen(true)
                  setdropdownMenuOpen(false)
                }}
              >
                Atualizar minha senha
                <DropdownMenuShortcut>
                  <ShieldCheck />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="flex w-full items-center gap-1 rounded-[8px] bg-gray-100 px-2 py-2 text-gray-600 hover:cursor-pointer hover:bg-gray-200">
          <DoorOpen className="w-4" aria-label="Sair" />
          <span className="text-sm font-normal">Sair</span>
        </Button>
      </SheetContent>

      <UpdatePasswordModal open={modalOpen} onOpenChange={setModalOpen} />
    </Sheet>
  )
}
