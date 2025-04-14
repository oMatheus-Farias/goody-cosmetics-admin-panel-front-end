import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '../ui/button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  limit: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}
export function Pagination({
  pageIndex,
  limit,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / limit) || 1

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <span className="text-sm text-black">Total de {totalCount} item(s)</span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            variant="outline"
            className="h-8 w-8 p-0 transition-colors duration-200 ease-linear hover:cursor-pointer hover:bg-gray-100"
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            variant="outline"
            className="h-8 w-8 p-0 transition-colors duration-200 ease-linear hover:cursor-pointer hover:bg-gray-100"
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            variant="outline"
            className="h-8 w-8 p-0 transition-colors duration-200 ease-linear hover:cursor-pointer hover:bg-gray-100"
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pages - 1)}
            variant="outline"
            className="h-8 w-8 p-0 transition-colors duration-200 ease-linear hover:cursor-pointer hover:bg-gray-100"
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
