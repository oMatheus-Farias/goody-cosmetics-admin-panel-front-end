import loginBackground from '../../../assets/login-background.png'
import logoGoogyCosmetics from '../../../assets/logo.svg'
import LoginForm from './components/login-form'

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div
        className="border-goodycosmetics-primary-200 flex w-[590px] flex-col items-center justify-center rounded-[10px] border px-16 pt-3.5 pb-7 shadow-2xl"
        style={{
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <img src={logoGoogyCosmetics} alt="Goody Cosméticos" className="w-24" />

        <div className="mt-10 flex flex-col">
          <h1 className="text-goodycosmetics-primary-700 text-center text-xl font-medium">
            Login Administrativo
          </h1>
          <p className="text-center text-sm font-light text-gray-700">
            Gerencie tudo de forma simples e eficiente.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
