import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useGetAllCategoriesWithParams } from '@/app/hooks/categories-hooks'
import MainContainer from '@/view/components/main-container'
import MainContentHeader from '@/view/components/main-content-header'
import { Button } from '@/view/components/ui/button'

import CategoriesTable from './components/categories-table'

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  // TODO: Fix this to use a debounce function
  console.log({
    setSearchTerm,
    setDebouncedSearchTerm,
  })

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('categories-page') ?? '1')

  const { categories, isLoading } = useGetAllCategoriesWithParams({
    pageIndex,
    searchTerm: debouncedSearchTerm,
  })

  return (
    <MainContainer>
      <MainContentHeader
        title="Cadastre suas categorias"
        description="Gerencie e organize suas categorias com facilidade!"
      >
        <Button
          type="button"
          aria-label="Cadastrar"
          className="bg-goodycosmetics-primary-400 hover:bg-goodycosmetics-primary-500 flex items-center gap-1 transition-colors duration-150 ease-linear hover:cursor-pointer"
        >
          <Plus />
          Cadastrar
        </Button>
      </MainContentHeader>

      <div className="mt-8">
        {isLoading ? (
          <div>carregando...</div>
        ) : (
          <>
            {categories && categories.categories.length > 0 ? (
              <CategoriesTable
                categories={categories}
                setSearchParams={setSearchParams}
              />
            ) : (
              <p>Nenhuma informação encontrada.</p>
            )}
          </>
        )}
      </div>
    </MainContainer>
  )
}
