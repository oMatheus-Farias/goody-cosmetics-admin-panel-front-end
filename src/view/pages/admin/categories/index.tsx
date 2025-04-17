import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useGetAllCategoriesWithParams } from '@/app/hooks/categories-hooks'
import MainContainer from '@/view/components/main-container'
import MainContentHeader from '@/view/components/main-content-header'
import { SearchInput } from '@/view/components/search-input'

import { CategoriesTable, CreateCategoriesModal } from './components'

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [modalOpen, setModalOpen] = useState(false)

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('categories-page') ?? '1')

  const { categories, isLoading } = useGetAllCategoriesWithParams({
    pageIndex,
    searchTerm: debouncedSearchTerm,
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 400)

    return () => clearTimeout(timeout)
  }, [searchTerm])

  return (
    <MainContainer>
      <MainContentHeader
        title="Cadastre suas categorias"
        description="Gerencie e organize suas categorias com facilidade!"
      >
        <div className="flex w-full flex-col-reverse items-center gap-5 md:w-80 md:flex-row md:gap-2">
          <SearchInput
            placeholder="Buscar categoria"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <CreateCategoriesModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
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
