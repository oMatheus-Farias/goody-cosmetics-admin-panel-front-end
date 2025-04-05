import type { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'

interface IForgotPasswordProps {
  email: string
  forgotPasswordFn: (email: string) => Promise<void>
  form: UseFormReturn<
    {
      email: string
    },
    unknown,
    {
      email: string
    }
  >
}

export async function handleForgotPassword({
  email,
  forgotPasswordFn,
  form,
}: IForgotPasswordProps) {
  try {
    await forgotPasswordFn(email)
    form.reset()
    toast.success(
      'E-mail de recuperação de senha enviado com sucesso, verifique sua caixa de entrada.',
    )
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during forgot password:', error)
    }

    return toast.error(
      'Não foi possível enviar o e-mail de recuperação de senha, tente novamente mais tarde.',
    )
  }
}
