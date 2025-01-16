import logo from '@/images/im-logo.svg'
import Image from 'next/image'
import React from 'react'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return <Image alt="Logo" src={logo} className={props?.className} />
}
