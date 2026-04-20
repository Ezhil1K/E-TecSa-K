import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import BackToTop from './components/BackToTop'
import ProgressBar from './components/ProgressBar'

export default function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])

  return (
    <>
      <ProgressBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/articles"          element={<ArticlesPage />} />
          <Route path="/articles/:id"      element={<ArticleDetailPage />} />
          <Route path="/privacy"           element={<PrivacyPage />} />
          <Route path="*"                  element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
