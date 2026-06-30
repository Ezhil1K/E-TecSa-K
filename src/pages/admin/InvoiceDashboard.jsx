import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EKLogo from '../../components/EKLogo'
import { getInvoices, deleteInvoice, createBlankInvoice, saveInvoice, fmtCurrency, fmtDate } from '../../utils/invoiceStorage'
import { logout } from '../../utils/adminAuth'
import styles from './InvoiceDashboard.module.css'

const STATUS_COLORS = { draft: '#f59e0b', sent: '#3b82f6', paid: '#22c55e' }

export default function InvoiceDashboard({ onCreate }) {
  const [invoices, setInvoices] = useState(getInvoices)
  const navigate = useNavigate()

  function handleNew() {
    const inv = createBlankInvoice()
    saveInvoice(inv)
    onCreate(inv)
  }

  function handleDelete(id, e) {
    e.stopPropagation()
    if (!confirm('Delete this invoice?')) return
    deleteInvoice(id)
    setInvoices(getInvoices())
  }

  function handleLogout() { logout(); navigate('/admin') }

  const totals = { draft: 0, sent: 0, paid: 0 }
  invoices.forEach(inv => { if (totals[inv.status] !== undefined) totals[inv.status]++ })

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <EKLogo size={32} />
          <div>
            <div className={styles.topbarTitle}>Invoice Generator</div>
            <div className={styles.topbarSub}>E-TecSa-K Admin</div>
          </div>
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.btnNew} onClick={handleNew}>+ New Invoice</button>
          <button className={styles.btnExpense} onClick={() => navigate('/admin/expense')}>+ New Expense</button>
          <button className={styles.btnLogout} onClick={handleLogout}>Sign Out</button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { label: 'Total Invoices', value: invoices.length, color: '#1B2B4B' },
            { label: 'Draft', value: totals.draft, color: '#f59e0b' },
            { label: 'Sent', value: totals.sent, color: '#3b82f6' },
            { label: 'Paid', value: totals.paid, color: '#22c55e' },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        {invoices.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🧾</div>
            <div className={styles.emptyTitle}>No invoices yet</div>
            <p className={styles.emptySub}>Create your first invoice to get started.</p>
            <button className={styles.btnNew} onClick={handleNew}>+ Create Invoice</button>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Invoice No.</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => {
                  const total = (inv.items||[]).reduce((s,it) => s+(parseFloat(it.qty)||0)*(parseFloat(it.rate)||0), 0)
                  return (
                    <tr key={inv.id} onClick={() => onCreate(inv)} className={styles.row}>
                      <td className={styles.invNum}>{inv.invoiceNumber}</td>
                      <td>{inv.client?.name || <span className={styles.muted}>—</span>}</td>
                      <td>{fmtDate(inv.date)}</td>
                      <td>{fmtDate(inv.dueDate)}</td>
                      <td className={styles.amount}>{fmtCurrency(total, inv.currency)}</td>
                      <td>
                        <span className={styles.badge} style={{ background: STATUS_COLORS[inv.status] + '20', color: STATUS_COLORS[inv.status] }}>
                          {inv.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions} onClick={e => e.stopPropagation()}>
                          <button className={styles.actionBtn} onClick={() => onCreate(inv)}>Edit</button>
                          <button className={styles.actionBtnDel} onClick={e => handleDelete(inv.id, e)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
