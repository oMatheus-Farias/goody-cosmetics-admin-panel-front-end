import { z } from 'zod'

export const updateProductImageSchema = z.object({
  image: z
    .instanceof(File, {
      message: 'Campo obrigatório',
    })
    .refine((file) => file.size > 0, {
      message: 'A imagem é obrigatória',
    }),
})
