'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import { useTransition } from 'react'
import { Locale } from '@/i18n/config'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import '../../node_modules/flag-icons/css/flag-icons.min.css'

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string; class: string }>
}

export default function LocaleSwitcher() {
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: 'English',
          class: 'fi-gb',
        },
        {
          value: 'nl',
          label: 'Nederlands',
          class: 'fi-nl',
        },
      ]}
    />
  )
}

export function LocaleSwitcherSelect({ defaultValue, items }: Props) {
  const t = useTranslations('header')
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    console.log(value)
    const locale = value as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: locale },
      )
    })
  }

  return (
    <Listbox defaultValue={defaultValue} onChange={onChange}>
      <div
        className={clsx(
          'relative',
          isPending && 'pointer-events-none opacity-60',
        )}
      >
        <ListboxButton
          aria-label={t('language')}
          className="grid w-full cursor-default grid-cols-1 rounded-md bg-white p-2 text-left text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
        >
          <span
            className={clsx(
              'fi col-start-1 row-start-1 truncate rounded-md pr-6 text-2xl',
              items.find((item) => item.value === defaultValue)?.class,
            )}
          ></span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {items.map((item) => (
            <ListboxOption
              key={item.value}
              aria-label={item.label}
              value={item.value}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white data-[focus]:outline-none"
            >
              <span
                className={clsx('fi mr-2 block truncate rounded', item.class)}
              ></span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
