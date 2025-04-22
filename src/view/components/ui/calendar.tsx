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
      className={cn(className)}
      classNames={{
        day: cn('hover:bg-gray-100 rounded focus:outline-none focus:ring-0'),
        day_selected:
          'bg-goodycosmetics-primary-500 text-white hover:bg-goodycosmetics-primary-600 focus:outline-none focus:ring-0', // Remove a borda azul
        day_today: 'text-accent-foreground',
        day_outside:
          'text-muted-foreground aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
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
