import React, { JSX, useLayoutEffect, useState } from 'react'

import { httpClient } from '@/app/configs/http-client'
import { STORAGE_KEYS } from '@/app/constants/storage-keys'
import { useAuthenticated, useRefreshTokens } from '@/app/hooks/auth-hooks'
import type { IAuthenticatedProps } from '@/app/services/auth-services/interfaces'

import { AuthContext, IAuthContextValue } from './context'

interface IAuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({
  children,
}: IAuthProviderProps): JSX.Element {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  })
  const { refreshTokensFn } = useRefreshTokens()
  const { authenticatedFn } = useAuthenticated()

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) as string,
      )
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    })

    return () => {
      httpClient.interceptors.request.eject(interceptorId)
    }
  }, [])

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        const refreshToken = JSON.parse(
          localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) as string,
        )

        if (originalRequest.url === 'api/refresh-tokens') {
          setSignedIn(false)
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
          return Promise.reject(error)
        }

        if (error.response?.status !== 401 || !refreshToken) {
          return Promise.reject(error)
        }

        const { refreshToken: _refreshToken, token } =
          await refreshTokensFn(refreshToken)
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(token))
        localStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          JSON.stringify(_refreshToken),
        )

        return httpClient(originalRequest)
      },
    )

    return () => {
      httpClient.interceptors.response.eject(interceptorId)
    }
  }, [refreshTokensFn])

  async function handleAuthenticated({ email, password }: IAuthenticatedProps) {
    const { refreshToken, token } = await authenticatedFn({ email, password })

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(token))
    localStorage.setItem(
      STORAGE_KEYS.REFRESH_TOKEN,
      JSON.stringify(refreshToken),
    )
    setSignedIn(true)
  }

  const value: IAuthContextValue = {
    signedIn,
    handleAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
