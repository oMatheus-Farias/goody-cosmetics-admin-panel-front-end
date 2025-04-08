import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = LinkProps

export default function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  const setCurrentData = () => {
    if (pathname === props.to) {
      return true
    }
    return false
  }

  return (
    <Link
      data-current={setCurrentData()}
      className="data-[current=true]:text-goodycosmetics-primary-800 lg:hover:data-[current=true]:text-goodycosmetics-primary-800 lg:text-goodycosmetics-primary-300 lg:hover:text-goodycosmetics-primary-400 flex items-center gap-2.5 text-sm font-normal text-gray-300 transition-all duration-100 ease-linear hover:text-gray-400 lg:text-base"
      {...props}
    />
  )
}
