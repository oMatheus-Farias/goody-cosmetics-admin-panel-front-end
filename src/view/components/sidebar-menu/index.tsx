import { Link } from 'react-router-dom'

import { env } from '@/app/configs/env-config'
import { NAVIGATION_LINKS } from '@/app/constants/navigation-links'
import { ROUTES_PATHS } from '@/app/constants/routes-paths'

import catalogThumbnail from '../../assets/catalog-thumbnail.jpg'
import logoGoogyCosmetics from '../../assets/logo.svg'
import NavLink from '../nav-link'

export default function SidebarMenu() {
  return (
    <aside
      data-aos="fade-right"
      className="bg-goodycosmetics-primary-100 fixed z-10 hidden h-full w-44 flex-col py-2 lg:flex"
    >
      <div className="border-goodycosmetics-secondary-500 flex w-full items-center justify-center border-b pb-2">
        <Link to={ROUTES_PATHS.SALES} className="w-16">
          <img
            src={logoGoogyCosmetics}
            alt="Goody Cosméticos"
            className="w-full"
          />
        </Link>
      </div>
      <nav className="mt-7 flex w-full flex-1 flex-col gap-4 overflow-y-auto px-4 [&::-webkit-scrollbar]:hidden">
        <span className="text-goodycosmetics-primary-300 text-xs font-bold uppercase">
          Páginas
        </span>
        {NAVIGATION_LINKS.map((link) => (
          <NavLink to={link.to} key={link.to}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <Link
        to={env.VITE_CATALOG_URL}
        className="mx-auto max-w-40 min-w-40 overflow-hidden rounded-2xl"
      >
        <img
          src={catalogThumbnail}
          alt="Catálogo"
          className="rounded-2xl bg-cover bg-center transition-all duration-200 ease-linear hover:scale-[0.96]"
        />
      </Link>
    </aside>
  )
}
