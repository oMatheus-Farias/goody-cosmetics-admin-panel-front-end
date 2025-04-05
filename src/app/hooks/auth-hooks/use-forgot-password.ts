import { useMutation } from '@tanstack/react-query'

import { AuthServices } from '@/app/services/auth-services'

export function useForgotPassword() {
  const { mutateAsync: forgotPasswordFn } = useMutation({
    mutationFn: AuthServices.forgotPassword,
  })

  return { forgotPasswordFn }
}
