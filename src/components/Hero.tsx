import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {useTranslations} from 'next-intl';
import { Gradient } from './Gradient'

export function Hero() {
  const t = useTranslations('hero');
  return (
    <div className="relative">
    <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
    <Container className="relative pb-16 pt-20 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        {t('heading')}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        {t('subtext')}
      </p>
      <div className="mt-10">
        <Button className="text-xl" href="#">{t('button')}</Button>
      </div>
    </Container>
    </div>
  )
}
