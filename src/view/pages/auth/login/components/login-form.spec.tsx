import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import LoginForm from './login-form'

vi.mock('@/app/hooks/auth-hooks/use-auth', () => ({
  useAuth: () => ({ handleAuthenticated: vi.fn() }),
}))

describe('LoginForm', () => {
  it('should render the email, password and login button fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /acessar/i })).toBeInTheDocument()
  })
})
