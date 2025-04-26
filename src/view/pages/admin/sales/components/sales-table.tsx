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

import type { ISalesTableProps } from '../interfaces/sales-table-props'
import { SaleActionOptionsDropdownMenu } from './sale-action-options-dropdown-menu'

export function SalesTable({ sales, setSearchParams }: ISalesTableProps) {
  function handlePaginate(pageIndex: number) {
    const newSearchParams = new URLSearchParams(window.location.search)
    newSearchParams.set('sales-page', String(pageIndex + 1))
    setSearchParams(newSearchParams)
  }

  return (
    <>
      <Table data-aos="zoom-in">
        <TableHeader>
          <TableRow className="text-sm">
            <TableHead className="w-64 font-light text-gray-400 2xl:w-96">
              Data da venda
            </TableHead>
            <TableHead className="w-72 font-light text-gray-400 2xl:w-96">
              Total
            </TableHead>
            <TableHead className="font-light text-gray-400">
              Itens Vendidos
            </TableHead>
            <TableHead className="text-right font-light text-gray-400">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base font-normal text-gray-500">
          {sales.sales.map((sale) => (
            <TableRow
              className="transition-all duration-150 ease-linear hover:bg-gray-100"
              key={sale.id}
            >
              <TableCell>{dayjs(sale.saleDate).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{formatCurrency(sale.totalPrice)}</TableCell>
              <TableCell>
                <ul className="space-y-1">
                  {sale.items.map((item) => (
                    <li
                      key={item.saleItemId}
                      className="flex items-center gap-5"
                    >
                      <span>{item.productName}</span>
                      <span>{item.quantity}x</span>
                      <span>{formatCurrency(item.unitPrice)}</span>
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-right">
                <SaleActionOptionsDropdownMenu sale={sale} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {sales?.sales.length > 0 && (
        <div className="mt-5">
          <Pagination
            pageIndex={sales?.meta?.pageIndex}
            totalCount={sales?.meta?.totalCount}
            limit={sales?.meta?.limit}
            onPageChange={handlePaginate}
          />
        </div>
      )}
    </>
  )
}
