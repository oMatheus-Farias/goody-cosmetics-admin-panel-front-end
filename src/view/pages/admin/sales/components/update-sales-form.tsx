import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { AlertCircle, CalendarIcon, LoaderCircleIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

import { useUpdateSales } from '@/app/hooks/sales-hooks'
import { cn } from '@/app/lib/utils'
import { updateSalesSchema } from '@/app/schemas/sales-schemas/update-sales-schema'
import type { IGetSalesReturn } from '@/app/services/sales-services/interfaces'
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

import { handleUpdateSales } from '../functions'
import { BadgeProductName, DeleteSaleItemsAlertDialog } from '.'

export type TUpdateSalesForm = z.infer<typeof updateSalesSchema>

interface IUpdateSalesFormProps {
  sale: IGetSalesReturn
  onOpenChange: (open: boolean) => void
}

export function UpdateSalesForm({ sale, onOpenChange }: IUpdateSalesFormProps) {
  const [date, setDate] = useState<Date>(new Date(sale.saleDate))
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const queryClient = useQueryClient()
  const { updateSalesFn } = useUpdateSales()
  const calendarRef = useRef<HTMLDivElement | null>(null)
  const form = useForm<Omit<TUpdateSalesForm, 'saleItemId'>>({
    resolver: zodResolver(updateSalesSchema),
    defaultValues: {
      saleDate: sale.saleDate,
      items: sale.items.map((item) => ({
        saleItemId: item.saleItemId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    },
  })
  const { fields } = useFieldArray({
    control: form.control,
    name: 'items',
  })
  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleUpdateSales({
            data: {
              saleDate: String(date),
              items: form.getValues('items'),
            },
            sale,
            queryClient,
            onOpenChange,
            updateSalesFn,
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
                        initialFocus
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
        <div className="flex flex-col gap-4">
          <Label className="text-[10px] font-light text-gray-700 uppercase">
            Itens da Venda
          </Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <BadgeProductName
                  productName={sale.items[index]?.productName}
                />
                <DeleteSaleItemsAlertDialog
                  saleItemId={sale.items[index]?.saleItemId}
                />
              </div>

              <FormField
                name={`items.${index}.quantity`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-1">
                        <Label
                          htmlFor={`items.${index}.quantity`}
                          className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                        >
                          Quantidade
                        </Label>
                        <div
                          className={`${
                            form.formState.errors.items?.[index]?.quantity
                              ? 'border-rose-500 has-focus-visible:ring-rose-300/80'
                              : 'border-goodycosmetics-primary-400 has-focus:ring-goodycosmetics-primary-200'
                          } relative flex h-12 items-center rounded-[10px] border bg-white font-light has-focus:ring-[3px]`}
                        >
                          <Input
                            id={`items.${index}.quantity`}
                            type="number"
                            {...field}
                            className="w-full border-none shadow-none placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-0"
                          />
                        </div>
                      </div>
                    </FormControl>
                    {form.formState.errors.items?.[index]?.quantity && (
                      <div className="flex items-center gap-2 font-light text-red-500">
                        <AlertCircle className="max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5" />
                        <FormMessage className="text-xs" />
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Controller
                name={`items.${index}.unitPrice`}
                control={form.control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor={`items.${index}.unitPrice`}
                      className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                    >
                      Preço unitário
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
          ))}
        </div>

        <div className="mt-14 w-full">
          <Button
            type="submit"
            aria-label="Salvar venda"
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
