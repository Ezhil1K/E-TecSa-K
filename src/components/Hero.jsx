import { Link } from 'react-router-dom'
import EKLogo from './EKLogo'
import styles from './Hero.module.css'

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
            <Link to="/#contact" className="btn btn-primary">Get a Consultation →</Link>
            <Link to="/#about"   className="btn btn-outline">Learn More</Link>
          </div>
        </div>

        {/* Right: Card */}
        <div className={styles.visual}>
          <div className={styles.expertCard}>
            <div className={styles.availBadge}>
              <span className={styles.dot} /> Available for Consultation
            </div>
            <div className={styles.logoWrap}>
              <EKLogo size={120} />
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
