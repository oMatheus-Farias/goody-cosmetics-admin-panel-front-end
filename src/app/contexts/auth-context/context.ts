import { createContext } from 'react'

import type { IAuthenticatedProps } from '@/app/services/auth-services/interfaces'

export interface IAuthContextValue {
  signedIn: boolean
  handleAuthenticated: ({
    email,
    password,
  }: IAuthenticatedProps) => Promise<void>
  handleSignOut: () => Promise<void>
  signOutPending: boolean
}

export const AuthContext = createContext({} as IAuthContextValue)
