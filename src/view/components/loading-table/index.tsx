import { Skeleton } from '../ui/skeleton'

export function LoadingTable() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-14 w-full bg-gray-200" />
      <Skeleton className="h-14 w-full bg-gray-200" />
      <Skeleton className="h-14 w-full bg-gray-200" />
      <Skeleton className="h-14 w-full bg-gray-200" />
    </div>
  )
}
