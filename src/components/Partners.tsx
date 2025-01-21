import Image from 'next/image'
import logoPearson from '@/images/logos/pearson.svg'
import logoMuzee from '@/images/logos/muzee.svg'
import logoDeRegentes from '@/images/logos/deregentes.svg'
import logoEarthCalling from '@/images/logos/earthcalling.svg'
import logoBDH from '@/images/logos/bdh.png'
import logoTrias from '@/images/logos/trias.png'
import { useTranslations } from 'next-intl'
import { Paragraph } from './Text'

export function Partners() {
  const t = useTranslations('partners')
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Paragraph className='text-center'>
          {t('heading')}
        </Paragraph>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 text-black sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          <Image
            alt="Pearson"
            src={logoPearson}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            alt="Muzee"
            src={logoMuzee}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            alt="Earth Calling"
            src={logoEarthCalling}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            alt="DeRegentes"
            src={logoDeRegentes}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <Image
            alt="Bibliotheek Den Haag"
            src={logoBDH}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
          <Image
            alt="Stichting Trias"
            src={logoTrias}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>
  )
}
