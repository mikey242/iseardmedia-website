'use client'

import Image, { type ImageProps } from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import screenshot1 from '@/images/screenshots/services/im-service-1.png'
import screenshot2 from '@/images/screenshots/services/im-service-2.png'
import screenshot3 from '@/images/screenshots/services/im-service-3.png'
import screenshot4 from '@/images/screenshots/services/im-service-4.png'
import { useTranslations } from 'next-intl'
import { Heading, Paragraph } from './Text'
import {
  ChartBarIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/16/solid'

interface Service {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: React.ReactNode
}

type Props = {
  features: Array<Service>
}

function Service({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Service
  isActive: boolean
}) {
  return (
    <div
      className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <div
        className={clsx(
          'w-9 rounded-lg p-1',
          isActive ? 'bg-primary text-white' : 'bg-slate-500',
        )}
      >
        {feature.icon}
      </div>
      <h3
        className={clsx(
          'mt-6 text-sm font-bold',
          isActive ? 'text-primary' : 'text-gray-400',
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 text-xl font-medium text-white">{feature.summary}</p>
      <p className="mt-4 text-sm text-white">{feature.description}</p>
    </div>
  )
}

function ServicesMobile({ features }: Props) {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary}>
          <Service feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-gray-800 ring-1 ring-white/15 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ServicesDesktop({ features }: Props) {
  return (
    <TabGroup className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-4 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Service
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </TabList>
          <TabPanels className="relative mt-20 overflow-hidden rounded-4xl bg-gray-800 px-14 py-16 ring-1 ring-white/15 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <TabPanel
                  static
                  key={feature.summary}
                  className={clsx(
                    'px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none',
                    featureIndex !== selectedIndex && 'opacity-60',
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <Image
                      className="w-full"
                      src={feature.image}
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </TabPanel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </TabPanels>
        </>
      )}
    </TabGroup>
  )
}

export function Services() {
  const t = useTranslations('services')

  const features: Array<Service> = [
    {
      name: t('first.name'),
      summary: t('first.summary'),
      description: t('first.description'),
      image: screenshot1,
      icon: <PuzzlePieceIcon />,
    },
    {
      name: t('second.name'),
      summary: t('second.summary'),
      description: t('second.description'),
      image: screenshot2,
      icon: <SparklesIcon />,
    },
    {
      name: t('third.name'),
      summary: t('third.summary'),
      description: t('third.description'),
      image: screenshot3,
      icon: <ChartBarIcon />,
    },
    {
      name: t('fourth.name'),
      summary: t('fourth.summary'),
      description: t('fourth.description'),
      image: screenshot4,
      icon: <RocketLaunchIcon />,
    },
  ]

  return (
    <section
      id="services"
      aria-label="Features for simplifying everyday business tasks"
      className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <Heading as="h2" dark>
            {t('heading')}
          </Heading>
          <Paragraph dark>{t('subtitle')}</Paragraph>
        </div>
        <ServicesMobile features={features} />
        <ServicesDesktop features={features} />
      </Container>
    </section>
  )
}
