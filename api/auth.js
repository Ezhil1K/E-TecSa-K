const crypto = require('crypto')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password } = req.body || {}
  const adminPassword = process.env.INVOICE_PASSWORD

  if (!adminPassword) return res.status(500).json({ error: 'Server not configured. Set INVOICE_PASSWORD env var.' })
  if (!password) return res.status(400).json({ error: 'Password required' })

  const inputHash = crypto.createHash('sha256').update(password).digest('hex')
  const adminHash = crypto.createHash('sha256').update(adminPassword).digest('hex')

  let isValid = false
  try {
    isValid = crypto.timingSafeEqual(Buffer.from(inputHash, 'hex'), Buffer.from(adminHash, 'hex'))
  } catch { isValid = false }

  if (!isValid) return res.status(401).json({ error: 'Invalid password' })

  const secret = process.env.INVOICE_SECRET || 'ek-invoice-secret-2026'
  const expires = Date.now() + 24 * 60 * 60 * 1000
  const token = crypto.createHmac('sha256', secret).update(String(expires)).digest('hex')

  return res.status(200).json({ token: `${expires}.${token}`, expires })
}
