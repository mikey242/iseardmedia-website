'use client'

import { CheckIcon, LanguageIcon } from '@heroicons/react/24/solid'
import { useTransition } from 'react'
import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/services/locale'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import clsx from 'clsx'
import { useLocale } from 'next-intl'

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string }>
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
        },
        {
          value: 'nl',
          label: 'Nederlands',
        },
      ]}
    />
  )
}

export function LocaleSwitcherSelect({ defaultValue, items }: Props) {
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    console.log(value)
    const locale = value as Locale
    startTransition(() => {
      void setUserLocale(locale)
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
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6">
          <span className="col-start-1 row-start-1 truncate pr-6">
            {items.find((item) => item.value === defaultValue)?.label}
          </span>
          <LanguageIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {items.map((item) => (
            <ListboxOption
              key={item.value}
              value={item.value}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white data-[focus]:outline-none"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {item.label}
              </span>

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
