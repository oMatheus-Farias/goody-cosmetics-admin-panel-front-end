import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toggleVisiblePassword } from '@/app/functions/toggle-visible-password'
import { resetPasswordSchema } from '@/app/schemas/auth-schemas/reset-password-schema'
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

import { handleResetPassword } from '../functions/handle-reset-password'

interface IResetPasswordFormProps {
  token: string
}

export type TResetPasswordForm = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm({ token }: IResetPasswordFormProps) {
  const [visibleNewPassword, setVisibleNewPassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

  const form = useForm<TResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleResetPassword({
            data: form.getValues(),
            token,
          }),
        )}
        className="mt-7 flex w-full flex-col gap-5"
      >
        <FormField
          name="newPassword"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="new-password"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Nova senha
                  </Label>
                  <div
                    className={`${form.formState.errors.newPassword ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                  >
                    <Input
                      id="new-password"
                      type={visibleNewPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      autoCorrect="off"
                      spellCheck="false"
                      autoCapitalize="none"
                      autoFocus={false}
                      aria-label="Senha"
                      placeholder="Digite sua nova senha"
                      {...form.register('newPassword')}
                      className="border-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                    />
                    {toggleVisiblePassword({
                      isVisible: visibleNewPassword,
                      setIsVisible: setVisibleNewPassword,
                    })}
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.newPassword && (
                <div className="flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <FormMessage className="text-xs" />
                </div>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="confirm-password"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Confirmar nova senha
                  </Label>
                  <div
                    className={`${form.formState.errors.confirmPassword ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                  >
                    <Input
                      id="confirm-password"
                      type={visibleConfirmPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      autoCorrect="off"
                      spellCheck="false"
                      autoCapitalize="none"
                      autoFocus={false}
                      aria-label="Confirmação de senha"
                      placeholder="Confirme sua senha"
                      {...form.register('confirmPassword')}
                      className="border-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                    />
                    {toggleVisiblePassword({
                      isVisible: visibleConfirmPassword,
                      setIsVisible: setVisibleConfirmPassword,
                    })}
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.confirmPassword && (
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
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
