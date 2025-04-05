import { useMutation } from '@tanstack/react-query'

import { AuthServices } from '@/app/services/auth-services'

export function useRefreshTokens() {
  const { mutateAsync: refreshTokensFn } = useMutation({
    mutationFn: AuthServices.refreshTokens,
  })
  return { refreshTokensFn }
}
