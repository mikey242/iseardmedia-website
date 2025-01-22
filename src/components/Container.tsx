import clsx from 'clsx'
import React from 'react'

export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-6 lg:px-8', className)}
      {...props}
    />
  )
}
