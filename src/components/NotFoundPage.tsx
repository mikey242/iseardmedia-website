import { SlimLayout } from '@/components/SlimLayout'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'
import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('notfound')
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/public" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <p className="mt-20 text-sm font-medium text-gray-700">404</p>
      <h1 className="mt-3 text-lg font-bold text-gray-900">{t('title')}</h1>
      <p className="mt-3 text-sm text-gray-700">{t('description')}</p>
      <Button href="/" className="mt-10">
        {t('button')}
      </Button>
    </SlimLayout>
  )
}
