import { useQuery } from '@tanstack/react-query'

import { UsersServices } from '@/app/services/users-services'

export function useMe() {
  const { data: me, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: UsersServices.me,
  })
  return { me, isLoading }
}
