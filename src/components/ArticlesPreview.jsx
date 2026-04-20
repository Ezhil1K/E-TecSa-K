import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import useReveal from './useReveal'
import styles from './ArticlesPreview.module.css'

export default function ArticlesPreview() {
  const ref = useReveal()
  // Show featured first, then up to 3 more
  const featured = articles.find(a => a.featured)
  const others   = articles.filter(a => !a.featured).slice(0, 3)

  return (
    <section id="articles" className={styles.section} ref={ref}>
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="tag">Knowledge Hub</span>
          <h2 className="section-h2">Articles &amp; Resources</h2>
          <p className="section-sub">
            In-depth technical content, best practices, and insights from the field of technical cleanliness.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Featured */}
          {featured && (
            <Link to={`/articles/${featured.id}`} className={`${styles.card} ${styles.featured} reveal`}>
              <div className={styles.thumb}>{featured.emoji}</div>
              <div className={styles.body}>
                <div className={styles.cat}>{featured.category} · Featured</div>
                <h3 className={styles.title}>{featured.title}</h3>
                <p className={styles.excerpt}>{featured.excerpt}</p>
                <div className={styles.meta}>
                  <span>{featured.date} · {featured.readTime}</span>
                  <span className={styles.more}>Read Article →</span>
                </div>
              </div>
            </Link>
          )}

          {/* Others */}
          {others.map(a => (
            <Link key={a.id} to={`/articles/${a.id}`} className={`${styles.card} reveal`}>
              <div className={styles.thumb}>{a.emoji}</div>
              <div className={styles.body}>
                <div className={styles.cat}>{a.category}</div>
                <h3 className={styles.title}>{a.title}</h3>
                <p className={styles.excerpt}>{a.excerpt}</p>
                <div className={styles.meta}>
                  <span>{a.date} · {a.readTime}</span>
                  <span className={styles.more}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.cta}>
          <Link to="/articles" className="btn btn-outline">
            View All {articles.length} Articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
