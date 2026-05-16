import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#F0F8FF',
    width: '100%',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  const focusStyle = { borderColor: 'rgba(0,212,255,0.5)' }

  return (
    <section id="contact" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #061020 100%)' }}>
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
            Let's Talk
          </span>
          <h2
            className="font-display text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF', lineHeight: 1.1 }}
          >
            Ready for Crystal{' '}
            <span className="shimmer-text italic">Clarity?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF' }}
              >
                Get in Touch
              </h3>
              <p style={{ color: 'rgba(240,248,255,0.55)', lineHeight: 1.8 }}>
                Whether it's a one-off residential clean or a full commercial maintenance
                contract, we'd love to hear from you.
              </p>
            </div>

            {[
              { Icon: Phone, label: 'Call Us', value: '+1 (604) 555-0192', href: 'tel:+16045550192' },
              { Icon: Mail, label: 'Email Us', value: 'hello@crystalclear.co', href: 'mailto:hello@crystalclear.co' },
              { Icon: MapPin, label: 'Service Area', value: 'Vancouver & Metro BC', href: null },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.25)',
                  }}
                >
                  <Icon size={18} color="#00D4FF" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: 'rgba(240,248,255,0.4)' }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-sm font-medium hover:text-cyan-400 transition-colors" style={{ color: '#F0F8FF' }}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: '#F0F8FF' }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Hours */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#FFB347' }}>
                Business Hours
              </p>
              {[
                { day: 'Monday – Friday', hours: '7:00am – 6:00pm' },
                { day: 'Saturday', hours: '8:00am – 4:00pm' },
                { day: 'Sunday', hours: 'Emergency only' },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-sm py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'rgba(240,248,255,0.55)' }}>{day}</span>
                  <span style={{ color: '#F0F8FF' }}>{hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {sent ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.4)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'rgba(240,248,255,0.55)' }}>
                    We'll be in touch within 2 business hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(240,248,255,0.45)' }}>
                        Name
                      </label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handle}
                        placeholder="Your name"
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(240,248,255,0.45)' }}>
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handle}
                        placeholder="your@email.com"
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(240,248,255,0.45)' }}>
                        Phone
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handle}
                        placeholder="+1 (000) 000-0000"
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(240,248,255,0.45)' }}>
                        Service
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handle}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      >
                        <option value="" style={{ background: '#0A1628' }}>Select service</option>
                        <option value="residential" style={{ background: '#0A1628' }}>Residential</option>
                        <option value="commercial" style={{ background: '#0A1628' }}>Commercial</option>
                        <option value="post-construction" style={{ background: '#0A1628' }}>Post-Construction</option>
                        <option value="maintenance" style={{ background: '#0A1628' }}>Maintenance Plan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(240,248,255,0.45)' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handle}
                      placeholder="Tell us about your property and what you need..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                      onFocus={(e) => Object.assign(e.target.style, { ...focusStyle, resize: 'vertical' })}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
                      color: '#0A1628',
                      boxShadow: '0 4px 20px rgba(0,212,255,0.35)',
                    }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,212,255,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={16} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
