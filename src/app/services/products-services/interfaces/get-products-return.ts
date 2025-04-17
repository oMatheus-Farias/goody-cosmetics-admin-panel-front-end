export interface IGetProductsReturn {
  id: string
  name: string
  description: string
  currentPrice: number
  oldPrice: number
  stockQuantity: number
  createdAt: string
  categories: {
    id: string
    name: string
  }
  productImage: {
    id: string
    url: string
  }[]
}
