'use client'

import * as Headless from '@headlessui/react'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import useMeasure, { type RectReadOnly } from 'react-use-measure'
import { Container } from '@/components/Container'
import { Heading, Paragraph, Subheading } from '@/components/Text'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import screenshotKudos from "@/images/screenshots/projects/kudos.png"
import screenshotLGL from "@/images/screenshots/projects/lgl.png"
import screenshotDickens from "@/images/screenshots/projects/charles-dickens.png"
import screenshotBBOWT from "@/images/screenshots/projects/bbowt.png"
import screenshotWordWarbler from "@/images/screenshots/projects/word-warbler.png"

function ProjectCard({
  name,
  type,
  img,
  children,
  bounds,
  scrollX,
  ...props
}: {
  img: string
  name: string
  type: string
  children: React.ReactNode
  bounds: RectReadOnly
  scrollX: MotionValue<number>
} & HTMLMotionProps<'div'>) {
  let ref = useRef<HTMLDivElement | null>(null)

  let computeOpacity = useCallback(() => {
    let element = ref.current
    if (!element || bounds.width === 0) return 1

    let rect = element.getBoundingClientRect()

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-[9/16] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[3/4] sm:w-96"
    >
      <Image
        alt=""
        src={img}
        className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%"
      />
      <figure className="relative p-10">
        <p className="relative text-xl/7 text-white">
          {children}
        </p>
        <figcaption className="mt-6 border-t border-white/20 pt-6">
          <p className="text-sm/6 font-medium text-white">{name}</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
              {type}
            </span>
          </p>
        </figcaption>
      </figure>
    </motion.div>
  )
}

function CallToAction() {
  return (
    <div>
      <p className="max-w-sm text-sm/6 text-gray-600">
        Join the best sellers in the business and start using Radiant to hit
        your targets today.
      </p>
      <div className="mt-2">
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
        >
          Get started
          <ArrowLongRightIcon className="size-5" />
        </Link>
      </div>
    </div>
  )
}

export function Projects() {
  let scrollRef = useRef<HTMLDivElement | null>(null)
  let { scrollX } = useScroll({ container: scrollRef })
  let [setReferenceWindowRef, bounds] = useMeasure()
  let [activeIndex, setActiveIndex] = useState(0)
  const t = useTranslations("projects")

  useMotionValueEvent(scrollX, 'change', (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current!.children[0].clientWidth))
  })

  function scrollTo(index: number) {
    let gap = 32
    let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth
    scrollRef.current!.scrollTo({ left: (width + gap) * index })
  }


  const projects = [
    {
      img: screenshotKudos,
      name: t('first.name'),
      type: t('first.type'),
      description:
        t('first.description'),
    },
    {
      img: screenshotLGL,
      name: t('second.name'),
      type: t('second.type'),
      description:
        t('second.description'),
    },
    {
      img: screenshotBBOWT,
      name: t('third.name'),
      type: t('third.type'),
      description:
        t('third.description'),
    },
    {
      img: screenshotWordWarbler,
      name: t('fourth.name'),
      type: t('fourth.type'),
      description:
        t('fourth.description'),
    },
    {
      img: screenshotDickens,
      name: t('fifth.name'),
      type: t('fifth.type'),
      description:
        t('fifth.description'),
    },
  ]

  return (
    <section id="projects" className="overflow-hidden py-32">
      <Container>
        <div ref={setReferenceWindowRef} className="mx-auto md:text-center" >
          <Heading as="h2" className="mt-2">
            {t('heading')}
          </Heading>
          <Paragraph>
            {t("subtitle")}
          </Paragraph>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          'mt-16 flex gap-8 px-[var(--scroll-padding)]',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(theme(spacing.6),calc((100vw-theme(maxWidth.2xl))/2))] lg:[--scroll-padding:max(theme(spacing.8),calc((100vw-theme(maxWidth.7xl))/2))]',
        ])}
      >
        {projects.map(({ img, name, type, description }, projectIndex) => (
          <ProjectCard
            key={projectIndex}
            name={name}
            type={type}
            img={img}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => scrollTo(projectIndex)}
          >
            {description}
          </ProjectCard>
        ))}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-end">
          <div className="hidden sm:flex sm:gap-2">
            {projects.map(({ name }, projectIndex) => (
              <Headless.Button
                key={projectIndex}
                onClick={() => scrollTo(projectIndex)}
                data-active={
                  activeIndex === projectIndex ? true : undefined
                }
                aria-label={`Scroll to testimonial from ${name}`}
                className={clsx(
                  'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                  'data-[active]:bg-gray-400 data-[hover]:bg-gray-400',
                  'forced-colors:data-[active]:bg-[Highlight] forced-colors:data-[focus]:outline-offset-4',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
