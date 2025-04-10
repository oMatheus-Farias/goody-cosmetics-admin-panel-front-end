import { ShoppingBasket } from 'lucide-react'

export default function GlobalSuspense() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-5">
      <div className="flex-col items-center gap-4 md:flex md:flex-row">
        <div className="bg-goodycosmetics-primary-700 flex h-12 w-12 animate-bounce items-center justify-center rounded-full">
          <ShoppingBasket className="w-6 text-white" />
        </div>

        <div>
          <h4 className="text-goodycosmetics-primary-700 text-xl font-semibold">
            Goody Cosméticos
          </h4>
          <p className="text-sm text-gray-500">
            Aguarde um instante, estamos preparando o seu ambiente...
          </p>
        </div>
      </div>
    </div>
  )
}
