import { QueryClientProvider } from '@tanstack/react-query'
import Aos from 'aos'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from './app/configs/tanstack-react-query'
import AuthProvider from './app/contexts/auth-context/provider'
import AppRoutes from './routes'
import { ErrorBoundary } from './view/components/error-boundary'
import ErrorBoundaryFallback from './view/components/error-boundary/components/error-boundary-fallback'
import { Toaster } from './view/components/ui/sonner'

export default function App() {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
