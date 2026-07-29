import { calcExpenseTotals, fmtDate } from '../../utils/expenseStorage'

/* ── Brand palette — identical to InvoiceTemplate ── */
const BRAND = {
  red:     '#D42B1A',
  redPale: '#FEF0EE',
  dark:    '#0D0D0D',
  mid:     '#3A3A3A',
  muted:   '#7A7A7A',
  border:  '#E4E4E4',
  white:   '#FFFFFF',
}

const S = {
  wrap: {
    fontFamily: "'Inter', sans-serif", fontSize: '11px', color: BRAND.dark,
    background: BRAND.white, width: '100%', maxWidth: '900px',
    margin: '0 auto', boxShadow: '0 4px 32px rgba(212,43,26,.10)',
    borderRadius: '4px', overflow: 'hidden',
  },

  /* ── Header — light gray, same as invoice ── */
  header: {
    background: '#F5F5F5', color: BRAND.dark,
    padding: '2rem 2.2rem',
    display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start',
    WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact',
  },
  logoArea: { display: 'flex', flexDirection: 'column', gap: '.3rem' },
  logoRow:  { display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.4rem' },
  companyName: { fontSize: '18px', fontWeight: '900', color: BRAND.red, letterSpacing: '-.02em' },
  companySubtitle: { fontSize: '10px', color: BRAND.muted, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: '700' },
  companyDetail: { fontSize: '10px', color: BRAND.mid, lineHeight: '1.7' },

  reportRight: { textAlign: 'right', minWidth: '220px' },
  reportTitle: {
    fontSize: '36px', fontWeight: '900', color: 'rgba(0,0,0,.08)',
    letterSpacing: '.04em', textTransform: 'uppercase', lineHeight: '1.1', marginBottom: '.6rem',
  },
  metaGrid:  { display: 'flex', flexDirection: 'column', gap: '.25rem' },
  metaRow:   { display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'center' },
  metaLabel: { fontSize: '9px', color: BRAND.muted, textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: '600' },
  metaValue: { fontSize: '11px', fontWeight: '700', color: BRAND.dark },

  /* ── Body ── */
  body: { padding: '2rem 2.2rem' },

  topRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
    marginBottom: '1.6rem', paddingBottom: '1.4rem', borderBottom: `1px solid ${BRAND.border}`,
  },
  sectionLabel: {
    fontSize: '9px', fontWeight: '800', color: BRAND.red,
    textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '.5rem',
  },
  clientName:   { fontSize: '14px', fontWeight: '800', color: BRAND.dark, marginBottom: '.2rem' },
  clientDetail: { fontSize: '10px', color: BRAND.mid, lineHeight: '1.7' },

  /* ── Table ── */
  tableSection: { marginBottom: '1.4rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { borderBottom: `2px solid ${BRAND.red}` },
  th:      { fontSize: '8.5px', fontWeight: '800', color: BRAND.red, textTransform: 'uppercase', letterSpacing: '.1em', padding: '.5rem .4rem', textAlign: 'left' },
  thRight: { fontSize: '8.5px', fontWeight: '800', color: BRAND.red, textTransform: 'uppercase', letterSpacing: '.1em', padding: '.5rem .4rem', textAlign: 'right' },
  td:      { padding: '.5rem .4rem', fontSize: '10px', color: BRAND.mid, borderBottom: `1px solid ${BRAND.border}`, verticalAlign: 'top' },
  tdRight: { padding: '.5rem .4rem', fontSize: '10px', color: BRAND.mid, borderBottom: `1px solid ${BRAND.border}`, textAlign: 'right', verticalAlign: 'top' },
  tdNum:   { padding: '.5rem .4rem', fontSize: '10px', color: '#94A3B8', borderBottom: `1px solid ${BRAND.border}`, textAlign: 'center', verticalAlign: 'top' },

  /* Totals */
  totalsRow:     { display: 'flex', justifyContent: 'flex-end', paddingTop: '.4rem' },
  totalsTable:   { minWidth: '300px' },
  totalRow:      { display: 'flex', justifyContent: 'space-between', padding: '.3rem 0', fontSize: '10px', color: BRAND.muted },
  totalRowFinal: {
    display: 'flex', justifyContent: 'space-between',
    padding: '.5rem .6rem', fontSize: '12px', fontWeight: '900',
    color: BRAND.white, background: BRAND.red, borderRadius: '4px', marginTop: '.3rem',
  },

  /* Declaration */
  declarationBox: {
    fontSize: '10px', color: BRAND.mid, lineHeight: '1.75',
    padding: '.8rem 1rem', background: '#F8FAFC',
    border: `1px solid ${BRAND.border}`, borderRadius: '6px', marginBottom: '1.4rem',
  },

  /* Attachments */
  checkRow: { display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '10px', color: BRAND.mid, marginBottom: '.35rem' },
  checkBox: { width: '12px', height: '12px', border: `1.5px solid ${BRAND.muted}`, borderRadius: '2px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  attachNote: {
    fontSize: '9px', color: BRAND.muted, fontStyle: 'italic', marginTop: '.6rem',
    padding: '.45rem .8rem', background: '#F8FAFC',
    borderLeft: `3px solid #93C5FD`, borderRadius: '0 4px 4px 0',
  },

  /* Signature */
  sigSection: { borderTop: `1px solid ${BRAND.border}`, paddingTop: '1rem', marginTop: '1.4rem', marginBottom: '.4rem' },
  sigLine:    { width: '200px', borderBottom: `1.5px solid ${BRAND.dark}`, marginTop: '2rem', marginBottom: '.4rem' },
  sigLabel:   { fontSize: '10px', fontWeight: '700', color: BRAND.dark },
  sigSub:     { fontSize: '10px', color: BRAND.muted },

  /* ── Footer — light gray, red top border, same as invoice ── */
  footer: {
    background: '#F5F5F5', padding: '1rem 2.2rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: `2px solid ${BRAND.red}`,
    WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact',
  },
  footerLeft:   { display: 'flex', alignItems: 'center', gap: '.5rem' },
  footerBrand:  { fontSize: '12px', fontWeight: '900', color: BRAND.red },
  footerCenter: { fontSize: '10px', color: BRAND.muted },
  footerRight:  { fontSize: '10px', color: BRAND.muted, fontStyle: 'italic' },
}

export default function ExpenseTemplate({ expense }) {
  if (!expense) return null

  const { totalINR } = calcExpenseTotals(expense)
  const c      = expense.company || {}
  const client = expense.client  || {}

  return (
    <div style={S.wrap} id="expense-print-area">

      {/* ── HEADER ── */}
      <div style={S.header}>
        <div style={S.logoArea}>
          <div style={S.logoRow}>
            <img src="/Logo.png" alt="E-TecSa-K" width={36} height={36}
              style={{ objectFit: 'contain', display: 'block', mixBlendMode: 'multiply' }} />
            <div style={S.companyName}>{c.name || 'E-TecSa-K'}</div>
          </div>
          {c.subtitle && <div style={S.companySubtitle}>{c.subtitle}</div>}
          <div style={S.companyDetail}>
            {c.gstin && <div>GSTIN: {c.gstin}</div>}
            {c.email && <div>{c.email}</div>}
            {c.phone && <div>{c.phone}</div>}
          </div>
        </div>

        <div style={S.reportRight}>
          <div style={S.reportTitle}>EXPENSE<br/>REPORT</div>
          <div style={S.metaGrid}>
            {[
              ['Expense Ref.',  expense.expenseNumber],
              ['Submitted',     fmtDate(expense.submissionDate)],
              ['Period From',   fmtDate(expense.periodFrom)],
              ['Period To',     fmtDate(expense.periodTo)],
            ].map(([label, val]) => val ? (
              <div key={label} style={S.metaRow}>
                <span style={S.metaLabel}>{label}</span>
                <span style={S.metaValue}>{val}</span>
              </div>
            ) : null)}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={S.body}>

        {/* Client + Project */}
        <div style={S.topRow}>
          <div>
            <div style={S.sectionLabel}>Bill To / Client</div>
            {client.name    && <div style={S.clientName}>{client.name}</div>}
            {client.address && (
              <div style={S.clientDetail}>
                <span style={{ whiteSpace: 'pre-line' }}>{client.address}</span>
              </div>
            )}
            {client.vatId   && (
              <div style={{ ...S.clientDetail, marginTop: '.3rem' }}>
                <span style={{ color: '#888' }}>VAT ID: </span>{client.vatId}
              </div>
            )}
          </div>
          <div>
            <div style={S.sectionLabel}>Project / Service</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: BRAND.dark, marginBottom: '.6rem' }}>
              {expense.project || '—'}
            </div>
            <div style={S.sectionLabel}>Submitted By</div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: BRAND.dark }}>
              {expense.submittedBy || '—'}
            </div>
            <div style={{ fontSize: '10px', color: BRAND.muted }}>
              {expense.designation || ''}
            </div>
          </div>
        </div>

        {/* Expense Table */}
        <div style={S.tableSection}>
          <div style={S.sectionLabel}>Expense Details</div>
          <table style={S.table}>
            <thead style={S.thead}>
              <tr>
                <th style={{ ...S.th, width: '22px' }}>#</th>
                <th style={{ ...S.th, width: '72px' }}>Date</th>
                <th style={{ ...S.th, width: '100px' }}>Category</th>
                <th style={S.th}>Description</th>
                <th style={{ ...S.th, width: '60px' }}>Receipt</th>
                <th style={{ ...S.thRight, width: '88px' }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {(expense.items || []).map((item, i) => {
                const inr      = parseFloat(item.amountINR) || 0
                return (
                  <tr key={item.id || i}>
                    <td style={S.tdNum}>{i + 1}</td>
                    <td style={S.td}>{fmtDate(item.date)}</td>
                    <td style={S.td}>{item.category || '—'}</td>
                    <td style={S.td}>
                      <div>{item.description || '—'}</div>

                    </td>
                    <td style={S.td}>{item.receiptNo || '—'}</td>
                    <td style={S.tdRight}>
                      {'₹ '}
                      {inr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div style={S.totalsRow}>
            <div style={S.totalsTable}>
              <div style={S.totalRow}>
                <span>Total Items</span>
                <span>{(expense.items || []).filter(it => parseFloat(it.amountINR) > 0).length}</span>
              </div>
              <div style={S.totalRow}>
                <span>Subtotal (₹ INR)</span>
                <span>
                  {'₹ '}
                  {totalINR.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={S.totalRowFinal}>
                <span>Total Amount Claimed</span>
                <span>
                  {'₹ '}
                  {totalINR.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div style={S.sectionLabel}>Declaration</div>
        <div style={S.declarationBox}>{expense.declaration}</div>

        {/* Attachments */}
        <div style={S.sectionLabel}>Supporting Documents</div>
        {[
          ['receipts',   'Receipts attached for all expenses'],
          ['invoices',   'Invoices (if applicable)'],
          ['tickets',    'Travel tickets / boarding passes (if applicable)'],
          ['hotelBills', 'Hotel bills (if applicable)'],
          ['other',      'Other supporting documents'],
        ].map(([key, label]) => {
          const checked = expense.attachments?.[key]
          return (
            <div key={key} style={S.checkRow}>
              <div style={{ ...S.checkBox, background: checked ? BRAND.red : 'transparent' }}>
                {checked && <span style={{ color: '#fff', fontSize: '8px', fontWeight: '900', lineHeight: 1 }}>{'✓'}</span>}
              </div>
              <span>{label}</span>
            </div>
          )
        })}
        <div style={S.attachNote}>All receipts are attached in chronological order corresponding to the expense entries above.</div>

        {/* Signature */}
        <div style={S.sigSection}>
          <div style={S.sectionLabel}>Signatory for Submission</div>
          <div style={S.sigLine} />
          <div style={S.sigLabel}>{expense.submittedBy || 'Authorised Signatory'}</div>
          <div style={S.sigSub}>{expense.designation || ''}</div>
          <div style={S.sigSub}>Date: {fmtDate(expense.submissionDate)}</div>
        </div>

        {/* Notes */}
        {expense.notes && (
          <div style={{ fontSize: '10px', color: BRAND.muted, fontStyle: 'italic', paddingTop: '.4rem' }}>
            <strong style={{ color: BRAND.mid }}>Notes: </strong>{expense.notes}
          </div>
        )}
      </div>

      {/* ── FOOTER — mirrors invoice footer exactly ── */}
      <div style={S.footer}>
        <div style={S.footerLeft}>
          <img src="/Logo.png" alt="E-TecSa-K" width={22} height={22}
            style={{ objectFit: 'contain', display: 'block', mixBlendMode: 'multiply' }} />
          <span style={S.footerBrand}>{c.name || 'E-TecSa-K'}</span>
        </div>
        <div style={S.footerCenter}>{expense.expenseNumber}{' · '}{fmtDate(expense.submissionDate)}</div>
        <div style={S.footerRight}>Thank you for your business.</div>
      </div>

    </div>
  )
}
