import type { ControllerRenderProps } from 'react-hook-form'

import type { TCreateProductsForm } from '../components'

type TField<T extends keyof TCreateProductsForm> = ControllerRenderProps<
  TCreateProductsForm,
  T
>

export function handleImageChange<T extends keyof TCreateProductsForm>(
  file: File | undefined,
  field: TField<T>,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>,
) {
  if (file) {
    setPreview(URL.createObjectURL(file))
    field.onChange(file)
  }
}
