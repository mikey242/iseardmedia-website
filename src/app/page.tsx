import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Partners } from '@/components/Partners'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'

export default function Home() {
  return (
    <div className="selection:bg-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <Partners />
        <Services />
        <Projects/>
        <About />
      </main>
      <Footer />
    </div>
  )
}
