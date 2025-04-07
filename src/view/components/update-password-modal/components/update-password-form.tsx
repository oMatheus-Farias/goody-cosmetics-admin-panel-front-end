import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, LoaderCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toggleVisiblePassword } from '@/app/functions/toggle-visible-password'
import { useUpdatePassword } from '@/app/hooks/users-hooks'
import { updatePasswordSchema } from '@/app/schemas/users-schemas/update-password-schema'

import { Button } from '../../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { handleUpdatePassword } from '../functions/handle-update-password'

type TProps = {
  onOpenChange: (open: boolean) => void
}

export type TUpdatePasswordForm = z.infer<typeof updatePasswordSchema>

export default function UpdatePasswordForm({ onOpenChange }: TProps) {
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(false)
  const [visibleNewPassword, setVisibleNewPassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
  const { updatePasswordFn } = useUpdatePassword()

  const form = useForm<TUpdatePasswordForm>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleUpdatePassword({
            data: form.getValues(),
            onOpenChange,
            updatePasswordFn,
          }),
        )}
        className="mt-7 flex w-full flex-col gap-5"
      >
        <FormField
          name="currentPassword"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="current-password"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Senha atual
                  </Label>
                  <div
                    className={`${form.formState.errors.currentPassword ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                  >
                    <Input
                      id="current-password"
                      type={visibleCurrentPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      autoCorrect="off"
                      spellCheck="false"
                      autoCapitalize="none"
                      autoFocus={false}
                      aria-label="Senha"
                      placeholder="Digite sua senha atual"
                      {...form.register('currentPassword')}
                      className="border-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                    />
                    {toggleVisiblePassword({
                      isVisible: visibleCurrentPassword,
                      setIsVisible: setVisibleCurrentPassword,
                    })}
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.currentPassword && (
                <div className="flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <FormMessage className="text-xs" />
                </div>
              )}
            </FormItem>
          )}
        />
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
                      placeholder="Confirme sua nova senha"
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
            aria-label="Redefinir senha"
            disabled={isPending}
            className="bg-goodycosmetics-primary-700 hover:bg-goodycosmetics-primary-800 h-12 w-full rounded-[10px] font-light uppercase transition-all duration-150 ease-linear hover:cursor-pointer"
          >
            {isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
