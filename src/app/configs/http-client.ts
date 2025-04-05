import axios from 'axios'

import { env } from './env-config'

export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
})
