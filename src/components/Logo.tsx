import logo from '@/images/logo-cd.svg'
import Image from 'next/image'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <Image alt="Logo" src={logo} className={props?.className} />
  )
}
