import { Search } from 'lucide-react'

type TProps = {
  title: string
  description: string
}

export function NoInformationInTable({ title, description }: TProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-start justify-center gap-2">
        <Search className="w-3.5" />
        <h1 className="text-center font-light text-gray-900">{title}</h1>
      </div>
      <p className="text-sm font-light text-gray-500">{description}</p>
    </div>
  )
}
