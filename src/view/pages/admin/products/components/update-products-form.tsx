import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AlertCircle, LoaderCircleIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

import { useUpdateProducts } from '@/app/hooks/products-hooks/use-update-products'
import { updateProductsSchema } from '@/app/schemas/products-schemas/update-products-schema'
import type { IGetProductsReturn } from '@/app/services/products-services/interfaces'
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

import { handleUpdateProducts } from '../functions/handle-update-products'

type TProps = {
  product: IGetProductsReturn
  onOpenChange: (open: boolean) => void
}

export type TUpdateProductsForm = z.infer<typeof updateProductsSchema>

export function UpdateProductsForm({ product, onOpenChange }: TProps) {
  const queryClient = useQueryClient()
  const { updateProductsFn } = useUpdateProducts()

  const form = useForm<TUpdateProductsForm>({
    resolver: zodResolver(updateProductsSchema),
    defaultValues: {
      categoryId: product?.categories.id,
      name: product?.name,
      description: product?.description,
      oldPrice: product?.oldPrice,
      currentPrice: product?.currentPrice,
      stockQuantity: product?.stockQuantity,
    },
  })

  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleUpdateProducts({
            data: form.getValues(),
            product,
            queryClient,
            onOpenChange,
            updateProductsFn,
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
                      aria-label="Nome do produto"
                      placeholder="Digite o nome do produto"
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
        <FormField
          name="description"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="description"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Descrição
                  </Label>
                  <div
                    className={`${form.formState.errors.description ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                  >
                    <Input
                      id="description"
                      type="text"
                      spellCheck="false"
                      autoComplete="off"
                      aria-label="Descrição do produto"
                      placeholder="Digite a descrição do produto"
                      {...form.register('description')}
                      className="border-none shadow-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.description && (
                <div className="flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <FormMessage className="text-xs" />
                </div>
              )}
            </FormItem>
          )}
        />
        <Controller
          name="oldPrice"
          control={form.control}
          render={({ field: { onChange, value }, fieldState }) => (
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="oldPrice"
                className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
              >
                Preço antigo
              </Label>
              <div
                className={`${form.formState.errors.currentPrice ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} flex h-12 w-full items-center rounded-[10px] border bg-white font-light has-focus:ring-[3px]`}
              >
                <NumericFormat
                  id="oldPrice"
                  allowNegative={false}
                  decimalSeparator=","
                  thousandSeparator="."
                  defaultValue={value}
                  placeholder="Digite o preço antigo"
                  onValueChange={(values) => {
                    onChange(values.floatValue ?? 0)
                  }}
                  onChange={() => {}}
                  className="border-goodycosmetics-primary-400 flex h-12 w-full items-center rounded-[10px] border bg-white pl-3 font-light focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none"
                />
              </div>
              {fieldState.error && (
                <div className="mt-1.5 flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <span className="text-xs text-rose-500">
                    {fieldState.error.message}
                  </span>
                </div>
              )}
            </div>
          )}
        />
        <Controller
          name="currentPrice"
          control={form.control}
          render={({ field: { onChange, value }, fieldState }) => (
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="currentPrice"
                className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
              >
                Preço atual
              </Label>
              <div
                className={`${form.formState.errors.currentPrice ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} flex h-12 w-full items-center rounded-[10px] border bg-white font-light has-focus:ring-[3px]`}
              >
                <NumericFormat
                  id="currentPrice"
                  allowNegative={false}
                  decimalSeparator=","
                  thousandSeparator="."
                  defaultValue={value}
                  placeholder="Digite o preço atual"
                  onValueChange={(values) => {
                    onChange(values.floatValue ?? 0)
                  }}
                  onChange={() => {}}
                  className="border-goodycosmetics-primary-400 flex h-12 w-full items-center rounded-[10px] border bg-white pl-3 font-light focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none"
                />
              </div>
              {fieldState.error && (
                <div className="mt-1.5 flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <span className="text-xs text-rose-500">
                    {fieldState.error.message}
                  </span>
                </div>
              )}
            </div>
          )}
        />
        <FormField
          name="stockQuantity"
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="stockQuantity"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Quantidade em estoque
                  </Label>
                  <div
                    className={`${form.formState.errors.stockQuantity ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                  >
                    <Input
                      id="stockQuantity"
                      type="number"
                      autoComplete="off"
                      aria-label="Quantidade em estoque"
                      placeholder="Digite a quantidade em estoque"
                      {...form.register('stockQuantity')}
                      className="border-none shadow-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.stockQuantity && (
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
            aria-label="Salvar produto"
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
