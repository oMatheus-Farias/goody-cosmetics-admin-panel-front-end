import { ShoppingBasket } from 'lucide-react'

type TProps = {
  productName: string
}

export function BadgeProductName({ productName }: TProps) {
  return (
    <div className="flex w-fit items-center gap-1 rounded-full border border-gray-300 px-3 py-0.5 text-xs font-medium text-gray-500 uppercase">
      <ShoppingBasket className="w-3.5" />
      {productName}
    </div>
  )
}
