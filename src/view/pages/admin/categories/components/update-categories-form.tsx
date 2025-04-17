import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AlertCircle, LoaderCircleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useUpdateCategories } from '@/app/hooks/categories-hooks/use-update-categories'
import { updateCategoriesSchema } from '@/app/schemas/categories-schemas/update-categories-schema'
import type { IGetCategoriesReturn } from '@/app/services/categories-services/interfaces'
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

import { handleUpdateCategories } from '../functions/handle-update-categories'

type TProps = {
  category: IGetCategoriesReturn
  onOpenChange: (open: boolean) => void
}

export type TUpdateCategoriesForm = z.infer<typeof updateCategoriesSchema>

export function UpdateCategoriesForm({ category, onOpenChange }: TProps) {
  const queryClient = useQueryClient()
  const { updateCategoriesFn } = useUpdateCategories()

  const form = useForm<TUpdateCategoriesForm>({
    resolver: zodResolver(updateCategoriesSchema),
    defaultValues: {
      name: category?.name,
    },
  })

  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleUpdateCategories({
            data: form.getValues(),
            category,
            queryClient,
            onOpenChange,
            updateCategoriesFn,
          }),
        )}
        className="mt-7 flex w-full flex-col gap-5"
      >
        <FormField
          name="name"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="name"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Nome
                  </Label>
                  <div
                    className={`${form.formState.errors.name ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                  >
                    <Input
                      id="name"
                      type="text"
                      autoFocus
                      spellCheck="false"
                      autoComplete="off"
                      aria-label="Nome da categoria"
                      placeholder="Digite o nome da categoria"
                      {...form.register('name')}
                      className="border-none shadow-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.name && (
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
            aria-label="Salvar categoria"
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
