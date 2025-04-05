import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    newPassword: z
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
    confirmPassword: z.string({
      required_error: 'Campo de preenchimento obrigatório',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
