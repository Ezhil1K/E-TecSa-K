import { useParams, Link, Navigate } from 'react-router-dom'
import { articles } from '../data/articles'
import styles from './ArticleDetailPage.module.css'

function UnderDevelopment({ article }) {
  return (
    <div className={styles.page}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Link to="/articles" className={styles.back}>← Back to Articles</Link>
          <span className={styles.cat}>{article.category}</span>
          <h1 className={styles.h1}>{article.title}</h1>
          <div className={styles.meta}>
            <span>⏱ {article.readTime}</span>
          </div>
        </div>
        <div className={styles.bannerEmoji}>{article.emoji}</div>
      </div>

      {/* Under Development screen */}
      <div className={styles.wrap}>
        <div className={styles.udBox}>
          <div className={styles.udIcon}>🚧</div>
          <h2 className={styles.udTitle}>Article Under Development</h2>
          <p className={styles.udText}>
            This article is currently being written. Check back soon — it will cover everything about{' '}
            <strong>{article.title.toLowerCase()}</strong>.
          </p>
          <div className={styles.udActions}>
            <Link to="/articles" className="btn btn-outline-red">← Browse All Articles</Link>
            <Link to="/#contact" className="btn btn-primary">Get in Touch</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ArticleDetailPage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === id)

  if (!article) return <Navigate to="/articles" replace />

  if (article.comingSoon) return <UnderDevelopment article={article} />

  const index = articles.indexOf(article)
  const prev = articles[index - 1] || null
  const next = articles[index + 1] || null

  return (
    <article className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Link to="/articles" className={styles.back}>← Back to Articles</Link>
          <span className={styles.cat}>{article.category}</span>
          <h1 className={styles.h1}>{article.title}</h1>
          <div className={styles.meta}>
            <span>📅 {article.date}</span>
            <span>⏱ {article.readTime}</span>
          </div>
        </div>
        <div className={styles.bannerEmoji}>{article.emoji}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.content}>
          {article.content.map((block, i) => {
            if (block.startsWith('## ')) {
              return <h2 key={i} className={styles.subheading}>{block.slice(3)}</h2>
            }
            return <p key={i} className={styles.para}>{block}</p>
          })}
        </div>

        <div className={styles.cta}>
          <p>Have a technical cleanliness challenge? I would love to help.</p>
          <Link to="/#contact" className="btn btn-primary">Get a Consultation →</Link>
        </div>

        <nav className={styles.prevNext} aria-label="Article navigation">
          <div className={styles.prevNextItem}>
            {prev && (
              <Link to={"/articles/" + prev.id} className={styles.navCard}>
                <span className={styles.navDir}>← Previous</span>
                <span className={styles.navTitle}>{prev.title}</span>
              </Link>
            )}
          </div>
          <div className={styles.prevNextItem + " " + styles.right}>
            {next && (
              <Link to={"/articles/" + next.id} className={styles.navCard}>
                <span className={styles.navDir}>Next →</span>
                <span className={styles.navTitle}>{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </article>
  )
}
