import { scrollTo } from './scrollTo'
import styles from './Hero.module.css'

const PARTICLES = [
  { cx: 80,  cy: 70,  r: 14, opacity: 0.85, delay: '0s',   dur: '3.2s' },
  { cx: 180, cy: 45,  r: 7,  opacity: 0.5,  delay: '0.4s', dur: '4s'   },
  { cx: 240, cy: 110, r: 20, opacity: 0.9,  delay: '0.8s', dur: '2.8s' },
  { cx: 130, cy: 155, r: 10, opacity: 0.6,  delay: '0.2s', dur: '3.5s' },
  { cx: 60,  cy: 190, r: 5,  opacity: 0.4,  delay: '1s',   dur: '4.2s' },
  { cx: 200, cy: 185, r: 16, opacity: 0.75, delay: '0.6s', dur: '3s'   },
  { cx: 105, cy: 115, r: 8,  opacity: 0.55, delay: '1.2s', dur: '3.8s' },
  { cx: 160, cy: 210, r: 6,  opacity: 0.45, delay: '0.9s', dur: '4.5s' },
  { cx: 50,  cy: 130, r: 11, opacity: 0.65, delay: '0.3s', dur: '3.3s' },
  { cx: 220, cy: 150, r: 4,  opacity: 0.35, delay: '1.5s', dur: '5s'   },
  { cx: 145, cy: 80,  r: 9,  opacity: 0.7,  delay: '0.7s', dur: '2.6s' },
  { cx: 85,  cy: 240, r: 13, opacity: 0.8,  delay: '1.1s', dur: '3.6s' },
  { cx: 190, cy: 255, r: 5,  opacity: 0.4,  delay: '1.8s', dur: '4.8s' },
  { cx: 260, cy: 200, r: 8,  opacity: 0.6,  delay: '0.5s', dur: '3.1s' },
  { cx: 35,  cy: 80,  r: 6,  opacity: 0.5,  delay: '1.4s', dur: '4.1s' },
]

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>

        {/* Left: Copy */}
        <div className={styles.copy}>
          <div className={styles.badge}><span className="tag">Technical Cleanliness Expert</span></div>
          <h1 className={styles.h1}>
            Precision.<br />
            Cleanliness.<br />
            <em className={styles.em}>Excellence.</em>
          </h1>
          <p className={styles.sub}>
            Specialist consultancy delivering world-class technical cleanliness solutions — from contamination analysis to ISO 16232 and VDA 19 compliance, helping manufacturers achieve the stringent cleanliness standards.
          </p>
          <div className={styles.actions}>
            <button onClick={() => scrollTo('contact')} className="btn btn-primary">Get a Consultation →</button>
            <button onClick={() => scrollTo('about')}   className="btn btn-outline">Learn More</button>
          </div>
        </div>

        {/* Right: Particle Card */}
        <div className={styles.visual}>
          <div className={styles.expertCard}>
            <div className={styles.availBadge}>
              <span className={styles.dot} /> Available for Consultation
            </div>

            {/* Particle microscope visualization */}
            <div className={styles.microscopeWrap}>
              <svg viewBox="0 0 300 300" className={styles.microscopeSvg} aria-hidden="true">
                <circle cx="150" cy="150" r="138" fill="none" stroke="rgba(212,43,26,0.15)" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="118" fill="rgba(212,43,26,0.03)" stroke="rgba(212,43,26,0.1)" strokeWidth="1" />
                <line x1="32" y1="150" x2="268" y2="150" stroke="rgba(212,43,26,0.08)" strokeWidth="1" />
                <line x1="150" y1="32" x2="150" y2="268" stroke="rgba(212,43,26,0.08)" strokeWidth="1" />
                <circle cx="150" cy="150" r="60" fill="none" stroke="rgba(212,43,26,0.06)" strokeWidth="1" strokeDasharray="4 4" />
                {PARTICLES.map((p, i) => (
                  <circle key={i} cx={p.cx + 10} cy={p.cy + 10} r={p.r} fill="#D42B1A" opacity={p.opacity}>
                    <animate attributeName="opacity" values={`${p.opacity};${p.opacity * 0.4};${p.opacity}`} dur={p.dur} begin={p.delay} repeatCount="indefinite" />
                    <animate attributeName="r" values={`${p.r};${p.r * 1.15};${p.r}`} dur={p.dur} begin={p.delay} repeatCount="indefinite" />
                  </circle>
                ))}
                <line x1="144" y1="150" x2="156" y2="150" stroke="rgba(212,43,26,0.5)" strokeWidth="1.5" />
                <line x1="150" y1="144" x2="150" y2="156" stroke="rgba(212,43,26,0.5)" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="3" fill="rgba(212,43,26,0.6)" />
              </svg>
              <div className={styles.microscopeLabel}>Particle Analysis View</div>
            </div>

            <div className={styles.standards}>
              {['ISO 16232', 'VDA 19.1', 'VDA 19.2'].map(s => (
                <span key={s} className={styles.stdBadge}>{s}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
