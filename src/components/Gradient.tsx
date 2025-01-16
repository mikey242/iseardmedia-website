import { clsx } from 'clsx'
import React from 'react'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  let variant1 =
    'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#2BFF88] from-[10%] via-[#2BD2FF] via-[52%] to-[#FA8BFF] to-[90%] sm:bg-[linear-gradient(190deg,var(--tw-gradient-stops))]'
  let variant2 =
    'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#FA8BFF] from-[0%] via-[#FF8E25] via-[50%] to-[#EFFFC8] to-[100%] sm:bg-[linear-gradient(45deg,var(--tw-gradient-stops))]'

  return <div {...props} className={clsx(className, variant1)} />
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0',
          'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff]',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
