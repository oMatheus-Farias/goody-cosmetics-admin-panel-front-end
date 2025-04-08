import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES_PATHS } from '@/app/constants/routes-paths'
import { useAuth } from '@/app/hooks/auth-hooks/use-auth'
import HeaderMobile from '@/view/components/header-mobile'
import SidebarMenu from '@/view/components/sidebar-menu'

export default function AppLayout() {
  const { signedIn } = useAuth()

  if (!signedIn) {
    return <Navigate to={ROUTES_PATHS.LOGIN} replace={true} />
  }

  return (
    <div className="flex h-screen flex-col">
      <HeaderMobile />
      <div className="flex h-full">
        <SidebarMenu />
        <div className="flex h-full w-full flex-col px-2 lg:ml-48">
          header desktop
          <main className="flex-1">
            <Outlet />
          </main>
          <div className="mt-8">footer</div>
        </div>
      </div>
    </div>
  )
}
