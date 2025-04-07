import { useMutation } from '@tanstack/react-query'

import { UsersServices } from '@/app/services/users-services'

export function useUpdatePassword() {
  const { mutateAsync: updatePasswordFn } = useMutation({
    mutationFn: UsersServices.updatePassword,
  })
  return { updatePasswordFn }
}
