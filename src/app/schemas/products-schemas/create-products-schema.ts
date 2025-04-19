import { z } from 'zod'

export const createProductsSchema = z.object({
  categoryId: z
    .string({
      required_error: 'Categoria é obrigatória',
    })
    .uuid({
      message: 'Campo obrigatório',
    }),
  name: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    })
    .max(50, {
      message: 'O nome deve ter no máximo 50 caracteres',
    }),
  description: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(2, {
      message: 'A descrição deve ter pelo menos 2 caracteres',
    })
    .max(500, {
      message: 'A descrição deve ter no máximo 500 caracteres',
    }),
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
    }),
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
    }),
  stockQuantity: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      message: 'Valor inválido',
    })
    .int('A quantidade em estoque deve ser um número inteiro')
    .min(0, {
      message: 'A quantidade em estoque deve ser maior ou igual a zero',
    }),
  image01: z
    .instanceof(File, {
      message: 'Campo obrigatório',
    })
    .refine((file) => file.size > 0, {
      message: 'A primeira imagem é obrigatória',
    }),
  image02: z
    .instanceof(File, {
      message: 'Campo obrigatório',
    })
    .refine((file) => file.size > 0, {
      message: 'A segunda imagem é obrigatória',
    }),
})
