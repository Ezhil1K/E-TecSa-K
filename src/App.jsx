import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import BackToTop from './components/BackToTop'
import ProgressBar from './components/ProgressBar'

export default function App() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <>
      <ProgressBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/articles"          element={<ArticlesPage />} />
          <Route path="/articles/:id"      element={<ArticleDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
