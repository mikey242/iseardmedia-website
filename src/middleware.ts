import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

export function middleware(request: NextRequest) {
  // Check if locale cookie is already set
  const localeCookie = request.cookies.get('NEXT_LOCALE')
  if (localeCookie) {
    return NextResponse.next()
  }

  // Detect browser's preferred language
  const acceptLanguageHeader = request.headers.get('accept-language')
  const preferredLanguages = acceptLanguageHeader?.split(',') || []

  // Determine the best matching locale
  const detectedLocale =
    preferredLanguages.find((lang) => locales.includes(lang.split('-')[0])) ||
    defaultLocale

  // Set the detected locale as a cookie
  const response = NextResponse.next()
  response.cookies.set('NEXT_LOCALE', detectedLocale)

  return response
}
