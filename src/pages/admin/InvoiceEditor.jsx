import { useState, useRef } from 'react'
import InvoiceTemplate from '../../components/invoice/InvoiceTemplate'
import { saveInvoice, calcTotals, fmtCurrency } from '../../utils/invoiceStorage'
import styles from './InvoiceEditor.module.css'

const CURRENCIES = ['EUR', 'USD', 'GBP', 'INR', 'AED']
const STATUSES   = ['draft', 'sent', 'paid']

export default function InvoiceEditor({ invoice: initial, onBack }) {
  const [inv, setInv]         = useState(initial)
  const [tab, setTab]         = useState('form') // 'form' | 'preview'
  const [saved, setSaved]     = useState(false)
  const printRef              = useRef()

  function update(path, value) {
    setInv(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
    setSaved(false)
  }

  function updateItem(id, field, value) {
    setInv(prev => ({
      ...prev,
      items: prev.items.map(it => it.id === id ? { ...it, [field]: value } : it)
    }))
    setSaved(false)
  }

  function addItem() {
    setInv(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), description: '', qty: 1, rate: 0 }]
    }))
  }

  function removeItem(id) {
    if (inv.items.length <= 1) return
    setInv(prev => ({ ...prev, items: prev.items.filter(it => it.id !== id) }))
  }

  function handleSave() {
    saveInvoice(inv)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handlePrint() {
    setTab('preview')
    setTimeout(() => window.print(), 300)
  }

  const { subtotal, taxAmt, total } = calcTotals(inv)

  return (
    <div className={styles.page}>

      {/* Top bar */}
      <header className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← All Invoices</button>
        <div className={styles.topbarCenter}>
          <span className={styles.invNum}>{inv.invoiceNumber}</span>
          <select
            value={inv.status}
            onChange={e => update('status', e.target.value)}
            className={styles.statusSelect}
            style={{ color: inv.status==='paid'?'#22c55e':inv.status==='sent'?'#3b82f6':'#f59e0b' }}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className={styles.topbarRight}>
          <div className={styles.tabs}>
            <button className={tab==='form'?styles.tabActive:styles.tab} onClick={() => setTab('form')}>✏️ Edit</button>
            <button className={tab==='preview'?styles.tabActive:styles.tab} onClick={() => setTab('preview')}>👁 Preview</button>
          </div>
          <button className={styles.saveBtn} onClick={handleSave}>{saved ? '✓ Saved!' : 'Save'}</button>
          <button className={styles.printBtn} onClick={handlePrint}>🖨 Print / PDF</button>
        </div>
      </header>

      <div className={styles.body}>

        {/* ── FORM TAB ── */}
        {tab === 'form' && (
          <div className={styles.form}>

            {/* Invoice Details */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Invoice Details</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Invoice Number</label>
                  <input value={inv.invoiceNumber} onChange={e => update('invoiceNumber', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Currency</label>
                  <select value={inv.currency} onChange={e => update('currency', e.target.value)}>
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Invoice Date</label>
                  <input type="date" value={inv.date} onChange={e => update('date', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Due Date</label>
                  <input type="date" value={inv.dueDate} onChange={e => update('dueDate', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Payment Terms</label>
                  <input value={inv.terms} onChange={e => update('terms', e.target.value)} placeholder="Net 30 Days" />
                </div>
              </div>
            </section>

            {/* Company Info */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Your Company Details</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Company Name</label>
                  <input value={inv.company?.name||''} onChange={e => update('company.name', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Subtitle / Type</label>
                  <input value={inv.company?.subtitle||''} onChange={e => update('company.subtitle', e.target.value)} placeholder="Technical Cleanliness Consultancy" />
                </div>
                <div className={styles.fieldFull}>
                  <label>Address</label>
                  <textarea rows={3} value={inv.company?.address||''} onChange={e => update('company.address', e.target.value)} placeholder="Street, City, Country" />
                </div>
                <div className={styles.field}>
                  <label>GSTIN</label>
                  <input value={inv.company?.gstin||''} onChange={e => update('company.gstin', e.target.value)} placeholder="29AABCE1234D1Z5" />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" value={inv.company?.email||''} onChange={e => update('company.email', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input value={inv.company?.phone||''} onChange={e => update('company.phone', e.target.value)} />
                </div>
              </div>
            </section>

            {/* Client Info */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Client Details</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Client Name / Company</label>
                  <input value={inv.client?.name||''} onChange={e => update('client.name', e.target.value)} placeholder="Muster GmbH" />
                </div>
                <div className={styles.field}>
                  <label>VAT ID</label>
                  <input value={inv.client?.vatId||''} onChange={e => update('client.vatId', e.target.value)} placeholder="DE123456789" />
                </div>
                <div className={styles.fieldFull}>
                  <label>Client Address</label>
                  <textarea rows={3} value={inv.client?.address||''} onChange={e => update('client.address', e.target.value)} placeholder="Street&#10;City, Postcode&#10;Country" />
                </div>
              </div>
            </section>

            {/* Line Items */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Services</h3>
              <div className={styles.itemsTable}>
                <div className={styles.itemHeader}>
                  <span className={styles.colDesc}>Description</span>
                  <span className={styles.colNum}>QTY</span>
                  <span className={styles.colNum}>Rate ({inv.currency})</span>
                  <span className={styles.colNum}>Amount</span>
                  <span style={{width:'32px'}} />
                </div>
                {inv.items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <input
                      className={styles.colDesc}
                      value={item.description}
                      onChange={e => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Service description"
                    />
                    <input
                      className={styles.colNum}
                      type="number" min="0" step="0.01"
                      value={item.qty}
                      onChange={e => updateItem(item.id, 'qty', e.target.value)}
                    />
                    <input
                      className={styles.colNum}
                      type="number" min="0" step="0.01"
                      value={item.rate}
                      onChange={e => updateItem(item.id, 'rate', e.target.value)}
                    />
                    <span className={styles.colNum} style={{paddingTop:'.5rem', fontWeight:'700', color:'#1a1a1a'}}>
                      {fmtCurrency((parseFloat(item.qty)||0)*(parseFloat(item.rate)||0), inv.currency)}
                    </span>
                    <button className={styles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">✕</button>
                  </div>
                ))}
                <button className={styles.addItemBtn} onClick={addItem}>+ Add Line Item</button>
              </div>

              {/* Totals summary */}
              <div className={styles.totals}>
                <div className={styles.totalRow}><span>Subtotal</span><span>{fmtCurrency(subtotal, inv.currency)}</span></div>
                <div className={styles.totalRow}>
                  <span>
                    Tax
                    <input
                      type="number" min="0" max="100" step="0.1"
                      value={inv.taxRate}
                      onChange={e => update('taxRate', e.target.value)}
                      className={styles.taxInput}
                    />
                    %
                  </span>
                  <span>{fmtCurrency(taxAmt, inv.currency)}</span>
                </div>
                <div className={styles.totalRowFinal}><span>Total Due</span><span>{fmtCurrency(total, inv.currency)}</span></div>
              </div>
            </section>

            {/* Tax + Notes + Banking */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Tax Note</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Tax Label</label>
                  <input value={inv.taxLabel||''} onChange={e => update('taxLabel', e.target.value)} placeholder="GST (0% — Exempt)" />
                </div>
                <div className={styles.fieldFull}>
                  <label>Tax Note (shown on invoice)</label>
                  <textarea rows={2} value={inv.taxNote||''} onChange={e => update('taxNote', e.target.value)} />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Bank & Payment Details</h3>
              <div className={styles.grid2}>
                {[
                  ['banking.bankName',    'Bank Name',    'HDFC Bank Ltd.'],
                  ['banking.accountName', 'Account Name', 'ETecSaK'],
                  ['banking.accountNo',   'Account No.',  'XXXX XXXX XXXX'],
                  ['banking.ifscCode',    'IFSC Code',    'HDFC0000000'],
                  ['banking.swiftBic',    'SWIFT / BIC',  'HDFCINBB'],
                  ['banking.iban',        'IBAN',         'IN00 XXXX XXXX XXXX XXXX XX'],
                ].map(([path, label, ph]) => (
                  <div key={path} className={styles.field}>
                    <label>{label}</label>
                    <input value={path.split('.').reduce((o,k) => o?.[k], inv)||''} onChange={e => update(path, e.target.value)} placeholder={ph} />
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Notes & Terms</h3>
              <div className={styles.fieldFull}>
                <textarea rows={3} value={inv.notes||''} onChange={e => update('notes', e.target.value)} />
              </div>
            </section>

          </div>
        )}

        {/* ── PREVIEW TAB ── */}
        {tab === 'preview' && (
          <div className={styles.preview} ref={printRef}>
            <InvoiceTemplate invoice={inv} />
          </div>
        )}

      </div>
    </div>
  )
}
