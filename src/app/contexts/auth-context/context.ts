import { createContext } from 'react'

import type { IAuthenticatedProps } from '@/app/services/auth-services/interfaces/auth-interfaces'

export interface IAuthContextValue {
  signedIn: boolean
  handleAuthenticated: ({
    email,
    password,
  }: IAuthenticatedProps) => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextValue)
