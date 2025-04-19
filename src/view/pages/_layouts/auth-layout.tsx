import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES_PATHS } from '@/app/constants/routes-paths'
import { useAuth } from '@/app/hooks/auth-hooks/use-auth'

import backgroundImage from '../../assets/background-image.png'

export default function AuthLayout() {
  const { signedIn } = useAuth()

  if (signedIn) {
    return <Navigate to={ROUTES_PATHS.SALES} replace={true} />
  }

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Outlet />
    </div>
  )
}
