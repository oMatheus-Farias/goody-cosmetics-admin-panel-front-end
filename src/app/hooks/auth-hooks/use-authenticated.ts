import { useMutation } from '@tanstack/react-query'

import { AuthServices } from '@/app/services/auth-services'

export function useAuthenticated() {
  const { mutateAsync: authenticatedFn } = useMutation({
    mutationFn: AuthServices.authenticated,
  })
  return { authenticatedFn }
}
