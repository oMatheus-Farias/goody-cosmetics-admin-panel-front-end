import { useMutation } from '@tanstack/react-query'

import { AuthServices } from '@/app/services/auth-services'

export function useResetPassword() {
  const { mutateAsync: resetPasswordFn } = useMutation({
    mutationFn: AuthServices.resetPassword,
  })
  return { resetPasswordFn }
}
