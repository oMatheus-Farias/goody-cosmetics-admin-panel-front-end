import AuthContainer from '../components/auth-container'
import AuthHeader from '../components/auth-header'
import ForgotPasswordForm from './components/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <AuthContainer>
      <div className="mt-10">
        <AuthHeader
          title="Esqueci minha senha"
          description="Digite seu e-mail e enviaremos um link para redefinir sua senha."
        />
      </div>

      <ForgotPasswordForm />
    </AuthContainer>
  )
}
