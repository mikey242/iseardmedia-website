'use client'

import { Heading, Paragraph } from '@/components/Text'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Script from 'next/script'

export default function Contact() {
  const t = useTranslations('contact')
  const [isBusy, setIsBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsBusy(true)
    const formData = new FormData(e.currentTarget)
    await fetch('/api/contact', {
      method: 'post',
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          // Handle server errors by checking the response status
          const errorData = await response.json()
          console.error('Server error:', errorData)
          throw new Error(errorData.message || 'Failed to send email')
        }
        setHasSubmitted(true)
      })
      .catch((error) => {
        setMessage(error?.message)
        console.log('Something went wrong', error)
      })
      .finally(() => {
        setIsBusy(false)
      })
  }

  return (
    <section
      id="contact"
      className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Heading as="h2">{t('heading')}</Heading>
        <Paragraph>{t('subtitle')}</Paragraph>
      </div>
      <div className="mx-auto mt-16 max-w-xl text-center sm:mt-20">
        {hasSubmitted ? (
          <div className="text-center">
            <Heading as="h3">{t('success')}</Heading>
          </div>
        ) : (
          <form
            method="POST"
            onSubmit={handleSubmit}
            className={clsx(isBusy && 'pointer-events-none opacity-50')}
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  {t('form.name')}
                </label>
                <div className="mt-2.5">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={true}
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  {t('form.company')}
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  {t('form.email')}
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required={true}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  {t('form.message')}
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required={true}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              async
              defer
            ></Script>
            <div
              suppressHydrationWarning
              className="cf-turnstile mt-8"
              // data-appearance="interaction-only"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
              data-callback="javascriptCallback"
              data-size="flexible"
            ></div>
            <div className="mt-10">
              <Button className="w-full text-xl">{t('form.submit')}</Button>
            </div>
            {message && (
              <div>
                <Paragraph className="text-red-500">{message}</Paragraph>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
