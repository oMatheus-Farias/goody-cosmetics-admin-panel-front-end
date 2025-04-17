import { SearchIcon } from 'lucide-react'

import { Label } from '../ui/label'

type TProps = {
  searchTerm: string
  placeholder?: string
  setSearchTerm: (searchTerm: string) => void
}

export function SearchInput({
  searchTerm,
  placeholder = 'Buscar',
  setSearchTerm,
}: TProps) {
  return (
    <Label className="border-goodycosmetics-primary-400 focus-within:outline-goodycosmetics-primary-100 w-full items-center rounded-md border pl-2 transition-colors duration-100 ease-linear focus-within:outline-2">
      <SearchIcon className="w-5 text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize="none"
        aria-label={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        className="bg-goodycosmetics-secondary-500 h-[34px] w-full rounded-md border-none pl-0 font-light shadow-none placeholder:font-light focus:outline-none"
      />
    </Label>
  )
}
