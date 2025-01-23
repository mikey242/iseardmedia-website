'use client'

import { Heading, Paragraph } from '@/components/Text'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link } from '@/components/Link'
import Turnstile from 'react-turnstile'

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
      <div className="mx-auto max-w-2xl md:text-center">
        <Heading as="h2">{t('heading')}</Heading>
        <Paragraph>{t('subtitle')}</Paragraph>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        {hasSubmitted ? (
          <div className="md:text-center">
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
                  className="block text-sm/6 font-medium text-gray-900"
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
                    className="focus:outline-primary block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t('form.company')}
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="focus:outline-primary block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
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
                    className="focus:outline-primary block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t('form.message')}
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required={true}
                    className="focus:outline-primary block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <Turnstile
              className="mt-8"
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
              size="flexible"
            />
            {message && (
              <div>
                <p className="mt-4 text-lg tracking-tight text-red-500">
                  {message}
                </p>
              </div>
            )}
            <div className="mt-10">
              <Button className="w-full text-xl lg:w-auto">
                {t('form.submit')}
              </Button>
            </div>
            <div className="mt-10">
              <p className="text-slate-700">
                {t.rich('privacy.text', {
                  policy: (chunks) => (
                    <Link className="underline" href={t('privacy.href')}>
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
