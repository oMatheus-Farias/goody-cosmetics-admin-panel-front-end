import { Navigate } from 'react-router-dom'

import { ROUTES_PATHS } from '@/app/constants/routes-paths'
import { useHasToken } from '@/app/hooks/use-has-token'

import AuthContainer from '../components/auth-container'
import AuthHeader from '../components/auth-header'
import ResetPasswordForm from './components/reset-password-form'

export default function ResetPasswordPage() {
  const { token, isLoading } = useHasToken()

  if (!isLoading && !token) {
    return <Navigate to={ROUTES_PATHS.LOGIN} replace />
  }

  return (
    <AuthContainer>
      <div className="mt-10">
        <AuthHeader title="Trocar senha" description="Digite sua nova senha." />
      </div>
      <ResetPasswordForm token={token!} />
    </AuthContainer>
  )
}
