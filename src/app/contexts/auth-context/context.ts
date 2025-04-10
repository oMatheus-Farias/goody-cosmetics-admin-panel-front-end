import { createContext } from 'react'

import type { IAuthenticatedProps } from '@/app/services/auth-services/interfaces'
import type { IMeReturn } from '@/app/services/users-services/interfaces'

export interface IAuthContextValue {
  signedIn: boolean
  handleAuthenticated: ({
    email,
    password,
  }: IAuthenticatedProps) => Promise<void>
  handleSignOut: () => Promise<void>
  signOutPending: boolean
  me: IMeReturn | undefined
  meIsLoading: boolean
}

export const AuthContext = createContext({} as IAuthContextValue)
