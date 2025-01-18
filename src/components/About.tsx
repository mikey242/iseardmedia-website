import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import { Heading, Paragraph } from './Text'

export function About() {
  const t = useTranslations('cta')
  return (
    <section
      id="about"
      className="relative mx-2 mt-2 overflow-hidden rounded-4xl bg-gray-900 py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Heading dark>{t('heading')}</Heading>
          <Paragraph dark>{t('subtitle')}</Paragraph>
          <Button href="#contact" color="white" className="mt-10 text-xl">
            {t('button')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
