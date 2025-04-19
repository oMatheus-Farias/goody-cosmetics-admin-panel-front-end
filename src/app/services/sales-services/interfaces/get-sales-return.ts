export interface IGetSalesReturn {
  id: string
  saleDate: string
  totalPrice: number
  items: {
    saleItemId: string
    quantity: number
    unitPrice: number
    productName: string
  }[]
}
