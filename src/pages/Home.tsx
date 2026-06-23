import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import BrowserSupport from '../components/sections/BrowserSupport'
import HowItWorks from '../components/sections/HowItWorks'
import Pricing from '../components/sections/Pricing'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <BrowserSupport />
      <HowItWorks />
      <Pricing />
      <CTA />
    </>
  )
}
