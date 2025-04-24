import { z } from 'zod'

export const createSalesSchema = z.object({
  saleDate: z
    .date({
      required_error: 'Data da venda é obrigatória',
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Data da venda deve ser uma data válida',
    }),
  items: z.array(
    z.object({
      productId: z
        .string({
          required_error: 'Produto é obrigatório',
        })
        .uuid({
          message: 'Produto é obrigatório',
        }),
      quantity: z.coerce
        .number({
          required_error: 'A quantidade é obrigatória',
          message: 'A quantidade deve ser um número',
        })
        .int('A quantidade deve ser um número inteiro')
        .min(1, 'A quantidade deve ser pelo menos 1'),
      unitPrice: z.coerce
        .number({
          required_error: 'O preço unitário é obrigatório',
          message: 'O preço unitário deve ser um número',
        })
        .min(0, 'O preço unitário deve ser maior ou igual a zero'),
    }),
  ),
})
