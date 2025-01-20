import { type Metadata } from 'next'
import { Poppins } from 'next/font/google'
import clsx from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import '@/styles/tailwind.css'
import React from 'react'

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
      images: '/images/og.png',
    },
  }
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins',
})

export default async function BaseLayout({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        poppins.variable,
      )}
    >
      <body className="flex h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
