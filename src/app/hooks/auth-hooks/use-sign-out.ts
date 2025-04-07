import { useMutation } from '@tanstack/react-query'

import { AuthServices } from '@/app/services/auth-services'

export function useSignOut() {
  const { mutateAsync: signOutFn, isPending } = useMutation({
    mutationFn: AuthServices.signOut,
  })
  return { signOutFn, isPending }
}
