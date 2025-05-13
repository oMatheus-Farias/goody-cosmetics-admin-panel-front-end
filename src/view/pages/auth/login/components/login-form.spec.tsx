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

  it('should display error messages when trying to submit without filling in the required fields', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    const button = screen.getByRole('button', { name: /acessar/i })
    button.click()

    expect(await screen.findByText(/E-mail inválido./i)).toBeInTheDocument()
    expect(
      await screen.findByText(/A senha deve ter no mínimo 8 caracteres./i),
    ).toBeInTheDocument()
  })
})
