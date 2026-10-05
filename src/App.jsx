import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Method from './components/Method.jsx'
import Impact from './components/Impact.jsx'
import Founder from './components/Founder.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <Method />
        <Impact />
        <Founder />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
