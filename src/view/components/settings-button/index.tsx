import { Settings, ShieldCheck } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

type TProps = {
  dropdownMenuOpen: boolean
  setDropdownMenuOpen: (open: boolean) => void
  setModalOpen: (open: boolean) => void
}

export default function SettingsButton({
  dropdownMenuOpen,
  setDropdownMenuOpen,
  setModalOpen,
}: TProps) {
  return (
    <DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1 rounded-[8px] bg-gray-100 px-2 py-2 text-gray-600 hover:cursor-pointer hover:bg-gray-200 lg:bg-transparent lg:shadow-none lg:hover:bg-gray-100">
          <Settings className="w-4" aria-label="Configurações" />
          <span className="text-sm font-normal lg:hidden">Configurações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 lg:w-5">
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
              setDropdownMenuOpen(false)
            }}
          >
            Atualizar senha
            <DropdownMenuShortcut>
              <ShieldCheck />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
