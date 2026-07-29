const INVOICES_KEY = 'ek_invoices'
const COUNTER_KEY  = 'ek_invoice_counter'
const COMPANY_KEY  = 'ek_company_defaults'

export const DEFAULT_COMPANY = {
  name: 'E-TecSa-K',
  subtitle: 'Technical Cleanliness Consultancy',
  address: '',
  gstin: '',
  email: 'ezhil.1ek@hotmail.com',
  phone: '',
}

export function getCompanyDefaults() {
  try {
    const s = localStorage.getItem(COMPANY_KEY)
    if (s) return { ...DEFAULT_COMPANY, ...JSON.parse(s) }
  } catch {}
  return { ...DEFAULT_COMPANY }
}
export function saveCompanyDefaults(data) {
  localStorage.setItem(COMPANY_KEY, JSON.stringify(data))
}

export function getInvoices() {
  try { return JSON.parse(localStorage.getItem(INVOICES_KEY) || '[]') }
  catch { return [] }
}
export function getInvoice(id) { return getInvoices().find(i => i.id === id) || null }

export function saveInvoice(invoice) {
  const list = getInvoices()
  const idx  = list.findIndex(i => i.id === invoice.id)
  const upd  = { ...invoice, updatedAt: Date.now() }
  if (idx >= 0) list[idx] = upd
  else list.unshift({ ...upd, createdAt: Date.now() })
  localStorage.setItem(INVOICES_KEY, JSON.stringify(list))
  return upd
}
export function deleteInvoice(id) {
  localStorage.setItem(INVOICES_KEY, JSON.stringify(getInvoices().filter(i => i.id !== id)))
}

export function nextInvoiceNumber() {
  const year    = new Date().getFullYear()
  const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0') + 1
  localStorage.setItem(COUNTER_KEY, String(counter))
  return `ETK-${year}-${String(counter).padStart(3, '0')}`
}

export function calcTotals(invoice) {
  const items    = invoice.items || []
  const subtotal = items.reduce((s, it) => s + (parseFloat(it.qty)||0) * (parseFloat(it.rate)||0), 0)
  const taxAmt   = subtotal * (parseFloat(invoice.taxRate)||0) / 100
  return { subtotal, taxAmt, total: subtotal + taxAmt }
}

export function fmtCurrency(val, currency = 'INR') {
  const locale = currency === 'INR' ? 'en-IN' : 'de-DE'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(val || 0)
}

export function fmtDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function createBlankInvoice() {
  const today   = new Date()
  const due     = new Date(today); due.setDate(due.getDate() + 30)
  const fmt     = d => d.toISOString().split('T')[0]
  const num     = nextInvoiceNumber()
  return {
    id: num, invoiceNumber: num,
    date: fmt(today), dueDate: fmt(due), terms: 'Net 30 Days', currency: 'INR',
    company: getCompanyDefaults(),
    client: { name: '', address: '', vatId: '' },
    items: [{ id: Date.now(), description: '', qty: 1, rate: 0 }],
    taxRate: 0,
    taxLabel: 'GST (0% — Exempt)',
    taxNote: 'Export of services — GST @ 0% (Zero-rated). Reverse charge may apply per recipient country regulations.',
    banking: { bankName: '', accountName: '', accountNo: '', ifscCode: '', swiftBic: '', iban: '' },
    notes: 'Payment is due within 30 days of invoice date. Please quote the invoice number in the payment reference. For queries, contact ezhil.1ek@hotmail.com.',
    status: 'draft',
  }
}
