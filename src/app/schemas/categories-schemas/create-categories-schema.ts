import { z } from 'zod'

export const createCategoriesSchema = z.object({
  name: z
    .string({
      required_error: 'Campo de preenchimento obrigatório',
    })
    .trim()
    .min(1, {
      message: 'Campo obrigatório',
    })
    .max(50, {
      message: 'Máximo de 50 caracteres',
    }),
})
