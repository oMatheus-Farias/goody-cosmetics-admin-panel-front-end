import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES_PATHS } from './app/constants/routes-paths'

const AppLayout = lazy(() => import('./view/pages/_layouts/app-layout'))
const AuthLayout = lazy(() => import('./view/pages/_layouts/auth-layout'))

const LoginPage = lazy(() => import('./view/pages/auth/login'))

const RegistrationsPage = lazy(() => import('./view/pages/admin/registrations'))

export default function AppRoutes() {
  return (
    <Suspense fallback={'carregando...'}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES_PATHS.LOGIN} element={<LoginPage />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route
            path={ROUTES_PATHS.REGISTRATIONS}
            element={<RegistrationsPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  )
}
