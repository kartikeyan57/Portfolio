import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroSequence from './components/IntroSequence'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import FloatingAudioPlayer from './components/FloatingAudioPlayer'
import { AudioProvider } from './context/AudioProvider'
import Hero from './sections/Hero'
import About from './sections/About'
import EngineeringDashboard from './sections/EngineeringDashboard'
import ExperienceTimeline from './sections/ExperienceTimeline'
import ProjectGallery from './sections/ProjectGallery'
import Skills from './sections/Skills'
import ResumeCTA from './sections/ResumeCTA'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    if (reducedMotion) setIntroDone(true)
  }, [reducedMotion])

  return (
    <AudioProvider>
      <AnimatePresence>{!introDone && <IntroSequence onDone={() => setIntroDone(true)} />}</AnimatePresence>

      <CustomCursor />
      <Navbar />
      <FloatingAudioPlayer />

      {/* Global atmospheric ambient lights */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div
          className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, #8DD8FF 40%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 -left-40 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF8A3D 0%, #FFD84D 40%, transparent 70%)' }}
        />
        <div
          className="absolute top-2/3 right-10 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0F766E 0%, #2563EB 40%, transparent 70%)' }}
        />
      </div>

      <main>
        <Hero />
        <EngineeringDashboard />
        <About />
        <ExperienceTimeline />
        <ProjectGallery />
        <Skills />
        <ResumeCTA />
        <Contact />
      </main>

      <Footer />
    </AudioProvider>
  )
}
