import { useState } from 'react'
import useReveal from './useReveal'
import styles from './Services.module.css'

const SERVICES = [
  {
    id: 'training',
    label: 'Training Services',
    sub: 'Building expertise in your team',
    icon: '🎓',
    items: [
      {
        title: 'Technical Cleanliness Awareness Training',
        points: [
          'Introduction to technical cleanliness concepts',
          'Industry standards overview — ISO 16232, VDA 19.1',
          'Understanding particle contamination, sources & risks',
        ],
      },
      {
        title: 'Cleanliness Inspection Method Training',
        points: [
          'Qualification test (Blank and Declining Test)',
          'Extraction methods (ultrasonic, pressure rinsing, etc.)',
          'Filtration and membrane preparation',
          'Microscopic analysis and particle counting',
          'Classification of particles (metallic, non-metallic, reflective)',
          'Documentation and reporting as per customer specification',
        ],
      },
      {
        title: 'Specification Interpretation Training',
        points: [
          'Reading and understanding cleanliness drawings and specs',
          'Particle size classes and cleanliness codes',
          'Translate customer requirements into shop-floor controls',
        ],
      },
    ],
  },
  {
    id: 'consultation',
    label: 'Consultation Services',
    sub: 'Expert guidance for your processes',
    icon: '🔬',
    items: [
      {
        title: 'Current Method Review',
        points: [
          'Gap assessment of existing cleanliness inspection process',
          'Evaluation of equipment, extraction methods, and lab setup',
          'Review of documentation, sampling plans, and reporting formats',
        ],
      },
      {
        title: 'Customer Specification Compliance Support',
        points: [
          'Detailed review of customer cleanliness specifications',
          'Identifying gaps between current capability and requirements',
          'Roadmap to achieve compliance',
        ],
      },
      {
        title: 'Implementation Assistance',
        points: [
          'Support in establishing/improving in-house cleanliness lab',
          'Guidance on equipment selection (without vendor bias)',
          'SOP and work instruction development',
          'Trial run support and result interpretation',
        ],
      },
      {
        title: 'Manufacturing Cleanliness Audit',
        points: [
          'Shop-floor walkthrough to identify particle generation sources',
          'Assessment of machining, assembly, and handling processes',
          'Evaluation of environmental controls (air, coolant, packaging)',
          'Identification of cross-contamination risks',
          'Audit findings report with prioritized corrective actions',
        ],
      },
      {
        title: 'Washing Process Optimization',
        points: [
          'Review of current washing/cleaning process',
          'Assessment of wash media compatibility with component materials',
          'Recommendations for process parameter improvements',
          'Support in validating optimized washing process against targets',
        ],
      },
    ],
  },
]

export default function Services() {
  const ref = useReveal()
  const [active, setActive] = useState('training')
  const current = SERVICES.find(s => s.id === active)

  return (
    <section id="services" className={styles.section} ref={ref}>
      <div className="section-wrap">

        {/* Header */}
        <div className={styles.header + ' reveal'}>
          <span className="tag" style={{ background: 'rgba(212,43,26,.12)', color: 'var(--red)' }}>What I Offer</span>
          <h2 className={styles.h2}>Professional Services in<br /><span className={styles.red}>Technical Cleanliness</span></h2>
          <div className={styles.badges}>
            {['ISO 16232', 'VDA 19.1', 'VDA 19.2'].map(b => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </div>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabs + ' reveal'}>
          {SERVICES.map(s => (
            <button
              key={s.id}
              className={styles.tab + (active === s.id ? ' ' + styles.tabActive : '')}
              onClick={() => setActive(s.id)}
            >
              <span className={styles.tabIcon}>{s.icon}</span>
              <span>
                <span className={styles.tabLabel}>{s.label}</span>
                <span className={styles.tabSub}>{s.sub}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className={styles.grid + ' reveal'}>
          {current.items.map((item, i) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.cardNum}>0{i + 1}</div>
              <div className={styles.cardTitle}>{item.title}</div>
              <ul className={styles.points}>
                {item.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
