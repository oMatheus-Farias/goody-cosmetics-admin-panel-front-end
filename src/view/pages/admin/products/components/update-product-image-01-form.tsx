import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { LoaderCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useUpdateProductImage } from '@/app/hooks/products-hooks'
import { updateProductImageSchema } from '@/app/schemas/products-schemas/update-product-images-schema'
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

import { handleUpdateProductImage } from '../functions'

type TProps = {
  product: IGetProductsReturn
  onOpenChange: (open: boolean) => void
}
export type TUpdateProductImageForm = z.infer<typeof updateProductImageSchema>

export function UpdateProductImage01Form({ product, onOpenChange }: TProps) {
  const queryClient = useQueryClient()
  const { updateProductImageFn } = useUpdateProductImage()
  const [previewImage, setPreviewImage] = useState<string | null>(
    product.productImage[0]?.url || null,
  )
  const form = useForm<TUpdateProductImageForm>({
    resolver: zodResolver(updateProductImageSchema),
    defaultValues: {
      image: undefined,
    },
  })
  const isPending = form.formState.isSubmitting
  const hasChange = form.watch('image') !== undefined
  function handleResetImage() {
    setPreviewImage(product.productImage[0]?.url || null)
    form.setValue('image', undefined as unknown as File)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleUpdateProductImage({
            data: form.getValues(),
            imageId: product.productImage[0]?.id || '',
            queryClient,
            onOpenChange,
            updateProductImageFn,
          }),
        )}
        className="mt-7 flex w-full flex-col gap-5"
      >
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col items-center gap-2">
                  <Label
                    htmlFor="image"
                    className="text-goodycosmetics-primary-700 text-xs font-normal uppercase"
                  >
                    Primeira Imagem
                  </Label>
                  <div className="relative flex flex-col items-center">
                    <label
                      htmlFor="image"
                      className="cursor-pointer"
                      title="Clique para alterar a imagem"
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview da primeira imagem"
                          className="h-32 w-32 rounded object-cover transition-opacity duration-200 ease-in-out hover:opacity-80"
                        />
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center rounded bg-gray-200 text-gray-500 transition-opacity duration-200 ease-in-out hover:opacity-80">
                          Sem imagem
                        </div>
                      )}
                    </label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setPreviewImage(URL.createObjectURL(file))
                          field.onChange(file)
                        }
                      }}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      disabled={!hasChange}
                      onClick={() => handleResetImage()}
                      className="mt-2 w-full border border-gray-400 bg-transparent text-xs font-light text-gray-500 uppercase hover:cursor-pointer hover:bg-gray-100"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.image && (
                <FormMessage className="text-xs text-red-500">
                  {form.formState.errors.image.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <div className="mt-6 w-full">
          <Button
            type="submit"
            aria-label="Atualizar imagem do produto"
            disabled={isPending || !hasChange}
            className="bg-goodycosmetics-primary-700 hover:bg-goodycosmetics-primary-800 h-12 w-full rounded-[10px] font-light uppercase transition-all duration-150 ease-linear hover:cursor-pointer"
          >
            {isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              'Atualizar imagem'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
