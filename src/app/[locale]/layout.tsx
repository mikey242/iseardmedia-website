import { type Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import '@/styles/tailwind.css'
import React from 'react'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    ),
    title: {
      template: t('title.template'),
      default: t('title.default'),
    },
    description: t('description'),
    openGraph: {
      images: `/images/og-${locale}.png`,
    },
  }
}

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
