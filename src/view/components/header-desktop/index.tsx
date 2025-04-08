import { useState } from 'react'

import { useAuth } from '@/app/hooks/auth-hooks'

import LogoutButton from '../log-out-button'
import SettingsButton from '../settings-button'
import UpdatePasswordModal from '../update-password-modal'

export default function HeaderDesktop() {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { handleSignOut, signOutPending } = useAuth()

  return (
    <header className="sticky top-0 z-10 hidden max-h-[49.5px] min-h-[49.5px] w-full items-center justify-between bg-white/80 px-5 backdrop-blur-xs lg:flex">
      <h1 className="text-base font-light text-gray-700">
        {/* TODO: Boas-vindas com o nome do usuário */}
        ❤️ Olá, Thaina Godoy!
      </h1>

      <div className="flex items-center gap-2">
        <SettingsButton
          dropdownMenuOpen={dropdownMenuOpen}
          setDropdownMenuOpen={setDropdownMenuOpen}
          setModalOpen={setModalOpen}
        />
        <UpdatePasswordModal open={modalOpen} onOpenChange={setModalOpen} />
        <LogoutButton
          handleSignOut={handleSignOut}
          signOutPending={signOutPending}
        />
      </div>
    </header>
  )
}
