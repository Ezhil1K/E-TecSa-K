import { useState, useEffect } from 'react'
import { isLoggedIn } from '../../utils/adminAuth'
import { useNavigate } from 'react-router-dom'
import ExpenseDashboard from './ExpenseDashboard'
import ExpenseEditor from './ExpenseEditor'

export default function ExpenseAdminPage() {
  const [view, setView]      = useState('dashboard')
  const [activeExp, setActive] = useState(null)
  const navigate             = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) navigate('/admin')
  }, [])

  function openEditor(exp) { setActive(exp); setView('editor') }
  function goBack()        { setActive(null); setView('dashboard') }

  if (view === 'editor' && activeExp) return <ExpenseEditor expense={activeExp} onBack={goBack} />
  return <ExpenseDashboard onCreate={openEditor} />
}
