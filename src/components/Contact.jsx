import { useState } from 'react'
import useReveal from './useReveal'
import styles from './Contact.module.css'

const SERVICES = [
  'Contamination Analysis', 'Cleanliness Audit',
  'Process Optimization',  'Lab Setup & Validation',
  'Training & Workshops',  'Technical Reporting', 'Other',
]

export default function Contact() {
  const ref = useReveal()
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState('')
  const [form, setForm]     = useState({ fname:'', lname:'', email:'', company:'', service:'', message:'' })

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok === false) throw new Error(data.error || 'Something went wrong')
      setStatus('sent')
      setForm({ fname:'', lname:'', email:'', company:'', service:'', message:'' })
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className={styles.glow} />
      <div className="section-wrap">
        <div className={styles.grid}>
          <div className={styles.info + ' reveal'}>
            <span className="tag">Get In Touch</span>
            <h2 className={styles.h2}>
              Let's Discuss Your<br />
              <span className={styles.red}>Cleanliness Challenge</span>
            </h2>
            <p className={styles.lead}>
              Whether you need an audit, lab setup, process review, or training, I'd love to help. Send a message and I'll respond within 24 hours.
            </p>
            <div className={styles.items}>
              {[
                { icon: '🌍', label: 'Availability',  value: 'Remote & On-site — Worldwide' },
                { icon: '⏱️', label: 'Response Time', value: 'Within 24 hours' },
              ].map(i => (
                <div key={i.label} className={styles.item}>
                  <div className={styles.itemIcon}>{i.icon}</div>
                  <div>
                    <div className={styles.itemLabel}>{i.label}</div>
                    <div className={styles.itemValue}>{i.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formWrap + ' reveal'}>
            {status === 'sent' ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I will be in touch within 24 hours.</p>
                <button className="btn btn-outline-red" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="fname">First Name</label>
                    <input id="fname" name="fname" type="text" placeholder="Jane" value={form.fname} onChange={handle} required />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="lname">Last Name</label>
                    <input id="lname" name="lname" type="text" placeholder="Smith" value={form.lname} onChange={handle} required />
                  </div>
                </div>
                <div className={styles.group}>
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handle} required />
                </div>
                <div className={styles.group}>
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" placeholder="Your Company (optional)" value={form.company} onChange={handle} />
                </div>
                <div className={styles.group}>
                  <label htmlFor="service">Service Interest</label>
                  <select id="service" name="service" value={form.service} onChange={handle}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className={styles.group}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell me about your project or challenge..." value={form.message} onChange={handle} required />
                </div>
                {error && <p className={styles.errorMsg}>{error}</p>}
                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
