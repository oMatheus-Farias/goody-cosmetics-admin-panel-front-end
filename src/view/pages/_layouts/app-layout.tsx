import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES_PATHS } from '@/app/constants/routes-paths'
import { useAuth } from '@/app/hooks/auth-hooks/use-auth'
import Footer from '@/view/components/footer'
import HeaderDesktop from '@/view/components/header-desktop'
import HeaderMobile from '@/view/components/header-mobile'
import SidebarMenu from '@/view/components/sidebar-menu'

export default function AppLayout() {
  const queryClient = useQueryClient()
  const { signedIn, me } = useAuth()

  useEffect(() => {
    if (signedIn && !me) {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    }
  }, [me, queryClient, signedIn])

  if (!signedIn) {
    return <Navigate to={ROUTES_PATHS.LOGIN} replace={true} />
  }

  return (
    <div className="flex h-screen flex-col">
      <HeaderMobile />
      <div className="flex h-full">
        <SidebarMenu />
        <div className="flex h-full w-full flex-col lg:ml-44">
          <HeaderDesktop />
          <main className="flex-1">
            <Outlet />
          </main>
          <div className="mt-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
