import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.inner}>
        <div className={styles.text}>
          <strong>We use cookies</strong>
          <p>
            This site uses Google Analytics to understand visitor behaviour in aggregate.
            No personally identifiable information is collected.{' '}
            <a href="/privacy" className={styles.link}>Privacy Policy</a>
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.decline} onClick={decline}>Decline</button>
          <button className={styles.accept} onClick={accept}>Accept</button>
        </div>
      </div>
    </div>
  )
}
