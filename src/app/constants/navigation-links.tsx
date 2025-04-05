import { Circle, CopyPlus } from 'lucide-react'

import { ROUTES_PATHS } from './routes-paths'

export const NAVIGATION_LINKS = [
  {
    to: ROUTES_PATHS.REGISTRATIONS,
    icon: <CopyPlus />,
    label: 'Cadastros',
  },
  {
    to: ROUTES_PATHS.REGISTRATIONS,
    icon: <Circle />,
    label: 'Categorias',
  },
]
