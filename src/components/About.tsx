import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import { Heading, Paragraph } from './Text'

export function About() {
  const t = useTranslations('about')
  return (
    <section
      id="about"
      className="relative mx-2 mt-2 overflow-hidden rounded-4xl bg-gray-900 py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-2xl md:text-center">
          <Heading dark>{t('heading')}</Heading>
          <Paragraph dark>
            {t.rich('subtitle', {
              br: () => <br />,
            })}
          </Paragraph>
          <Button
            href="#contact"
            color="white"
            className="mt-10 w-full text-xl lg:w-auto"
          >
            {t('button')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
