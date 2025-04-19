import { Circle } from 'lucide-react'

import { ROUTES_PATHS } from './routes-paths'

export const NAVIGATION_LINKS = [
  {
    to: ROUTES_PATHS.SALES,
    icon: <Circle className="w-2" />,
    label: 'Vendas',
  },
  {
    to: ROUTES_PATHS.PRODUCTS,
    icon: <Circle className="w-2" />,
    label: 'Produtos',
  },
  {
    to: ROUTES_PATHS.CATEGORIES,
    icon: <Circle className="w-2" />,
    label: 'Categorias',
  },
]
