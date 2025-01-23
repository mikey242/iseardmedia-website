import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import { Gradient } from './Gradient'
import { Paragraph } from './Text'

export function Hero() {
  const t = useTranslations('hero')
  return (
    <div className="relative">
      <Gradient
        showGrid
        className="absolute inset-2 bottom-0 -z-10 rounded-4xl ring-1 ring-black/5 ring-inset"
      />
      <Container className="relative pt-20 pb-16 text-center lg:pt-32">
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          {t('heading')}
        </h1>
        <Paragraph className="mx-auto mt-6 max-w-2xl text-slate-900">
          {t('subtitle')}
        </Paragraph>
        <div className="mt-12 flex flex-col justify-center gap-x-6 gap-y-4 sm:flex-row">
          <Button className="text-xl" href="#services">
            {t('button.services')}
          </Button>
          <Button
            variant="outline"
            color="slate"
            className="text-xl"
            href="#contact"
          >
            {t('button.contact')}
          </Button>
        </div>
      </Container>
    </div>
  )
}
