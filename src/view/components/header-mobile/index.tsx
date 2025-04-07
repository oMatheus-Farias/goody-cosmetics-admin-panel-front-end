import logoGoogyCosmetics from '../../assets/logo.svg'
import NavMenuMobile from './components/nav-menu-mobile'

export default function HeaderMobile() {
  return (
    <header className="flex h-14 w-full items-center justify-between gap-3 border-b border-gray-300 bg-white px-4 lg:hidden">
      <img src={logoGoogyCosmetics} alt="Goody Cosméticos" className="w-16" />

      <NavMenuMobile />
    </header>
  )
}
