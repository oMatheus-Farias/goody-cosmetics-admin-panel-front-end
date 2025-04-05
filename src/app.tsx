import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from './app/configs/tanstack-react-query'
import AuthProvider from './app/contexts/auth-context/provider'
import AppRoutes from './routes'
import { Toaster } from './view/components/ui/sonner'

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
