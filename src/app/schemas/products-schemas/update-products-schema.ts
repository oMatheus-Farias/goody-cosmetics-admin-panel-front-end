import { z } from 'zod'

export const updateProductsSchema = z.object({
  categoryId: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .uuid({
      message: 'ID inválido',
    })
    .optional(),
  name: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    })
    .max(50, {
      message: 'O nome deve ter no máximo 50 caracteres',
    })
    .optional(),
  description: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(2, {
      message: 'A descrição deve ter pelo menos 2 caracteres',
    })
    .max(500, {
      message: 'A descrição deve ter no máximo 500 caracteres',
    })
    .optional(),
  oldPrice: z
    .number({
      required_error: 'Campo obrigatório',
      message: 'Valor inválido',
    })
    .min(1, {
      message: 'O preço deve ser maior que zero',
    })
    .positive({
      message: 'O preço deve ser maior que zero',
    })
    .optional(),
  currentPrice: z
    .number({
      required_error: 'Campo obrigatório',
      message: 'Valor inválido',
    })
    .min(1, {
      message: 'O preço deve ser maior que zero',
    })
    .positive({
      message: 'O preço deve ser maior que zero',
    })
    .optional(),
  stockQuantity: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      message: 'Valor inválido',
    })
    .int('A quantidade em estoque deve ser um número inteiro')
    .min(0, {
      message: 'A quantidade em estoque deve ser maior ou igual a zero',
    })
    .optional(),
})
