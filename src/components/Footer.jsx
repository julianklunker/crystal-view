export default function Footer() {
  return (
    <footer
      className="py-12 px-6 text-center"
      style={{
        background: '#061020',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF' }}
        >
          CrystalClear
        </div>
        <p className="text-sm mb-6" style={{ color: 'rgba(240,248,255,0.35)' }}>
          Premium window cleaning services — Vancouver & Metro BC
        </p>
        <div className="flex justify-center gap-6 text-xs mb-6" style={{ color: 'rgba(240,248,255,0.3)' }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
            <a key={t} href="#" className="hover:text-white transition-colors" style={{ color: 'inherit' }}>
              {t}
            </a>
          ))}
        </div>
        <p className="text-xs" style={{ color: 'rgba(240,248,255,0.2)' }}>
          © {new Date().getFullYear()} CrystalClear Window Services. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
