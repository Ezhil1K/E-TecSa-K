import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EKLogo from '../../components/EKLogo'
import { login } from '../../utils/adminAuth'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const res  = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Invalid password'); setLoading(false); return }
      login(data.token, data.expires)
      navigate('/admin/invoice')
    } catch {
      setError('Connection error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <EKLogo size={48} />
          <div>
            <div className={styles.brandName}>E-TecSa-K</div>
            <div className={styles.brandSub}>Admin Portal</div>
          </div>
        </div>
        <h1 className={styles.title}>Invoice Generator</h1>
        <p className={styles.desc}>Enter your admin password to access the invoice system.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password" placeholder="Admin password"
            value={password} onChange={e => setPassword(e.target.value)}
            className={styles.input} autoFocus required
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Verifying…' : 'Sign In →'}
          </button>
        </form>
        <a href="/" className={styles.back}>← Back to website</a>
      </div>
    </div>
  )
}
