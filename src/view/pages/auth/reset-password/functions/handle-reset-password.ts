import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import { ROUTES_PATHS } from '@/app/constants/routes-paths'
import type { IResetPasswordProps } from '@/app/services/auth-services/interfaces'

import type { TResetPasswordForm } from '../components/reset-password-form'

type TResetPasswordFormProps = {
  data: Omit<TResetPasswordForm, 'confirmPassword'>
  token: string
  resetPasswordFn: ({
    newPassword,
    token,
  }: IResetPasswordProps) => Promise<void>
  navigate: NavigateFunction
}

export async function handleResetPassword({
  data,
  token,
  resetPasswordFn,
  navigate,
}: TResetPasswordFormProps) {
  try {
    await resetPasswordFn({
      newPassword: data.newPassword,
      token,
    })
    toast.success('Senha redefinida com sucesso. Você já pode fazer login.')
    navigate(ROUTES_PATHS.LOGIN)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during reset password:', error)
    }
    return toast.error('Ocorrer um erro ao redefinir a senha, tente novamente.')
  }
}
