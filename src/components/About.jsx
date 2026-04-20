import { Link } from 'react-router-dom'
import EKLogo from './EKLogo'
import useReveal from './useReveal'
import styles from './About.module.css'

const SKILLS = [
  'ISO 16232 & VDA 19 — extraction, analysis, and reporting',
  'Particle counting, gravimetric analysis, SEM/EDX investigation',
  'Cleaning process',
  'OEM cleanliness requirement interpretation and supplier support',
  'Technical cleanliness lab design and team development',
]

export default function About() {
  const ref = useReveal()
  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className="section-wrap">
        <div className={styles.grid}>

          {/* Image panel */}
          <div className={styles.imgWrap + ' reveal'}>
            <div className={styles.imgBg}>
              <div className={styles.imgLogo}><EKLogo size={160} /></div>
            </div>
            <div className={styles.accent}>
              <div className={styles.accentNum}>ISO</div>
              <div className={styles.accentLabel}>16232 Expert</div>
            </div>
          </div>

          {/* Content */}
          <div className={styles.content + ' reveal'}>
            <span className="tag">About Me</span>
            <h2 className={styles.h2}>
              Passionate About<br />
              <span className={styles.red}>Technical Cleanliness — TecSa</span>
            </h2>
            <p className={styles.lead}>
              I am an independent technical cleanliness consultant with deep expertise in contamination control, particle analysis, and industrial cleaning processes across the automotive, aerospace, and precision engineering sectors.
            </p>
            <p className={styles.lead}>
              With over 15 years of hands-on industrial experience, I help manufacturers and suppliers close the gap between design intent and production reality — ensuring every component meets the most demanding cleanliness requirements.
            </p>
            <ul className={styles.list}>
              {SKILLS.map(s => <li key={s}>{s}</li>)}
            </ul>
            <Link to="/#contact" className="btn btn-primary">Work With Me →</Link>
          </div>

        </div>
      </div>
    </section>
  )
}
