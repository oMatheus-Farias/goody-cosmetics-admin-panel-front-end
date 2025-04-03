import { Button } from '@/view/components/ui/button'
import { Input } from '@/view/components/ui/input'
import { Label } from '@/view/components/ui/label'

import loginBackground from '../../../assets/login-background.png'
import logoGoogyCosmetics from '../../../assets/logo.svg'

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

        <form action="" className="mt-7 flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="email"
              className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
            >
              E-mail
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Digite seu e-mail"
              className="border-goodycosmetics-primary-400 h-12 rounded-[10px] border bg-white font-light placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="password"
              className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
            >
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="border-goodycosmetics-primary-400 h-12 rounded-[10px] border bg-white font-light placeholder:text-gray-400"
            />
          </div>

          <div className="mt-14 w-full">
            <Button className="bg-goodycosmetics-primary-700 hover:bg-goodycosmetics-primary-800 h-12 w-full rounded-[10px] font-light uppercase transition-all duration-150 ease-linear hover:cursor-pointer">
              Acessar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
