import { env } from '@/app/configs/env-config'

import type { TLoginForm } from '../components/login-form'

export async function handleLogin(data: TLoginForm) {
  try {
    console.log({ data })
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during login:', error)
    }
  }
}
