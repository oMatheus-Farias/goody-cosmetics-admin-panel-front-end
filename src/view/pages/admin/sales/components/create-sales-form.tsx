import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import {
  AlertCircle,
  CalendarIcon,
  LoaderCircleIcon,
  PlusCircle,
  Trash2,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

import { useGetAllProducts } from '@/app/hooks/products-hooks'
import { useCreateSales } from '@/app/hooks/sales-hooks'
import { cn } from '@/app/lib/utils'
import { createSalesSchema } from '@/app/schemas/sales-schemas/create-sales-schema'
import { Button } from '@/view/components/ui/button'
import { Calendar } from '@/view/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/view/components/ui/form'
import { Input } from '@/view/components/ui/input'
import { Label } from '@/view/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/view/components/ui/select'

import { handleCreateSales } from '../functions'

type TProps = {
  onOpenChange: (open: boolean) => void
}
export type TCreateSalesForm = z.infer<typeof createSalesSchema>

export function CreateSalesForm({ onOpenChange }: TProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const queryClient = useQueryClient()
  const { createSalesFn } = useCreateSales()
  const { products, isLoading } = useGetAllProducts()
  const calendarRef = useRef<HTMLDivElement | null>(null)
  const form = useForm<Omit<TCreateSalesForm, 'saleItemId'>>({
    resolver: zodResolver(createSalesSchema),
    defaultValues: {
      saleDate: date,
      items: [{ productId: '', quantity: 1, unitPrice: 0 }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })
  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleCreateSales({
            data: {
              saleDate: date!,
              items: form.getValues('items'),
            },
            queryClient,
            onOpenChange,
            createSalesFn,
          }),
        )}
        className="mt-7 flex w-full flex-col gap-5"
      >
        <Controller
          name="saleDate"
          control={form.control}
          render={() => (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="saleDate"
                className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
              >
                Data da venda
              </Label>
              <div
                className={`${
                  form.formState.errors.saleDate
                    ? 'border-rose-500 has-focus-visible:ring-rose-300/80'
                    : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'
                } relative flex h-12 w-full items-center rounded-[10px] border bg-white font-light has-focus:ring-[3px]`}
              >
                <div className="relative h-full w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsCalendarOpen((prev) => !prev)
                    }}
                    className={cn(
                      'h-full w-full items-center justify-start px-3 text-left text-sm font-light hover:cursor-pointer',
                      !date && 'text-gray-500',
                    )}
                  >
                    <CalendarIcon className="mr-2 inline-block w-3.5" />
                    {date ? (
                      format(date, 'PPP', { locale: ptBR })
                    ) : (
                      <span>Escolha uma data</span>
                    )}
                  </button>

                  {isCalendarOpen && (
                    <div
                      ref={calendarRef}
                      className="absolute z-10 mt-2 flex rounded-md border bg-white p-2 shadow-md"
                    >
                      <Calendar
                        className="w-full"
                        classNames={{
                          day_selected:
                            'bg-goodycosmetics-primary-500 text-white',
                        }}
                        mode="single"
                        selected={date}
                        onSelect={(day) => {
                          if (day) {
                            setDate(day)
                          }
                        }}
                        locale={ptBR}
                      />
                    </div>
                  )}
                </div>
              </div>
              {form.formState.errors.saleDate && (
                <div className="flex items-center gap-2 font-light text-red-500">
                  <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                  <FormMessage className="text-xs">
                    {form.formState.errors.saleDate.message}
                  </FormMessage>
                </div>
              )}
            </div>
          )}
        />

        <div className="flex flex-col gap-5">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Controller
                    name={`items.${index}.productId`}
                    control={form.control}
                    render={({ field: { onChange, value, name } }) => (
                      <div className="flex flex-1 flex-col gap-2">
                        <Label
                          htmlFor={`items.${index}.productId`}
                          className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                        >
                          Produto
                        </Label>
                        <div
                          className={`${
                            form.formState.errors.items?.[index]?.productId
                              ? 'border-rose-500 has-focus-visible:ring-rose-300/80'
                              : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'
                          } flex h-12 w-full items-center rounded-[10px] border bg-white font-light has-focus:ring-[3px]`}
                        >
                          <Select
                            name={name}
                            onValueChange={onChange}
                            value={value}
                          >
                            <SelectTrigger className="w-full border-none shadow-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0">
                              <SelectValue
                                defaultValue={''}
                                placeholder="Selecione um produto"
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full bg-white">
                              <SelectGroup>
                                <SelectLabel className="uppercase">
                                  Produtos
                                </SelectLabel>
                                {isLoading ? (
                                  <SelectItem
                                    value="loading"
                                    disabled
                                    className="font-light"
                                  >
                                    <LoaderCircleIcon className="animate-spin" />
                                    Carregando...
                                  </SelectItem>
                                ) : products && products.length > 0 ? (
                                  products.map((product) => (
                                    <SelectItem
                                      className="hover:bg-goodycosmetics-secondary-500 font-light text-gray-500 transition-all duration-200 ease-linear hover:cursor-pointer"
                                      key={product.id}
                                      value={product.id}
                                    >
                                      {product.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem
                                    value="no-products"
                                    disabled
                                    className="font-light"
                                  >
                                    Nenhum produto disponível.
                                  </SelectItem>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        {form.formState.errors.items?.[index]?.productId && (
                          <div className="flex items-center gap-2 font-light text-red-500">
                            <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                            <FormMessage className="text-xs">
                              {
                                form.formState.errors.items?.[index]?.productId
                                  ?.message
                              }
                            </FormMessage>
                          </div>
                        )}
                      </div>
                    )}
                  />
                  <FormField
                    name={`items.${index}.quantity`}
                    control={form.control}
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className="flex max-w-20 flex-col gap-2">
                            <Label
                              htmlFor={`items.${index}.quantity`}
                              className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                            >
                              Quantidade
                            </Label>
                            <div
                              className={`${form.formState.errors.items?.[index]?.quantity ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} relative flex h-12 items-center rounded-[10px] border bg-white pr-3 font-light has-focus:ring-[3px]`}
                            >
                              <Input
                                id={`items.${index}.quantity`}
                                type="number"
                                autoComplete="off"
                                min={1}
                                aria-label="Quantidade"
                                {...form.register(`items.${index}.quantity`)}
                                className="border-none shadow-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                              />
                            </div>
                          </div>
                        </FormControl>
                        {form.formState.errors.items?.[index]?.quantity && (
                          <div className="flex max-w-20 items-center gap-2 font-light text-red-500">
                            <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                            <FormMessage
                              title={
                                form.formState.errors.items?.[index]
                                  ?.quantity &&
                                form.formState.errors.items?.[index]?.quantity
                                  .message
                              }
                              className="truncate text-xs"
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                  <Controller
                    name={`items.${index}.unitPrice`}
                    control={form.control}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor={`items.${index}.unitPrice`}
                          className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                        >
                          R$ UNI
                        </Label>
                        <div
                          className={`${form.formState.errors.items?.[index]?.unitPrice ? 'border-rose-500 has-focus-visible:ring-rose-300/80' : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'} flex h-12 w-full items-center rounded-[10px] border bg-white font-light has-focus:ring-[3px]`}
                        >
                          <NumericFormat
                            id={`items.${index}.unitPrice`}
                            allowNegative={false}
                            decimalSeparator=","
                            thousandSeparator="."
                            defaultValue={value}
                            placeholder="Digite o preço unitário"
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
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  title="Remover item"
                  aria-label="Remover item"
                  onClick={() => remove(index)}
                  className={`${index === 0 ? 'hidden' : ''} mt-2 h-12 w-full rounded-[10px] border border-rose-500 text-white transition-all duration-150 ease-linear hover:cursor-pointer hover:bg-rose-50 sm:mt-6 sm:w-8`}
                >
                  <Trash2 className="w-3.5 text-rose-500" />
                </Button>
              </div>
            )
          })}
          <Button
            type="button"
            aria-label="Adicionar item"
            onClick={() => append({ productId: '', quantity: 1, unitPrice: 0 })}
            className="bg-goodycosmetics-primary-200 border-goodycosmetics-primary-500 text-goodycosmetics-primary-900 hover:bg-goodycosmetics-primary-300 h-12 w-full rounded-[10px] border font-normal uppercase transition-all duration-150 ease-linear hover:cursor-pointer"
          >
            <PlusCircle className="w-3.5" />
            Adicionar Item
          </Button>
        </div>

        <div className="mt-14 w-full">
          <Button
            type="submit"
            aria-label="Cadastrar"
            disabled={isPending}
            className="bg-goodycosmetics-primary-700 hover:bg-goodycosmetics-primary-800 h-12 w-full rounded-[10px] font-light uppercase transition-all duration-150 ease-linear hover:cursor-pointer"
          >
            {isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
