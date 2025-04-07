import { httpClient } from '@/app/configs/http-client'

import type { IUpdatePasswordProps } from './interfaces'

export class UsersServices {
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
