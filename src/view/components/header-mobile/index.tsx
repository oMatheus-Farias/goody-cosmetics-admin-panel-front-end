import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { NAVIGATION_LINKS } from '@/app/constants/navigation-links'

import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

export default function HeaderMobile() {
  return (
    <header className="flex h-14 w-full items-center gap-3 border-b border-gray-500 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="sm"
            className="bg-gray-50 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-800"
          >
            <Menu className="w-8 cursor-pointer text-gray-600 dark:text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-gray-500">
          <SheetHeader className="mt-5">
            <SheetTitle className="flex justify-center">title</SheetTitle>
            <SheetDescription>description</SheetDescription>
          </SheetHeader>
          <nav className="mt-14 flex w-full flex-1 flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {NAVIGATION_LINKS.map((link) => (
              <SheetClose asChild key={link.to}>
                <NavLink to={link.to}>
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              </SheetClose>
            ))}
          </nav>
          LogoutButton
        </SheetContent>
      </Sheet>
    </header>
  )
}
