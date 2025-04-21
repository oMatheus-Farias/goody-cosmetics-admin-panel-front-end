import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useGetAllSalesWithParams } from '@/app/hooks/sales-hooks'
import { LoadingTable } from '@/view/components/loading-table'
import MainContainer from '@/view/components/main-container'
import MainContentHeader from '@/view/components/main-content-header'
import { NoInformationInTable } from '@/view/components/no-information-in-table'
import { SearchInput } from '@/view/components/search-input'

import { CreateProductsModal } from '../products/components'
import { SalesTable } from './components'

export default function SalesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [modalOpen, setModalOpen] = useState(false)

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('sales-page') ?? '1')

  const { sales, isLoading } = useGetAllSalesWithParams({
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
        title="Cadastre suas vendas"
        description="Aqui você pode cadastrar suas vendas."
      >
        <div className="flex w-full flex-col-reverse items-center gap-5 md:w-80 md:flex-row md:gap-2">
          <SearchInput
            placeholder="Buscar venda(s)"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <CreateProductsModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </MainContentHeader>

      <div className="mt-8">
        {isLoading ? (
          <LoadingTable />
        ) : (
          <>
            {sales && sales?.sales?.length > 0 ? (
              <SalesTable sales={sales} setSearchParams={setSearchParams} />
            ) : (
              <NoInformationInTable
                title="Nenhuma venda encontrada"
                description='Se ainda não tem vendas cadastradas, clique no botão "Cadastrar".'
              />
            )}
          </>
        )}
      </div>
    </MainContainer>
  )
}
