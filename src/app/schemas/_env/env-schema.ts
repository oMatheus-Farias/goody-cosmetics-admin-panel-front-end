import { z } from 'zod'

export const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production']).default('development'),
  VITE_API_URL: z.string().url(),
})
