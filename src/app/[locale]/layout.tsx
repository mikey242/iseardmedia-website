import '@/styles/tailwind.css'
import React from 'react'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import { generateAppMetadata } from '@/utils/metadata'

export const generateMetadata = generateAppMetadata

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  return <BaseLayout locale={locale}>{children}</BaseLayout>
}
