import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { ROUTES_PATHS } from '@/app/constants/routes-paths'
import { toggleVisiblePassword } from '@/app/functions/toggle-visible-password'
import { loginSchema } from '@/app/schemas/auth-schemas/login-schema'
import { Button } from '@/view/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/view/components/ui/form'
import { Input } from '@/view/components/ui/input'
import { Label } from '@/view/components/ui/label'

import { handleLogin } from '../functions/handle-login'

export type TLoginForm = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [visiblePassword, setVisiblePassword] = useState(false)

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="mt-7 flex w-full flex-col gap-5"
      >
        <FormField
          name="email"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="email"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    autoFocus
                    autoComplete="email"
                    autoCorrect="off"
                    spellCheck="false"
                    autoCapitalize="none"
                    aria-label="E-mail"
                    placeholder="Digite seu e-mail"
                    {...form.register('email')}
                    className={`h-12 rounded-[10px] border bg-white font-light placeholder:text-gray-400 ${form.formState.errors.email ? 'border-rose-500 focus-visible:ring-rose-300' : 'border-goodycosmetics-primary-400 focus-visible:ring-goodycosmetics-primary-200'}`}
                  />
                </div>
              </FormControl>
              {form.formState.errors.email && (
                <div className="flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <FormMessage className="text-xs" />
                </div>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="password"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Senha
                  </Label>
                  <div
                    className={`${form.formState.errors.password ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                  >
                    <Input
                      id="password"
                      type={visiblePassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      autoCorrect="off"
                      spellCheck="false"
                      autoCapitalize="none"
                      autoFocus={false}
                      aria-label="Senha"
                      placeholder="Digite sua senha"
                      {...form.register('password')}
                      className="border-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                    />
                    {toggleVisiblePassword({
                      isVisible: visiblePassword,
                      setIsVisible: setVisiblePassword,
                    })}
                  </div>
                  <Link
                    to={ROUTES_PATHS.FORGOT_PASSWORD}
                    className="text-goodycosmetics-primary-700 hover:text-goodycosmetics-primary-800 text-end text-sm font-light underline underline-offset-2 transition-colors duration-150 ease-linear"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
              </FormControl>
              {form.formState.errors.password && (
                <div className="flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <FormMessage className="text-xs" />
                </div>
              )}
            </FormItem>
          )}
        />

        <div className="mt-14 w-full">
          <Button
            type="submit"
            className="bg-goodycosmetics-primary-700 hover:bg-goodycosmetics-primary-800 h-12 w-full rounded-[10px] font-light uppercase transition-all duration-150 ease-linear hover:cursor-pointer"
          >
            Acessar
          </Button>
        </div>
      </form>
    </Form>
  )
}
