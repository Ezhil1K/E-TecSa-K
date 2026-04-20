import styles from './PrivacyPage.module.css'

export default function PrivacyPage() {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.tag}>Legal</div>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 2026</p>

        <div className={styles.body}>
          <h2>1. Who We Are</h2>
          <p>
            E-TecSa-K is an independent technical cleanliness consultancy operated by EK.
            This website is accessible at <strong>https://e-tec-sa-k.vercel.app</strong>.
            For any privacy-related questions, contact us via the contact form on the homepage.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We only collect information you voluntarily provide through the contact form:
            your name, email address, and message. We do not collect any other personal data.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            Information submitted via the contact form is used solely to respond to your inquiry.
            We do not sell, rent, or share your personal data with third parties.
          </p>

          <h2>4. Analytics</h2>
          <p>
            This website uses Google Analytics (G-M7SLMR3FY8) to understand visitor behaviour
            in aggregate. Google Analytics may collect anonymised data such as pages visited,
            time on site, and approximate location. No personally identifiable information is
            collected through analytics. You can opt out via the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
              Google Analytics opt-out browser add-on
            </a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            This website uses only the cookies set by Google Analytics. No tracking or advertising
            cookies are used. You can disable cookies in your browser settings at any time.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            Contact form submissions are retained only as long as necessary to respond to your
            enquiry and are not stored in any database on this website.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of any personal
            data we hold about you. To exercise these rights, please contact us via the
            homepage contact form.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be reflected
            on this page with an updated date.
          </p>
        </div>
      </div>
    </section>
  )
}
