import { httpClient } from '../../configs/http-client'
import type {
  IAuthenticatedProps,
  IResetPasswordProps,
  ITokensReturn,
} from './interfaces'

export class AuthServices {
  static async refreshTokens(refreshTokenId: string) {
    const { data } = await httpClient.post<ITokensReturn>(
      '/api/refresh-tokens',
      {
        refreshTokenId,
      },
    )
    return data
  }

  static async authenticated({ email, password }: IAuthenticatedProps) {
    const { data } = await httpClient.post<ITokensReturn>(
      '/api/sessions/authentication',
      {
        email,
        password,
      },
    )
    return data
  }

  static async signOut() {
    await httpClient.delete('/api/sessions/sign-out')
  }

  static async forgotPassword(email: string) {
    await httpClient.post('/api/users/forgot-password', {
      email,
    })
  }

  static async resetPassword({ newPassword, token }: IResetPasswordProps) {
    await httpClient.patch('/api/users/reset-password', {
      newPassword,
      token,
    })
  }
}
