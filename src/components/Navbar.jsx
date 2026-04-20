import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import EKLogo from './EKLogo'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const navClass = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <div className={styles.inner}>

          {/* Logo */}
          <Link to="/" className={styles.logoWrap} aria-label="E-TecSa-K Home">
            <EKLogo size={44} />
            <div className={styles.logoText}><span>E-TecSa-K</span></div>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            <li><NavLink to="/#about"    className={styles.link}>About Me</NavLink></li>
            <li><NavLink to="/articles"  className={navClass}>Articles</NavLink></li>
            <li><NavLink to="/#contact"  className={`${styles.link} ${styles.cta}`}>Contact Me</NavLink></li>
          </ul>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${open ? styles.open : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer} role="navigation">
          <Link to="/#about"   onClick={() => setOpen(false)} className={styles.drawerLink}>About Me</Link>
          <Link to="/articles" onClick={() => setOpen(false)} className={styles.drawerLink}>Articles</Link>
          <Link to="/#contact" onClick={() => setOpen(false)} className={styles.drawerLink}>Contact Me</Link>
        </div>
      )}
    </>
  )
}
