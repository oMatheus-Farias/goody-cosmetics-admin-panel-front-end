export interface IUpdateProps {
  productId: string
  data: {
    categoryId?: string
    name?: string
    description?: string
    oldPrice?: number
    currentPrice?: number
    stockQuantity?: number
  }
}
