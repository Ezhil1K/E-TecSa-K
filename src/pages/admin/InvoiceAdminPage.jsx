import { useState, useEffect } from 'react'
import { isLoggedIn } from '../../utils/adminAuth'
import { useNavigate } from 'react-router-dom'
import InvoiceDashboard from './InvoiceDashboard'
import InvoiceEditor from './InvoiceEditor'

export default function InvoiceAdminPage() {
  const [view, setView]         = useState('dashboard') // 'dashboard' | 'editor'
  const [activeInv, setActive]  = useState(null)
  const navigate                = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) navigate('/admin')
  }, [])

  function openEditor(inv) { setActive(inv); setView('editor') }
  function goBack()        { setActive(null); setView('dashboard') }

  if (view === 'editor' && activeInv) return <InvoiceEditor invoice={activeInv} onBack={goBack} />
  return <InvoiceDashboard onCreate={openEditor} />
}
