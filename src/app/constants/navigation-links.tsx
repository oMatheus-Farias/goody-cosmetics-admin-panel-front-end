import { Circle } from 'lucide-react'

import { ROUTES_PATHS } from './routes-paths'

export const NAVIGATION_LINKS = [
  {
    to: ROUTES_PATHS.CATEGORIES,
    icon: <Circle className="w-2" />,
    label: 'Categorias',
  },
  {
    to: ROUTES_PATHS.PRODUCTS,
    icon: <Circle className="w-2" />,
    label: 'Produtos',
  },
]
