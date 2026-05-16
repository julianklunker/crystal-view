import { motion } from 'framer-motion'
import { Sparkles, Building2, HomeIcon, Droplets, Wind, Shield } from 'lucide-react'

const services = [
  {
    icon: HomeIcon,
    title: 'Residential Premium',
    desc: 'Streak-free clarity for luxury homes. Interior & exterior, all storey heights. We protect your property while delivering spotless results.',
    accent: '#00D4FF',
  },
  {
    icon: Building2,
    title: 'Commercial High-Rise',
    desc: 'Rope-access certified technicians for commercial towers and office buildings. Minimal disruption, maximum brilliance.',
    accent: '#FFB347',
  },
  {
    icon: Droplets,
    title: 'Soft Wash & Rinse',
    desc: 'Pure water technology removes mineral deposits, hard water stains, and oxidation without harsh chemicals or scratching.',
    accent: '#00D4FF',
  },
  {
    icon: Wind,
    title: 'Post-Construction',
    desc: 'Specialist cleaning after renovation or new builds. We eliminate silicone, mortar, paint spots and construction grime.',
    accent: '#FFB347',
  },
  {
    icon: Sparkles,
    title: 'Maintenance Plans',
    desc: 'Monthly, quarterly, or custom schedules. Priority booking, discounted rates, and a dedicated account manager.',
    accent: '#00D4FF',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    desc: '$5M liability coverage, WCB certified, and ROPE-1 accredited. You\'re completely protected on every job.',
    accent: '#FFB347',
  },
]

function ServiceCard({ service, index }) {
  const Icon = service.icon
  return (
    <motion.div
      className="glass-card rounded-2xl p-7 flex flex-col gap-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${service.accent}22, ${service.accent}11)`,
          border: `1px solid ${service.accent}44`,
        }}
      >
        <Icon size={22} color={service.accent} />
      </div>
      <h3
        className="font-display text-xl font-bold"
        style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF' }}
      >
        {service.title}
      </h3>
      <p style={{ color: 'rgba(240,248,255,0.62)', lineHeight: 1.7, fontSize: '0.9rem' }}>
        {service.desc}
      </p>
      <motion.span
        className="mt-auto text-sm font-semibold cursor-pointer"
        style={{ color: service.accent }}
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        Learn more →
      </motion.span>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D1F3C 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00D4FF',
            }}
          >
            What We Do
          </span>
          <h2
            className="font-display text-5xl md:text-6xl font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF', lineHeight: 1.1 }}
          >
            Services Built for{' '}
            <span className="shimmer-text italic">Perfection</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'rgba(240,248,255,0.55)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Every job is treated as a showcase. We use professional-grade tools,
            pure water systems, and decades of squeegee expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
