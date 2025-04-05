import { env } from '@/app/configs/env-config'

interface IForgotPasswordProps {
  email: string
}

export async function handleForgotPassword(data: IForgotPasswordProps) {
  try {
    console.log('Forgot password data:', { data })
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during forgot password:', error)
    }
  }
}
