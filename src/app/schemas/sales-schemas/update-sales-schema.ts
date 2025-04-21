import { z } from 'zod'

export const updateSalesSchema = z.object({
  saleDate: z
    .string({
      required_error: 'Data da venda é obrigatória',
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Data da venda deve ser uma data válida',
    }),
  items: z.array(
    z.object({
      saleItemId: z
        .string({
          required_error: 'ID do item da venda é obrigatório',
        })
        .uuid({
          message: 'ID do item da venda deve ser um UUID válido',
        }),
      quantity: z.coerce
        .number({
          required_error: 'A quantidade é obrigatória',
          message: 'A quantidade deve ser um número',
        })
        .int('A quantidade deve ser um número inteiro')
        .min(1, 'A quantidade deve ser pelo menos 1')
        .optional(),
      unitPrice: z.coerce
        .number({
          required_error: 'O preço unitário é obrigatório',
          message: 'O preço unitário deve ser um número',
        })
        .min(0, 'O preço unitário deve ser maior ou igual a zero')
        .optional(),
    }),
  ),
})
