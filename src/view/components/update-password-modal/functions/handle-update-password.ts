import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { env } from '@/app/configs/env-config'
import type { IUpdatePasswordProps } from '@/app/services/users-services/interfaces'

import type { TUpdatePasswordForm } from '../components/update-password-form'

type TProps = {
  data: Omit<TUpdatePasswordForm, 'confirmPassword'>
  onOpenChange: (open: boolean) => void
  updatePasswordFn: ({
    oldPassword,
    newPassword,
  }: IUpdatePasswordProps) => Promise<void>
}

export async function handleUpdatePassword({
  data,
  onOpenChange,
  updatePasswordFn,
}: TProps) {
  try {
    await updatePasswordFn({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
    toast.success('Senha atualizada com sucesso!')
    onOpenChange(false)
  } catch (error) {
    if (env.VITE_NODE_ENV !== 'production') {
      console.error('Error during update password:', error)
    }
    if (error instanceof AxiosError && error.status === 409) {
      return toast.error('Senha atual incorreta. Verifique e tente novamente.')
    }
    toast.error(
      'Ocorreu um erro ao atualizar a senha. Tente novamente mais tarde.',
    )
  }
}
