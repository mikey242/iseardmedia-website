import { Link as I18NLink } from '@/i18n/routing'
import NextLink, { LinkProps } from 'next/link'
import React from 'react'
import clsx from 'clsx'

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <I18NLink
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </I18NLink>
  )
}

export function Link({
  children,
  className,
  ...props
}: LinkProps & {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <NextLink
      {...props}
      className={clsx(
        'inline-block rounded-lg text-slate-700 hover:text-slate-900',
        className,
      )}
    >
      {children}
    </NextLink>
  )
}
