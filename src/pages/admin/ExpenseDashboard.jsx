import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EKLogo from '../../components/EKLogo'
import { getExpenses, deleteExpense, createBlankExpense, saveExpense, fmtDate, calcExpenseTotals } from '../../utils/expenseStorage'
import { logout } from '../../utils/adminAuth'
import styles from './ExpenseDashboard.module.css'

const STATUS_COLORS = { draft: '#f59e0b', submitted: '#3b82f6', approved: '#22c55e' }

export default function ExpenseDashboard({ onCreate }) {
  const [expenses, setExpenses] = useState(getExpenses)
  const navigate = useNavigate()

  function handleNew() {
    const exp = createBlankExpense()
    saveExpense(exp)
    onCreate(exp)
  }

  function handleDelete(id, e) {
    e.stopPropagation()
    if (!confirm('Delete this expense report?')) return
    deleteExpense(id)
    setExpenses(getExpenses())
  }

  function handleLogout() { logout(); navigate('/admin') }

  const totals = { draft: 0, submitted: 0, approved: 0 }
  expenses.forEach(exp => { if (totals[exp.status] !== undefined) totals[exp.status]++ })

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <EKLogo size={32} />
          <div>
            <div className={styles.topbarTitle}>Expense Reports</div>
            <div className={styles.topbarSub}>E-TecSa-K Admin</div>
          </div>
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.btnInvoice} onClick={() => navigate('/admin/invoice')}>← Invoices</button>
          <button className={styles.btnNew} onClick={handleNew}>+ New Expense</button>
          <button className={styles.btnLogout} onClick={handleLogout}>Sign Out</button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { label: 'Total Reports',  value: expenses.length,    color: '#1B2B4B' },
            { label: 'Draft',          value: totals.draft,       color: '#f59e0b' },
            { label: 'Submitted',      value: totals.submitted,   color: '#3b82f6' },
            { label: 'Approved',       value: totals.approved,    color: '#22c55e' },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        {expenses.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🧾</div>
            <div className={styles.emptyTitle}>No expense reports yet</div>
            <p className={styles.emptySub}>Create your first expense report to get started.</p>
            <button className={styles.btnNew} onClick={handleNew}>+ Create Expense Report</button>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Expense Ref.</th>
                  <th>Client</th>
                  <th>Period</th>
                  <th>Submitted</th>
                  <th>Amount (₹ INR)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => {
                  const { totalINR } = calcExpenseTotals(exp)
                  return (
                    <tr key={exp.id} onClick={() => onCreate(exp)} className={styles.row}>
                      <td className={styles.expNum}>{exp.expenseNumber}</td>
                      <td>{exp.client?.name || <span className={styles.muted}>—</span>}</td>
                      <td className={styles.muted} style={{fontSize:'.82rem'}}>
                        {fmtDate(exp.periodFrom)}{exp.periodTo ? ` – ${fmtDate(exp.periodTo)}` : ''}
                      </td>
                      <td>{fmtDate(exp.submissionDate)}</td>
                      <td className={styles.amount}>
                        {'₹ '}{totalINR.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td>
                        <span className={styles.badge}
                          style={{ background: (STATUS_COLORS[exp.status] || '#888') + '20', color: STATUS_COLORS[exp.status] || '#888' }}>
                          {exp.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions} onClick={e => e.stopPropagation()}>
                          <button className={styles.actionBtn}    onClick={() => onCreate(exp)}>Edit</button>
                          <button className={styles.actionBtnDel} onClick={e => handleDelete(exp.id, e)}>Delete</button>
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
