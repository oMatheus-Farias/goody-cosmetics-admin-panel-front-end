import { Eye, EyeClosed } from 'lucide-react'

import { cn } from '../lib/utils'

interface IVisiblePasswordProps {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  className?: string
}

export function toggleVisiblePassword({
  isVisible,
  setIsVisible,
  className,
}: IVisiblePasswordProps) {
  return (
    <>
      {isVisible ? (
        <EyeClosed
          className={cn('w-5 text-gray-500 hover:cursor-pointer', className)}
          onClick={() => setIsVisible(false)}
        />
      ) : (
        <Eye
          className={cn('w-5 text-gray-500 hover:cursor-pointer', className)}
          onClick={() => setIsVisible(true)}
        />
      )}
    </>
  )
}
