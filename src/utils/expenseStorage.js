const EXPENSES_KEY = 'ek_expenses'
const COUNTER_KEY  = 'ek_expense_counter'

export const DEFAULT_COMPANY = {
  name: 'E-TecSa-K',
  subtitle: 'Technical Cleanliness Consultancy',
  gstin: '',
  email: 'ezhil.1ek@hotmail.com',
  phone: '+91 9978645456',
}

export const EXPENSE_CATEGORIES = [
  'Travel', 'Accommodation', 'Meals & Entertainment', 'Local Transportation',
  'Fuel', 'Parking', 'Toll Charges', 'Office Supplies',
  'Communication', 'Internet', 'Client Meeting', 'Miscellaneous',
]

export function getExpenses() {
  try { return JSON.parse(localStorage.getItem(EXPENSES_KEY) || '[]') }
  catch { return [] }
}

export function getExpense(id) { return getExpenses().find(e => e.id === id) || null }

export function saveExpense(expense) {
  const list = getExpenses()
  const idx  = list.findIndex(e => e.id === expense.id)
  const upd  = { ...expense, updatedAt: Date.now() }
  if (idx >= 0) list[idx] = upd
  else list.unshift({ ...upd, createdAt: Date.now() })
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(list))
  return upd
}

export function deleteExpense(id) {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(getExpenses().filter(e => e.id !== id)))
}

export function nextExpenseNumber() {
  const year    = new Date().getFullYear()
  const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0') + 1
  localStorage.setItem(COUNTER_KEY, String(counter))
  return `EXP-${year}-${String(counter).padStart(3, '0')}`
}

export function calcExpenseTotals(expense) {
  const totalINR = (expense.items || []).reduce((s, it) => s + (parseFloat(it.amountINR) || 0), 0)
  return { totalINR }
}

export function fmtINR(val) {
  return '₹ ' + (parseFloat(val) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function fmtDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function createBlankExpense() {
  const today  = new Date()
  const first  = new Date(today.getFullYear(), today.getMonth(), 1)
  const fmt    = d => d.toISOString().split('T')[0]
  const num    = nextExpenseNumber()
  return {
    id: num,
    expenseNumber: num,
    status: 'draft',
    submissionDate: fmt(today),
    periodFrom: fmt(first),
    periodTo: fmt(today),
    company: { ...DEFAULT_COMPANY },
    client: {
      name: 'SAFECHEM Europe GmbH',
      address: 'Tersteegenstr. 25\n40474 Duesseldorf\nGermany',
      vatId: '',
    },
    project: 'Technical Cleanliness Audit',
    submittedBy: 'Ezhil Kumar K',
    designation: 'Technical Cleanliness Expert',
    items: [
      { id: Date.now(), date: fmt(today), category: '', description: '', receiptNo: '', amountINR: '' },
    ],
    declaration: 'I certify that the expenses listed above were incurred solely for business purposes in connection with the specified project/service. All information provided is accurate and the attached receipts support each claim. I respectfully request reimbursement in accordance with the agreed terms and reimbursement policy.',
    attachments: {
      receipts: false,
      invoices: false,
      tickets: false,
      hotelBills: false,
      other: false,
    },
    notes: '',
  }
}
