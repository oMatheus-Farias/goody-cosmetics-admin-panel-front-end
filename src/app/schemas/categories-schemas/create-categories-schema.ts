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
    .max(25, {
      message: 'Máximo de 25 caracteres',
    }),
})
