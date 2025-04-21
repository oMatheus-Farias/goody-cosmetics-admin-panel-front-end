export interface IUpdateSalesProps {
  saleId: string
  saleDate?: string
  items: {
    saleItemId: string
    quantity?: number
    unitPrice?: number
  }[]
}
