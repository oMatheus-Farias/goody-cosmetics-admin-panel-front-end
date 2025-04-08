import { Menu } from 'lucide-react'
import { useState } from 'react'

import { NAVIGATION_LINKS } from '@/app/constants/navigation-links'
import { useAuth } from '@/app/hooks/auth-hooks'

import LogoutButton from '../../log-out-button'
import NavLink from '../../nav-link'
import SettingsButton from '../../settings-button'
import { Button } from '../../ui/button'
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
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { handleSignOut, signOutPending } = useAuth()

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
        <SettingsButton
          dropdownMenuOpen={dropdownMenuOpen}
          setDropdownMenuOpen={setDropdownMenuOpen}
          setModalOpen={setModalOpen}
        />

        <LogoutButton
          handleSignOut={handleSignOut}
          signOutPending={signOutPending}
        />
      </SheetContent>

      <UpdatePasswordModal open={modalOpen} onOpenChange={setModalOpen} />
    </Sheet>
  )
}
