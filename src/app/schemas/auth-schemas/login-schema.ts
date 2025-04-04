import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      message: 'E-mail é obrigatório.',
    })
    .email({
      message: 'E-mail inválido.',
    }),
  password: z
    .string({
      message: 'Senha é obrigatória.',
    })
    .min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres.',
    })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?";:{}|[~<>=_+-]).{8,}$/,
      {
        message:
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
      },
    ),
})
