import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale, getMessages} from 'next-intl/server'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - TaxPal',
    default: 'TaxPal - Accounting made simple for small businesses',
  },
  description:
    'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const locale = await getLocale()
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
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
