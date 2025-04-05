import { env } from '@/app/configs/env-config'

import type { TResetPasswordForm } from '../components/reset-password-form'

type TResetPasswordFormProps = {
  data: Omit<TResetPasswordForm, 'confirmPassword'>
  token: string
}

export async function handleResetPassword({
  data,
  token,
}: TResetPasswordFormProps) {
  try {
    console.log({
      data,
      token,
    })
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during reset password:', error)
    }
  }
}
