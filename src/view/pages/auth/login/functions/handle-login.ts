import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import type { IAuthenticatedProps } from '@/app/services/auth-services/interfaces/auth-interfaces'

import type { TLoginForm } from '../components/login-form'

interface IHandleLoginProps {
  data: TLoginForm
  handleAuthenticated: ({
    email,
    password,
  }: IAuthenticatedProps) => Promise<void>
}

export async function handleLogin({
  data,
  handleAuthenticated,
}: IHandleLoginProps) {
  try {
    await handleAuthenticated(data)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during login:', error)
    }

    toast.error(
      'Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente.',
    )
  }
}
