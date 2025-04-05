import { useEffect, useState } from 'react'

interface IUseHasTokenReturn {
  token: string | null
  isLoading: boolean
}

export function useHasToken(): IUseHasTokenReturn {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    setToken(token)
    setIsLoading(false)
  }, [])

  return { token, isLoading }
}
