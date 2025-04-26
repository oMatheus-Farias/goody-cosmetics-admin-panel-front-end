import { Link } from 'react-router-dom'

import { ROUTES_PATHS } from '@/app/constants/routes-paths'

import logoGoogyCosmetics from '../../assets/logo.svg'
import NavMenuMobile from './components/nav-menu-mobile'

export default function HeaderMobile() {
  return (
    <header
      data-aos="fade-down"
      className="sticky top-0 z-10 flex h-14 min-h-14 w-full items-center justify-between gap-3 border-b border-gray-300 bg-white/80 px-4 backdrop-blur-xs lg:hidden"
    >
      <Link to={ROUTES_PATHS.SALES} className="w-16">
        <img
          src={logoGoogyCosmetics}
          alt="Goody Cosméticos"
          className="w-full"
        />
      </Link>

      <NavMenuMobile />
    </header>
  )
}
