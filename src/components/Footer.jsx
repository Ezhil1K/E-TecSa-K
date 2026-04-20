import { Link } from 'react-router-dom'
import EKLogo from './EKLogo'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.top}>

          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logoWrap} aria-label="Home">
              <EKLogo size={40} />
              <div className={styles.logoText}><span>E-TecSa-K</span></div>
            </Link>
            <p className={styles.tagline}>
              Independent consultancy for technical cleanliness, contamination control, and industrial purity standards.
            </p>
            <div className={styles.socials}>
              <a className={styles.socialBtn} href="#" aria-label="LinkedIn">in</a>
              <a className={styles.socialBtn} href="#contact" aria-label="Contact">✉</a>
              <a className={styles.socialBtn} href="#" aria-label="ResearchGate">Rg</a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Services</div>
            <ul>
              {['Contamination Analysis','Cleanliness Audits','Process Optimization','Lab Setup','Training'].map(s => (
                <li key={s}><Link to="/#services">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Resources</div>
            <ul>
              <li><Link to="/articles">All Articles</Link></li>
              <li><Link to="/articles">Technical Guides</Link></li>
              <li><Link to="/articles">Case Studies</Link></li>
              <li><Link to="/articles">ISO 16232 Info</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Company</div>
            <ul>
              <li><Link to="/#about">About Me</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} E-TecSa-K. All rights reserved.</span>
          <span>Crafted with precision &amp; passion.</span>
        </div>
      </div>
    </footer>
  )
}
