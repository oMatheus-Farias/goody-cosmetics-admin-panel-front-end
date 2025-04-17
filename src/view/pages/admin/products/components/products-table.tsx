import dayjs from 'dayjs'

import { formatCurrency } from '@/app/functions/format-currency'
import { Pagination } from '@/view/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table'

import type { IProductsTableProps } from '../interfaces/products-table-props'

export function ProductsTable({
  products,
  setSearchParams,
}: IProductsTableProps) {
  function handlePaginate(pageIndex: number) {
    const newSearchParams = new URLSearchParams(window.location.search)
    newSearchParams.set('products-page', String(pageIndex + 1))
    setSearchParams(newSearchParams)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="text-sm">
            <TableHead className="w-[600px] font-light text-gray-400">
              Nome
            </TableHead>
            <TableHead className="w-96 font-light text-gray-400">
              Preço antigo
            </TableHead>
            <TableHead className="w-96 font-light text-gray-400">
              Preço atual
            </TableHead>
            <TableHead className="w-96 font-light text-gray-400">
              Descrição
            </TableHead>
            <TableHead className="w-96 font-light text-gray-400">
              Estoque
            </TableHead>
            <TableHead className="w-96 font-light text-gray-400">
              Data
            </TableHead>
            <TableHead className="text-right font-light text-gray-400">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base font-normal text-gray-500">
          {products?.products?.map((product) => (
            <TableRow
              className="transition-all duration-150 ease-linear hover:bg-gray-100"
              key={product?.id}
            >
              <TableCell>{product?.name}</TableCell>
              <TableCell className="line-through">
                {formatCurrency(product?.oldPrice)}
              </TableCell>
              <TableCell>{formatCurrency(product?.currentPrice)}</TableCell>
              <TableCell>{product?.description}</TableCell>
              <TableCell>{product?.stockQuantity}</TableCell>
              <TableCell>
                {dayjs(product?.createdAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="text-right">
                {/* <ActionsOptionsDropdownMenu product={product} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {products?.products.length > 0 && (
        <div className="mt-5">
          <Pagination
            pageIndex={products?.meta?.pageIndex}
            totalCount={products?.meta?.totalCount}
            limit={products?.meta?.limit}
            onPageChange={handlePaginate}
          />
        </div>
      )}
    </>
  )
}
