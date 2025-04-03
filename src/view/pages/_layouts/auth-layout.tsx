import { Outlet } from 'react-router-dom'

import backgroundImage from '../../assets/background-image.png'

export default function AuthLayout() {
  return (
    <div
      className={`h-screen`}
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
