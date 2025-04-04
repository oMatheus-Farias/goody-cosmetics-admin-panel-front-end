import { envSchema } from '../schemas/_env/env-schema'

export const env = envSchema.parse(import.meta.env)
