import { useState } from 'react'
import ExpenseTemplate from '../../components/expense/ExpenseTemplate'
import { saveExpense, calcExpenseTotals, EXPENSE_CATEGORIES } from '../../utils/expenseStorage'
import styles from './InvoiceEditor.module.css'
import expStyles from './ExpenseEditor.module.css'

const STATUSES = ['draft', 'submitted', 'approved']

export default function ExpenseEditor({ expense: initial, onBack }) {
  const [exp, setExp]     = useState(initial)
  const [tab, setTab]     = useState('form')
  const [saved, setSaved] = useState(false)

  /* ── Deep-path updater ── */
  function update(path, value) {
    setExp(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
    setSaved(false)
  }

  /* ── Item row helpers ── */
  function updateItem(id, field, value) {
    setExp(prev => ({
      ...prev,
      items: prev.items.map(it => it.id === id ? { ...it, [field]: value } : it),
    }))
    setSaved(false)
  }

  function addItem() {
    const today = new Date().toISOString().split('T')[0]
    setExp(prev => ({
      ...prev,
      items: [...prev.items, {
        id: Date.now(), date: today,
        category: '', description: '', receiptNo: '',
        amountINR: '',
      }],
    }))
  }

  function removeItem(id) {
    if (exp.items.length <= 1) return
    setExp(prev => ({ ...prev, items: prev.items.filter(it => it.id !== id) }))
  }

  function handleSave() {
    saveExpense(exp)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handlePrint() {
    setTab('preview')
    setTimeout(() => window.print(), 300)
  }

  const { totalINR } = calcExpenseTotals(exp)

  /* ── Shared input styles ── */
  const inp   = { padding: '.6rem .8rem', border: '1.5px solid #E4E4E4', borderRadius: '8px', fontSize: '.9rem', color: '#1a1a1a', outline: 'none', fontFamily: 'inherit', background: '#fff', width: '100%', boxSizing: 'border-box' }
  const inpSm = { ...inp, padding: '.5rem .6rem', fontSize: '.875rem', borderRadius: '6px' }

  return (
    <div className={styles.page}>

      {/* ── Top bar ── */}
      <header className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← All Expenses</button>
        <div className={styles.topbarCenter}>
          <span className={styles.invNum}>{exp.expenseNumber}</span>
          <select
            value={exp.status}
            onChange={e => update('status', e.target.value)}
            className={styles.statusSelect}
            style={{ color: exp.status === 'approved' ? '#22c55e' : exp.status === 'submitted' ? '#3b82f6' : '#f59e0b' }}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className={styles.topbarRight}>
          <div className={styles.tabs}>
            <button className={tab === 'form' ? styles.tabActive : styles.tab} onClick={() => setTab('form')}>✏️ Edit</button>
            <button className={tab === 'preview' ? styles.tabActive : styles.tab} onClick={() => setTab('preview')}>👁 Preview</button>
          </div>
          <button className={styles.saveBtn} onClick={handleSave}>{saved ? '✓ Saved!' : 'Save'}</button>
          <button className={styles.printBtn} onClick={handlePrint}>🖨 Print / PDF</button>
        </div>
      </header>

      <div className={styles.body}>

        {/* ══════════════════════════════ FORM TAB ══════════════════════════════ */}
        {tab === 'form' && (
          <div className={styles.form}>

            {/* Expense Details */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Expense Report Details</h3>
              <div className={styles.grid2}>

                <div className={styles.field}>
                  <label>Expense Reference</label>
                  <input style={inp} value={exp.expenseNumber}
                    onChange={e => update('expenseNumber', e.target.value)} />
                </div>

                <div className={styles.field}>
                  <label>Submission Date</label>
                  <input style={inp} type="date" value={exp.submissionDate}
                    onChange={e => update('submissionDate', e.target.value)} />
                </div>

                <div className={styles.field}>
                  <label>Period From</label>
                  <input style={inp} type="date" value={exp.periodFrom}
                    onChange={e => update('periodFrom', e.target.value)} />
                </div>

                <div className={styles.field}>
                  <label>Period To</label>
                  <input style={inp} type="date" value={exp.periodTo}
                    onChange={e => update('periodTo', e.target.value)} />
                </div>

                <div className={styles.field}>
                  <label>Project / Service</label>
                  <input style={inp} value={exp.project}
                    onChange={e => update('project', e.target.value)} />
                </div>

              </div>
            </section>

            {/* Submitted By */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Submitted By</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <input style={inp} value={exp.submittedBy}
                    onChange={e => update('submittedBy', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Designation</label>
                  <input style={inp} value={exp.designation}
                    onChange={e => update('designation', e.target.value)} />
                </div>
              </div>
            </section>

            {/* Company Details */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Company (Your Details)</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Company Name</label>
                  <input style={inp} value={exp.company?.name || ''}
                    onChange={e => update('company.name', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Subtitle</label>
                  <input style={inp} value={exp.company?.subtitle || ''}
                    onChange={e => update('company.subtitle', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>GSTIN</label>
                  <input style={inp} value={exp.company?.gstin || ''}
                    onChange={e => update('company.gstin', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input style={inp} value={exp.company?.email || ''}
                    onChange={e => update('company.email', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input style={inp} value={exp.company?.phone || ''}
                    onChange={e => update('company.phone', e.target.value)} />
                </div>
              </div>
            </section>

            {/* Client Details */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Client / Bill To</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Client / Company Name</label>
                  <input style={inp} value={exp.client?.name || ''}
                    onChange={e => update('client.name', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>VAT ID / Tax Number</label>
                  <input style={inp} value={exp.client?.vatId || ''}
                    onChange={e => update('client.vatId', e.target.value)} />
                </div>
                <div className={styles.fieldFull}>
                  <label>Address</label>
                  <textarea style={{ ...inp, minHeight: '72px', resize: 'vertical' }} value={exp.client?.address || ''}
                    onChange={e => update('client.address', e.target.value)} />
                </div>
              </div>
            </section>

            {/* ── Expense Items ── */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Expense Items</h3>

              <datalist id="exp-cat-list">
                {EXPENSE_CATEGORIES.map(c => <option key={c} value={c} />)}
              </datalist>

              <div className={styles.itemsTable}>

                {/* Column headers */}
                <div className={expStyles.itemHeader}>
                  <span style={{ width: '22px', textAlign: 'center' }}>#</span>
                  <span style={{ width: '108px' }}>Date</span>
                  <span style={{ width: '120px' }}>Category</span>
                  <span style={{ flex: 1 }}>Description</span>
                  <span style={{ width: '80px' }}>Receipt No.</span>
                  <span style={{ width: '92px', textAlign: 'right' }}>Amount ₹</span>
                  <span style={{ width: '28px' }}></span>
                </div>

                {exp.items.map((item, i) => {
                  return (
                    <div key={item.id} className={expStyles.itemBlock}>

                      {/* ── Main row ── */}
                      <div className={expStyles.itemRow}>
                        <span style={{ width: '22px', textAlign: 'center', color: '#94A3B8', fontSize: '.8rem', flexShrink: 0 }}>{i + 1}</span>

                        <div style={{ width: '108px', flexShrink: 0 }}>
                          <input style={inpSm} type="date" value={item.date || ''}
                            onChange={e => updateItem(item.id, 'date', e.target.value)} />
                        </div>

                        <div style={{ width: '120px', flexShrink: 0 }}>
                          <input style={inpSm} list="exp-cat-list" placeholder="Category…" value={item.category || ''}
                            onChange={e => updateItem(item.id, 'category', e.target.value)} />
                        </div>

                        <div style={{ flex: 1 }}>
                          <input style={inpSm} placeholder="Description" value={item.description || ''}
                            onChange={e => updateItem(item.id, 'description', e.target.value)} />
                        </div>

                        <div style={{ width: '80px', flexShrink: 0 }}>
                          <input style={inpSm} placeholder="REC-001" value={item.receiptNo || ''}
                            onChange={e => updateItem(item.id, 'receiptNo', e.target.value)} />
                        </div>

                        <div style={{ width: '92px', flexShrink: 0 }}>
                          <input style={{ ...inpSm, textAlign: 'right' }} type="number" min="0" step="0.01" placeholder="0.00"
                            value={item.amountINR}
                            onChange={e => updateItem(item.id, 'amountINR', e.target.value)} />
                        </div>

                        <button className={styles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">×</button>
                      </div>

                    </div>
                  )
                })}

                <button className={styles.addItemBtn} onClick={addItem}>+ Add Expense Row</button>
              </div>

              {/* Running totals */}
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Total Items with Amount</span>
                  <span>{exp.items.filter(it => parseFloat(it.amountINR) > 0).length}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>{'Subtotal (₹ INR)'}</span>
                  <span>{'₹ '}{totalINR.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className={styles.totalRowFinal}>
                  <span>Total Claimed</span>
                  <span style={{ color: '#D42B1A' }}>
                    {'₹ '}{totalINR.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

            </section>

            {/* Declaration */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Declaration</h3>
              <div className={styles.fieldFull}>
                <textarea style={{ ...inp, minHeight: '96px', resize: 'vertical' }}
                  value={exp.declaration}
                  onChange={e => update('declaration', e.target.value)} />
              </div>
            </section>

            {/* Supporting Documents */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Supporting Documents</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                {[
                  ['receipts',   'Receipts for all expenses'],
                  ['invoices',   'Invoices (if applicable)'],
                  ['tickets',    'Travel tickets / boarding passes'],
                  ['hotelBills', 'Hotel bills'],
                  ['other',      'Other supporting documents'],
                ].map(([key, label]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '.65rem', fontSize: '.9rem', color: '#3A3A3A', cursor: 'pointer' }}>
                    <input type="checkbox"
                      checked={exp.attachments?.[key] || false}
                      onChange={e => update(`attachments.${key}`, e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#D42B1A', cursor: 'pointer' }} />
                    {label}
                  </label>
                ))}
              </div>
            </section>

            {/* Notes */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Additional Notes</h3>
              <div className={styles.fieldFull}>
                <textarea style={{ ...inp, minHeight: '72px', resize: 'vertical' }}
                  placeholder="Any additional remarks or notes…"
                  value={exp.notes || ''}
                  onChange={e => update('notes', e.target.value)} />
              </div>
            </section>

          </div>
        )}

        {/* ══════════════════════════════ PREVIEW TAB ══════════════════════════════ */}
        {tab === 'preview' && (
          <div className={styles.preview}>
            <ExpenseTemplate expense={exp} />
          </div>
        )}

      </div>
    </div>
  )
}
