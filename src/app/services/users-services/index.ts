import { httpClient } from '@/app/configs/http-client'

import type { IMeReturn, IUpdatePasswordProps } from './interfaces'

export class UsersServices {
  static async me() {
    const { data } = await httpClient.get<IMeReturn>('/api/users/me')
    return data
  }
  static async updatePassword({
    oldPassword,
    newPassword,
  }: IUpdatePasswordProps) {
    await httpClient.put('/api/users', {
      oldPassword,
      newPassword,
    })
  }
}
