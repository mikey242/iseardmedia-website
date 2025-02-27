import { clsx } from 'clsx'
import React from 'react'
import { GridPattern } from '@/components/GridPattern'

let variant1 =
  'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#2BFF88] from-10% via-[#2BD2FF] via-52% to-[#FA8BFF] to-90% sm:bg-[linear-gradient(190deg,var(--tw-gradient-stops))]'
let variant2 =
  'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#FA8BFF] from-0% via-[#FF8E25] via-50% to-[#EFFFC8] to-100% sm:bg-[linear-gradient(45deg,var(--tw-gradient-stops))]'
let variant3 =
  'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff]'

let active = variant2

export function Gradient({
  className,
  showGrid = false,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  className: string
  showGrid?: boolean // Optional, since you provide a default value
}) {
  const mask =
    '[mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]'
  return (
    <div className={clsx(className, '-z-10 overflow-hidden')}>
      <div {...props} className={clsx(active, 'h-full w-full')} />
      {showGrid && (
        <GridPattern
          className="absolute inset-2 top-0 left-0 h-full w-full fill-neutral-50 stroke-neutral-950/5 opacity-10"
          yOffset={-75}
          interactive
          randomFade
        />
      )}
    </div>
  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -top-44 -right-60 h-60 w-[36rem] transform-gpu',
          active,
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
