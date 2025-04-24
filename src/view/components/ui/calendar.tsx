import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/app/lib/utils'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-2', className)}
      classNames={{
        day_button:
          'px-2 py-1 w-full transition-all duration-150 hover:cursor-pointer ease-linear hover:bg-gray-200 focus:outline-none focus:ring-0 justify-center items-center rounded-md',
        day: 'transition-all duration-150 hover:cursor-pointer ease-linear hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 justify-center items-center rounded-md aria-selected:bg-goodycosmetics-primary-500 aria-selected:text-white',
        today: 'text-goodycosmetics-primary-500',
        month: 'text-center',
        month_caption: 'mb-5 -mt-6 font-normal',
        nav: 'flex items-center justify-between w-full pr-2 mb-2',
        button_next:
          'text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 transition-all duration-150 ease-linear hover:cursor-pointer',
        button_previous:
          'text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 transition-all duration-150 ease-linear hover:cursor-pointer',
        weekday: 'text-center text-sm font-normal text-gray-500',
        outside: 'text-gray-300',
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ className, ...props }) => (
          <button className={cn('size-4', className)} {...props}>
            <ChevronLeft />
          </button>
        ),
        NextMonthButton: ({ className, ...props }) => (
          <button className={cn('size-4', className)} {...props}>
            <ChevronRight />
          </button>
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
