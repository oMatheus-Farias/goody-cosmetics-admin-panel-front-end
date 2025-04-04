import AuthContainer from '../components/auth-container'
import AuthHeader from '../components/auth-header'
import LoginForm from './components/login-form'

export default function LoginPage() {
  return (
    <AuthContainer>
      <div className="mt-10">
        <AuthHeader
          title="Login Administrativo"
          description="Gerencie tudo de forma simples e eficiente."
        />
      </div>

      <LoginForm />
    </AuthContainer>
  )
}
