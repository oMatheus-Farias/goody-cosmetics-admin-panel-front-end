export interface ICreateSalesProps {
  saleDate: string
  items: {
    productId: string
    quantity: number
    unitPrice: number
  }[]
}
