import { Link as LinkWrapper } from '@/i18n/routing'
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
    <LinkWrapper
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </LinkWrapper>
  )
}

export function Link({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <LinkWrapper
      href={href}
      className={clsx(
        'inline-block rounded-lg text-slate-700 hover:text-slate-900',
        className,
      )}
    >
      {children}
    </LinkWrapper>
  )
}
