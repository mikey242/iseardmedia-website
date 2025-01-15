import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations('cta');
  return (
    <section
      id="about"
      className="relative overflow-hidden mx-2 mt-2 rounded-4xl bg-gray-900 py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            {t('heading')}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            {t('subtext')}
          </p>
          <Button href="#" color="white" className="mt-10 text-xl">
            {t('button')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
