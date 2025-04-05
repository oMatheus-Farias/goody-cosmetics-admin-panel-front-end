import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      message: 'E-mail é obrigatório.',
    })
    .email({
      message: 'E-mail inválido.',
    }),
})
