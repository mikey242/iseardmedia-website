import { clsx } from 'clsx'
import React from 'react'

type HeadingProps = {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  dark?: boolean
} & React.ComponentPropsWithoutRef<
  'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

type ParagraphProps = {
  as?: 'div' | 'p' | 'span'
  dark?: boolean
} & React.ComponentPropsWithoutRef<'div' | 'p' | 'span'>

export function Heading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl',
      )}
    />
  )
}

export function Subheading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'font-mono text-xs/5 font-bold tracking-widest text-gray-500 uppercase data-dark:text-gray-400',
      )}
    />
  )
}

export function Lead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={clsx(className, 'text-2xl font-medium text-gray-500')}
      {...props}
    />
  )
}

export function Paragraph({
  className,
  as: Element = 'p',
  dark = false,
  ...props
}: ParagraphProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'mt-4 text-lg tracking-tight text-slate-700 data-dark:text-white',
      )}
    />
  )
}
