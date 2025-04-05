import loginBackground from '../../../assets/login-background.png'
import logoGoogyCosmetics from '../../../assets/logo.svg'

interface IAuthContainerProps {
  children: React.ReactNode
}

export default function AuthContainer({ children }: IAuthContainerProps) {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div
        className="border-goodycosmetics-primary-200 flex w-[590px] flex-col items-center justify-center rounded-[10px] border px-4 pt-3.5 pb-7 shadow-2xl sm:px-16"
        style={{
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <img src={logoGoogyCosmetics} alt="Goody Cosméticos" className="w-24" />

        {children}
      </div>
    </div>
  )
}
