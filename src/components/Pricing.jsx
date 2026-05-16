import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Essential',
    price: '149',
    period: 'per visit',
    description: 'Perfect for standard residential homes',
    features: [
      'Up to 20 windows',
      'Exterior cleaning only',
      'Standard squeegee finish',
      'Streak-free guarantee',
      '48hr scheduling',
    ],
    accent: 'rgba(240,248,255,0.15)',
    border: 'rgba(240,248,255,0.1)',
    cta: 'Book Essential',
    ctaStyle: { background: 'rgba(255,255,255,0.1)', color: '#F0F8FF', border: '1px solid rgba(255,255,255,0.2)' },
    popular: false,
  },
  {
    name: 'Premium',
    price: '349',
    period: 'per visit',
    description: 'Our most popular — full home treatment',
    features: [
      'Unlimited windows',
      'Interior & exterior',
      'Hard water stain removal',
      'Frame & sill deep clean',
      'Priority 24hr scheduling',
      'Monthly plan available',
    ],
    accent: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.4)',
    cta: 'Book Premium',
    ctaStyle: { background: 'linear-gradient(135deg, #00D4FF, #0099CC)', color: '#0A1628' },
    popular: true,
  },
  {
    name: 'Commercial',
    price: 'Custom',
    period: 'tailored quote',
    description: 'High-rise, commercial & property portfolios',
    features: [
      'Full building assessment',
      'Rope access certified team',
      'Quarterly maintenance plans',
      'Dedicated account manager',
      'Insurance documentation',
      '24/7 emergency response',
    ],
    accent: 'rgba(255,179,71,0.1)',
    border: 'rgba(255,179,71,0.3)',
    cta: 'Get a Quote',
    ctaStyle: { background: 'rgba(255,179,71,0.15)', color: '#FFB347', border: '1px solid rgba(255,179,71,0.4)' },
    popular: false,
  },
]

function PricingCard({ plan, index }) {
  return (
    <motion.div
      className="relative rounded-3xl p-8 flex flex-col"
      style={{
        background: plan.accent,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${plan.border}`,
        boxShadow: plan.popular
          ? '0 0 60px rgba(0,212,255,0.15), 0 20px 60px rgba(0,0,0,0.4)'
          : '0 4px 30px rgba(0,0,0,0.3)',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {plan.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
            color: '#0A1628',
            whiteSpace: 'nowrap',
          }}
        >
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3
          className="font-bold text-lg mb-1"
          style={{ color: plan.popular ? '#00D4FF' : plan.name === 'Commercial' ? '#FFB347' : '#F0F8FF' }}
        >
          {plan.name}
        </h3>
        <p className="text-sm" style={{ color: 'rgba(240,248,255,0.5)' }}>{plan.description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          {plan.price !== 'Custom' && (
            <span style={{ color: 'rgba(240,248,255,0.5)', fontSize: '1.2rem' }}>$</span>
          )}
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: plan.price === 'Custom' ? '2rem' : '3rem',
              fontWeight: 900,
              color: '#F0F8FF',
              lineHeight: 1,
            }}
          >
            {plan.price}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: 'rgba(240,248,255,0.4)', letterSpacing: '0.05em' }}>
          {plan.period}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(240,248,255,0.75)' }}>
            <Check size={15} color="#00D4FF" className="shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <motion.a
        href="#contact"
        className="w-full py-3.5 rounded-xl text-sm font-semibold text-center block transition-all"
        style={plan.ctaStyle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {plan.cta}
      </motion.a>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6" style={{ background: '#0A1628' }}>
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
            Transparent Pricing
          </span>
          <h2
            className="font-display text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF', lineHeight: 1.1 }}
          >
            Simple, Honest{' '}
            <span className="shimmer-text italic">Rates</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((p, i) => (
            <PricingCard key={p.name} plan={p} index={i} />
          ))}
        </div>

        <motion.p
          className="text-center mt-10 text-sm"
          style={{ color: 'rgba(240,248,255,0.35)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          All prices include GST. Satisfaction guaranteed or we re-clean for free.
        </motion.p>
      </div>
    </section>
  )
}
