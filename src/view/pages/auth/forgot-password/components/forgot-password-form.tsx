import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { ROUTES_PATHS } from '@/app/constants/routes-paths'
import { useForgotPassword } from '@/app/hooks/auth-hooks'
import { forgotPasswordSchema } from '@/app/schemas/auth-schemas/forgot-password-schema'
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

import { handleForgotPassword } from '../functions/handle-forgot-password'

export type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const { forgotPasswordFn } = useForgotPassword()

  const form = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleForgotPassword({
            email: form.getValues('email'),
            forgotPasswordFn,
            form,
          }),
        )}
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

        <div className="mt-14 w-full">
          <Button
            type="submit"
            aria-label="Enviar e-mail de recuperação de senha"
            disabled={isPending}
            className="bg-goodycosmetics-primary-700 hover:bg-goodycosmetics-primary-800 h-12 w-full rounded-[10px] font-light uppercase transition-all duration-150 ease-linear hover:cursor-pointer"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : 'Enviar'}
          </Button>
        </div>

        <Link
          to={ROUTES_PATHS.LOGIN}
          className="text-goodycosmetics-primary-700 hover:text-goodycosmetics-primary-800 mt-3 text-center text-sm font-light underline underline-offset-4 transition-colors duration-150 ease-linear"
        >
          Voltar ao login
        </Link>
      </form>
    </Form>
  )
}
