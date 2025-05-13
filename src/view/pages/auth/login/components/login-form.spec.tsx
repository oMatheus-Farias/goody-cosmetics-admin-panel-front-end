import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
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

  it('should display an error message for invalid email format', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement
    const button = screen.getByRole('button', { name: /acessar/i })

    emailInput.focus()
    emailInput.value = 'email-invalido'
    emailInput.dispatchEvent(new Event('input', { bubbles: true }))
    passwordInput.focus()
    passwordInput.value = '12345678'
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }))
    button.click()

    expect(await screen.findByText(/E-mail inválido./i)).toBeInTheDocument()
    expect(
      await screen.findByText(/A senha deve ter no mínimo 8 caracteres./i),
    ).toBeInTheDocument()
  })

  it('should toggle password visibility when the icon is clicked', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement
    const toggleIconShoul = screen.getByLabelText(/mostrar/i)

    expect(passwordInput.type).toBe('password')

    fireEvent.click(toggleIconShoul)
    expect(passwordInput.type).toBe('text')

    const toggleIconHidden = screen.getByLabelText(/ocultar/i)

    fireEvent.click(toggleIconHidden)
    expect(passwordInput.type).toBe('password')
  })

  it('should disable the submit button and show loader while submitting', async () => {
    vi.mock('../functions/handle-login', () => ({
      handleLogin: vi.fn(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      ),
    }))

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement
    const button = screen.getByRole('button', { name: /acessar/i })

    fireEvent.input(emailInput, { target: { value: 'teste@email.com' } })
    fireEvent.input(passwordInput, { target: { value: 'Teste@123' } })
    fireEvent.click(button)

    expect(button).toBeDisabled()
    expect(screen.getByLabelText(/carregando/i)).toBeInTheDocument()

    await new Promise((resolve) => setTimeout(resolve, 120))
    vi.unmock('../functions/handle-login')
  })
})
