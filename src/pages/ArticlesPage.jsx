import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import useReveal from '../components/useReveal'
import styles from './ArticlesPage.module.css'

// Gather unique categories
const ALL = 'All'
const categories = [ALL, ...Array.from(new Set(articles.map(a => a.category)))]

export default function ArticlesPage() {
  const [active, setActive] = useState(ALL)
  const ref = useReveal([active])

  const filtered = active === ALL ? articles : articles.filter(a => a.category === active)

  return (
    <section className={styles.page} ref={ref}>
      <div className="section-wrap">

        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <span className="tag">Knowledge Hub</span>
          <h1 className={styles.h1}>Articles &amp; Resources</h1>
          <p className={styles.sub}>
            In-depth technical content, best practices, and insights from the field of technical cleanliness.
          </p>
        </div>

        {/* Category filter pills */}
        <div className={`${styles.filters} reveal`} role="group" aria-label="Filter by category">
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.pill} ${active === cat ? styles.pillActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article count */}
        <p className={`${styles.count} reveal`}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          {active !== ALL ? ` in "${active}"` : ''}
        </p>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map(article => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className={`${styles.card} reveal`}
            >
              <div className={styles.thumb}>
                {article.emoji}
                {article.comingSoon && <span className={styles.soonBadge}>Coming Soon</span>}
              </div>
              <div className={styles.body}>
                <div className={styles.cat}>{article.category}</div>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.meta}>
                  <span>{article.date} · {article.readTime}</span>
                  <span className={styles.more}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No articles in this category yet.</p>
        )}
      </div>
    </section>
  )
}
