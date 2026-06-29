import EKLogo from '../EKLogo'
import { calcTotals, fmtCurrency, fmtDate } from '../../utils/invoiceStorage'

const S = {
  // Outer wrapper
  wrap: { fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#1a1a1a', background: '#fff', width: '100%', maxWidth: '900px', margin: '0 auto', boxShadow: '0 4px 32px rgba(0,0,0,.10)', borderRadius: '4px', overflow: 'hidden' },

  // Header
  header: { background: '#1B2B4B', color: '#fff', padding: '2rem 2.2rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' },
  logoArea: { display: 'flex', flexDirection: 'column', gap: '.3rem' },
  logoRow: { display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.4rem' },
  companyName: { fontSize: '18px', fontWeight: '900', color: '#fff', letterSpacing: '-.02em' },
  companySubtitle: { fontSize: '10px', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: '600' },
  companyDetail: { fontSize: '10px', color: 'rgba(255,255,255,.75)', lineHeight: '1.7' },
  invoiceRight: { textAlign: 'right', minWidth: '220px' },
  invoiceTitle: { fontSize: '36px', fontWeight: '900', color: 'rgba(255,255,255,.15)', letterSpacing: '.06em', textTransform: 'uppercase', lineHeight: '1', marginBottom: '.6rem' },
  invoiceGrid: { display: 'flex', flexDirection: 'column', gap: '.25rem' },
  invoiceRow: { display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'center' },
  invoiceLabel: { fontSize: '9px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: '600' },
  invoiceValue: { fontSize: '11px', fontWeight: '700', color: '#fff' },

  // Body
  body: { padding: '2rem 2.2rem' },

  // Bill To + Summary
  topRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' },
  sectionLabel: { fontSize: '9px', fontWeight: '800', color: '#D42B1A', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '.6rem' },
  clientName: { fontSize: '14px', fontWeight: '800', color: '#1a1a1a', marginBottom: '.2rem' },
  clientDetail: { fontSize: '10px', color: '#555', lineHeight: '1.7' },
  summaryRight: { textAlign: 'right' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', gap: '2rem', marginBottom: '.35rem' },
  summaryLabel: { fontSize: '10px', color: '#777' },
  summaryValue: { fontSize: '10px', color: '#1a1a1a', fontWeight: '600' },
  amountDueLabel: { fontSize: '10px', color: '#777', marginTop: '.5rem' },
  amountDueValue: { fontSize: '22px', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-.02em' },

  // Services table
  tableSection: { marginBottom: '1.5rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { borderBottom: '2px solid #D42B1A' },
  th: { fontSize: '9px', fontWeight: '800', color: '#D42B1A', textTransform: 'uppercase', letterSpacing: '.12em', padding: '.5rem .4rem', textAlign: 'left' },
  thRight: { fontSize: '9px', fontWeight: '800', color: '#D42B1A', textTransform: 'uppercase', letterSpacing: '.12em', padding: '.5rem .4rem', textAlign: 'right' },
  td: { padding: '.55rem .4rem', fontSize: '11px', color: '#333', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' },
  tdRight: { padding: '.55rem .4rem', fontSize: '11px', color: '#333', borderBottom: '1px solid #f0f0f0', textAlign: 'right' },
  totalsRow: { display: 'flex', justifyContent: 'flex-end', paddingTop: '.4rem' },
  totalsTable: { minWidth: '280px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', padding: '.3rem 0', fontSize: '10px', color: '#555' },
  totalRowFinal: { display: 'flex', justifyContent: 'space-between', padding: '.5rem .6rem', fontSize: '12px', fontWeight: '800', color: '#1a1a1a', background: '#f5f5f5', borderRadius: '4px', marginTop: '.3rem' },

  // Tax note
  taxNote: { background: '#FEF0EE', border: '1px solid rgba(212,43,26,.2)', borderRadius: '6px', padding: '.7rem 1rem', fontSize: '10px', color: '#555', lineHeight: '1.6', marginBottom: '1.5rem' },
  taxNoteLabel: { fontSize: '9px', fontWeight: '800', color: '#D42B1A', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.3rem' },

  // Bottom two-col
  bottomRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' },
  bankRow: { display: 'flex', gap: '1rem', marginBottom: '.3rem', fontSize: '10px' },
  bankLabel: { color: '#888', minWidth: '90px', flexShrink: '0' },
  bankValue: { color: '#1a1a1a', fontWeight: '600' },

  // Signature
  sigSection: { borderTop: '1px solid #eee', paddingTop: '1.2rem', marginBottom: '1.5rem' },
  sigLine: { width: '180px', borderBottom: '1.5px solid #1a1a1a', marginTop: '2rem', marginBottom: '.4rem' },
  sigLabel: { fontSize: '10px', fontWeight: '700', color: '#1a1a1a' },
  sigSub: { fontSize: '10px', color: '#777' },

  // Footer
  footer: { background: '#1B2B4B', padding: '1rem 2.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' },
  footerLeft: { display: 'flex', alignItems: 'center', gap: '.5rem' },
  footerBrand: { fontSize: '12px', fontWeight: '800', color: '#fff' },
  footerCenter: { fontSize: '10px', color: 'rgba(255,255,255,.6)' },
  footerRight: { fontSize: '10px', color: 'rgba(255,255,255,.6)', fontStyle: 'italic' },
}

export default function InvoiceTemplate({ invoice }) {
  if (!invoice) return null
  const { subtotal, taxAmt, total } = calcTotals(invoice)
  const c = invoice.company || {}
  const client = invoice.client || {}
  const banking = invoice.banking || {}
  const currency = invoice.currency || 'EUR'

  return (
    <div style={S.wrap} id="invoice-print-area">

      {/* HEADER */}
      <div style={S.header}>
        <div style={S.logoArea}>
          <div style={S.logoRow}>
            <EKLogo size={36} color="#fff" />
            <div style={S.companyName}>{c.name || 'E-TecSa-K'}</div>
          </div>
          {c.subtitle && <div style={S.companySubtitle}>{c.subtitle}</div>}
          <div style={S.companyDetail}>
            {c.address && <div style={{whiteSpace:'pre-line'}}>{c.address}</div>}
            {c.gstin && <div>GSTIN: {c.gstin}</div>}
            {c.email && <div>{c.email}</div>}
            {c.phone && <div>{c.phone}</div>}
          </div>
        </div>
        <div style={S.invoiceRight}>
          <div style={S.invoiceTitle}>INVOICE</div>
          <div style={S.invoiceGrid}>
            {[
              ['Invoice No.', invoice.invoiceNumber],
              ['Date',        fmtDate(invoice.date)],
              ['Due Date',    fmtDate(invoice.dueDate)],
              ['Terms',       invoice.terms],
            ].map(([label, val]) => val ? (
              <div key={label} style={S.invoiceRow}>
                <span style={S.invoiceLabel}>{label}</span>
                <span style={S.invoiceValue}>{val}</span>
              </div>
            ) : null)}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={S.body}>

        {/* Bill To + Summary */}
        <div style={S.topRow}>
          <div>
            <div style={S.sectionLabel}>Bill To</div>
            {client.name    && <div style={S.clientName}>{client.name}</div>}
            {client.address && <div style={S.clientDetail}><span style={{whiteSpace:'pre-line'}}>{client.address}</span></div>}
            {client.vatId   && <div style={{...S.clientDetail, marginTop:'.4rem'}}><span style={{color:'#888'}}>VAT ID: </span>{client.vatId}</div>}
          </div>
          <div style={S.summaryRight}>
            <div style={S.sectionLabel}>Summary</div>
            <div style={S.summaryRow}>
              <span style={S.summaryLabel}>Invoice Date</span>
              <span style={S.summaryValue}>{fmtDate(invoice.date)}</span>
            </div>
            <div style={S.summaryRow}>
              <span style={S.summaryLabel}>Payment Due</span>
              <span style={S.summaryValue}>{fmtDate(invoice.dueDate)}</span>
            </div>
            <div style={{marginTop:'.8rem'}}>
              <div style={S.amountDueLabel}>Amount Due</div>
              <div style={S.amountDueValue}>{fmtCurrency(total, currency)}</div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div style={S.tableSection}>
          <div style={S.sectionLabel}>Services</div>
          <table style={S.table}>
            <thead style={S.thead}>
              <tr>
                <th style={S.th}>Description</th>
                <th style={{...S.thRight, width:'60px'}}>QTY</th>
                <th style={{...S.thRight, width:'110px'}}>Rate ({currency})</th>
                <th style={{...S.thRight, width:'110px'}}>Amount ({currency})</th>
              </tr>
            </thead>
            <tbody>
              {(invoice.items || []).map((item, i) => (
                <tr key={item.id || i}>
                  <td style={S.td}>{item.description || '—'}</td>
                  <td style={S.tdRight}>{item.qty}</td>
                  <td style={S.tdRight}>{fmtCurrency(parseFloat(item.rate)||0, currency)}</td>
                  <td style={S.tdRight}>{fmtCurrency((parseFloat(item.qty)||0)*(parseFloat(item.rate)||0), currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={S.totalsRow}>
            <div style={S.totalsTable}>
              <div style={S.totalRow}>
                <span>Subtotal</span>
                <span>{fmtCurrency(subtotal, currency)}</span>
              </div>
              <div style={S.totalRow}>
                <span>{invoice.taxLabel || `Tax (${invoice.taxRate || 0}%)`}</span>
                <span>{fmtCurrency(taxAmt, currency)}</span>
              </div>
              <div style={S.totalRowFinal}>
                <span>Total Due</span>
                <span>{fmtCurrency(total, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Note */}
        {invoice.taxNote && (
          <div style={S.taxNote}>
            <div style={S.taxNoteLabel}>Tax Note</div>
            {invoice.taxNote}
          </div>
        )}

        {/* Bank + Notes */}
        <div style={S.bottomRow}>
          <div>
            <div style={S.sectionLabel}>Bank & Payment Details</div>
            {[
              ['Bank Name',     banking.bankName],
              ['Account Name',  banking.accountName],
              ['Account No.',   banking.accountNo],
              ['IFSC Code',     banking.ifscCode],
              ['SWIFT / BIC',   banking.swiftBic],
              ['IBAN',          banking.iban],
            ].map(([label, val]) => val ? (
              <div key={label} style={S.bankRow}>
                <span style={S.bankLabel}>{label}</span>
                <span style={S.bankValue}>{val}</span>
              </div>
            ) : null)}
          </div>
          <div>
            <div style={S.sectionLabel}>Notes & Terms</div>
            <div style={{fontSize:'10px', color:'#555', lineHeight:'1.7'}}>{invoice.notes}</div>
          </div>
        </div>

        {/* Signature */}
        <div style={S.sigSection}>
          <div style={S.sectionLabel}>Authorised Signature</div>
          <div style={S.sigLine} />
          <div style={S.sigLabel}>Authorised Signatory</div>
          <div style={S.sigSub}>For {c.name || 'E-TecSa-K'}</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={S.footer}>
        <div style={S.footerLeft}>
          <EKLogo size={22} color="#fff" />
          <span style={S.footerBrand}>{c.name || 'E-TecSa-K'}</span>
        </div>
        <div style={S.footerCenter}>{invoice.invoiceNumber}{' · '}{fmtDate(invoice.date)}</div>
        <div style={S.footerRight}>Thank you for your business.</div>
      </div>

    </div>
  )
}
