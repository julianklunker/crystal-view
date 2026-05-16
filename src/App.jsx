import './index.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import BeforeAfter from './components/BeforeAfter'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="before-after">
        <BeforeAfter />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <Pricing />
      <ContactSection />
      <Footer />
    </div>
  )
}
