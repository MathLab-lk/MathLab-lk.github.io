import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Method from './components/Method.jsx'
import Impact from './components/Impact.jsx'
import CompanionTeaser from './components/CompanionTeaser.jsx'
import Founder from './components/Founder.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CompanionApp from './companion/CompanionApp.jsx'
import { useHashRoute, useAnchorScrollFix } from './companion/useHashRoute.js'

export default function App() {
  const route = useHashRoute()
  useAnchorScrollFix(route)
  const isCompanion = route.view === 'companion' || route.view === 'game'

  const skipToContent = (e) => {
    e.preventDefault()
    const main = document.getElementById('main')
    if (main) {
      main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
      main.scrollIntoView()
    }
  }

  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToContent}>Skip to content</a>
      <Nav />
      <main id="main">
        {isCompanion ? (
          <CompanionApp route={route} />
        ) : (
          <>
            <Hero />
            <TrustBar />
            <Method />
            <Impact />
            <CompanionTeaser />
            <Founder />
            <Testimonials />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
