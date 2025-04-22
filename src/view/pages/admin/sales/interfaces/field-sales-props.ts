import type { FieldArrayWithId } from 'react-hook-form'

type FieldSales = FieldArrayWithId<
  Omit<
    {
      saleDate: string
      items: {
        saleItemId: string
        quantity?: number | undefined
        unitPrice?: number | undefined
      }[]
    },
    'saleItemId'
  >,
  'items',
  'id'
>

export type IFieldSalesProps = Array<FieldSales>
