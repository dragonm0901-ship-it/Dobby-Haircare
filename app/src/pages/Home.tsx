import { useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'

import GrainOverlay from '@/components/GrainOverlay'
import Preloader from '@/components/Preloader'
import Hero from '@/sections/Hero'
import Marquee from '@/sections/Marquee'
import About from '@/sections/About'
import Ingredients from '@/sections/Ingredients'
import Shop from '@/sections/Shop'
import Results from '@/sections/Results'
import Testimonials from '@/sections/Testimonials'
import Blog from '@/sections/Blog'
import FAQ from '@/sections/FAQ'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useSmoothScroll()
  usePageMeta({
    title: 'dobby Haircare — Science-Backed Premium Shampoo & Scalp Care',
    description: 'Discover dobby\'s science-backed haircare collection. Premium formulas crafted with 98% natural ingredients for transformative scalp health and beautiful hair.',
  })

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      <GrainOverlay />

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple focus:text-white focus:rounded-full focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>

      <div className={`relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <main id="main-content">
          <Hero />
          <Marquee />
          <About />
          <Ingredients />
          <Shop />
          <Results />
          <Testimonials />
          <Blog />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
