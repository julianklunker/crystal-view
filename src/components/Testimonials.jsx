import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Alexandra Chen',
    role: 'Property Manager, The Residences',
    quote: 'The results are absolutely stunning. Our floor-to-ceiling windows look brand new — you can\'t believe it\'s the same building. The team was professional, fast, and spotless.',
    rating: 5,
    avatar: 'AC',
  },
  {
    name: 'Michael Torres',
    role: 'CEO, Torres Architecture',
    quote: 'We\'ve tried three other companies. None came close. The attention to detail and the streak-free finish on our glass facade is something else entirely. Premium service, premium result.',
    rating: 5,
    avatar: 'MT',
  },
  {
    name: 'Sarah Williams',
    role: 'Homeowner, West Side',
    quote: 'I was skeptical about the price, but watching them work — and seeing the results — I understood. It\'s transformational. My home has never looked this good.',
    rating: 5,
    avatar: 'SW',
  },
  {
    name: 'James Park',
    role: 'Hotel Director, The Grand',
    quote: 'Every quarter, our 22-storey building gets a complete exterior clean. Zero incidents, zero complaints, maximum shine. They\'re the only team I trust with this property.',
    rating: 5,
    avatar: 'JP',
  },
]

function RippleTestimonial({ testimonial, index }) {
  const [ripples, setRipples] = useState([])
  const idRef = useRef(0)

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = idRef.current++
    setRipples((prev) => [...prev, { id, x, y }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 900)
  }

  return (
    <motion.div
      className="glass-card rounded-2xl p-8 relative overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={addRipple}
    >
      {/* Ripple effects */}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'rgba(0,212,255,0.25)',
            transform: 'translate(-50%,-50%)',
            animation: 'ripple 0.9s ease-out forwards',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} fill="#FFB347" color="#FFB347" />
        ))}
      </div>

      {/* Quote mark */}
      <div
        className="absolute top-6 right-7 font-display text-8xl leading-none select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: 'rgba(0,212,255,0.08)',
          lineHeight: 1,
        }}
      >
        "
      </div>

      <p
        className="mb-6 relative z-10"
        style={{ color: 'rgba(240,248,255,0.8)', lineHeight: 1.75, fontSize: '0.95rem', fontStyle: 'italic' }}
      >
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,100,180,0.3))',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#00D4FF',
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: '#F0F8FF' }}>{testimonial.name}</p>
          <p className="text-xs" style={{ color: 'rgba(240,248,255,0.45)' }}>{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #0D1F3C 0%, #0A1628 100%)' }}>
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
              background: 'rgba(255,179,71,0.1)',
              border: '1px solid rgba(255,179,71,0.3)',
              color: '#FFB347',
            }}
          >
            Client Love
          </span>
          <h2
            className="font-display text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF', lineHeight: 1.1 }}
          >
            What Our Clients{' '}
            <span className="shimmer-text italic">Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <RippleTestimonial key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
