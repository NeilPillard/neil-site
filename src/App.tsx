import { useEffect, useState, type ReactNode } from 'react'
import {
  founders,
  marketStats,
  navigation,
  problemStatements,
  projectionYears,
  verificationSteps,
  type Founder,
} from './content'

const totalSections = 10

type SectionTone = 'wine' | 'ink' | 'lime' | 'paper'

type InvestorSectionProps = {
  number: number
  label: string
  tone?: SectionTone
  className?: string
  children: ReactNode
}

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`brand${dark ? ' brand--dark' : ''}`}>
      koup<span>o</span>nly
    </span>
  )
}

function CouponSeam() {
  return <div className="coupon-seam" aria-hidden="true" />
}

function SectionHeader({ number, label }: { number: number; label: string }) {
  return (
    <div className="section-header" id={`section-${number}-label`}>
      <span>
        {String(number).padStart(2, '0')} / {totalSections}
      </span>
      <strong>{label}</strong>
    </div>
  )
}

function InvestorSection({
  number,
  label,
  tone = 'wine',
  className = '',
  children,
}: InvestorSectionProps) {
  return (
    <section
      id={`slide-${number}`}
      className={`investor-section investor-section--${tone} ${className}`}
      aria-labelledby={`section-${number}-label`}
    >
      <CouponSeam />
      <div className="section-shell">
        <SectionHeader number={number} label={label} />
        <div className="section-content">{children}</div>
      </div>
    </section>
  )
}

function SiteHeader({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`site-header${menuOpen ? ' is-menu-open' : ''}`}>
      <div className="site-header__inner">
        <a className="site-logo" href="#slide-1" aria-label="Kouponly home">
          <Brand />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className="site-nav" id="site-navigation" aria-label="Investor overview">
          {navigation.map(({ label, target }) => (
            <a
              key={target}
              href={`#${target}`}
              aria-current={activeSection === target ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#slide-10">
          Connect
        </a>
      </div>
    </header>
  )
}

function ProductScreenshot({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return <img className={`product-screenshot ${className}`} src={src} alt={alt} />
}

function ProofBadge({ children }: { children: ReactNode }) {
  return (
    <span className="proof-badge">
      <span aria-hidden="true">✓</span>
      {children}
    </span>
  )
}

function Intro() {
  return (
    <InvestorSection number={1} label="Investor overview" className="hero-section">
      <div className="hero-copy">
        <ProofBadge>Created for Students</ProofBadge>
        <h1>The Student Ecosystem.</h1>
        <p>Save. Earn. Learn. Experience it all.</p>
        <div className="hero-actions">
          <a className="button button--lime" href="#slide-8">
            The opportunity
          </a>
          <a className="button button--ghost" href="#slide-10">
            The founders
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="product-stage" aria-hidden="true" />
        <ProductScreenshot
          src="/deck-assets/supplied/discovery-transparent.webp"
          alt="Kouponly product interface displaying local student offers"
          className="hero-device"
        />
      </div>
    </InvestorSection>
  )
}

function Problem() {
  return (
    <InvestorSection number={2} label="Problem" tone="lime" className="problem-section">
      <div className="section-intro">
        <p className="kicker">The disconnect</p>
        <h2>Students look for value. Markets look for exposure</h2>
      </div>
      <ul className="problem-list">
        {problemStatements.map((statement, index) => (
          <li key={statement}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <p>{statement}</p>
          </li>
        ))}
      </ul>
    </InvestorSection>
  )
}

function Solution() {
  return (
    <InvestorSection
      number={3}
      label="Solution"
      tone="paper"
      className="solution-section"
    >
      <div className="section-intro">
        <p className="kicker">Meet Kouponly</p>
        <h2>Student Life. Reimagined.</h2>
        <p className="lede">
          One platform that brings savings, opportunities, experiences, skills, and
          rewards together.
        </p>
        <div className="proof-row" aria-label="Kouponly value proposition">
          <ProofBadge>Real Students</ProofBadge>
          <ProofBadge>Real Value</ProofBadge>
          <ProofBadge>Real Results</ProofBadge>
        </div>
      </div>
      <ProductScreenshot
        src="/deck-assets/supplied/welcome-transparent.webp"
        alt="Kouponly welcome screen"
      />
    </InvestorSection>
  )
}

function Market() {
  return (
    <InvestorSection number={4} label="Market opportunity" tone="ink">
      <div className="section-intro section-intro--split">
        <p className="kicker">The opportunity</p>
        <h2>Young India is already moving.</h2>
        <p className="lede">
          Mobile-first consumers discover, decide, and share in real time. Kouponly meets
          them at the moment of choice.
        </p>
      </div>
      <ul className="metric-grid">
        {marketStats.map((stat) => (
          <li className="metric-card" key={stat.label}>
            <b>{stat.label}</b>
            <strong>{stat.value}</strong>
            <p>{stat.note}</p>
          </li>
        ))}
      </ul>
    </InvestorSection>
  )
}

function Verification() {
  return (
    <InvestorSection number={5} label="Technology" tone="lime">
      <div className="section-intro section-intro--split">
        <p className="kicker">Trust, built in</p>
        <h2>Real students. Real value.</h2>
      </div>
      <ol className="verification-grid">
        {verificationSteps.map((step, index) => (
          <li key={step.title}>
            <span className="verification-grid__number" aria-hidden="true">
              0{index + 1}
            </span>
            <p className="verification-grid__timing">{step.timing}</p>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>
    </InvestorSection>
  )
}

function FounderProfile({ founder, number }: { founder: Founder; number: number }) {
  return (
    <InvestorSection
      number={number}
      label={founder.fullName}
      tone={number === 8 ? 'wine' : 'paper'}
      className="founder-profile"
    >
      <div className="founder-profile__identity">
        <img src={`/deck-assets/supplied/${founder.id}.webp`} alt={founder.name} />
        <div>
          <p className="kicker">{founder.role}</p>
          <h2>{founder.focus}</h2>
        </div>
      </div>
      <ul className="achievement-list">
        {founder.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </InvestorSection>
  )
}

function Ask() {
  return (
    <InvestorSection number={8} label="The ask" tone="ink" className="ask-section">
      <div className="ask-ticket">
        <p className="kicker">The seed round</p>
        <h2>₹10 crore. 10% equity.</h2>
        <p>
          Build the product. Grow the team. Expand the network. Create the place students
          check before they go out.
        </p>
        <a className="button button--lime" href="#slide-10">
          Let’s talk
        </a>
      </div>
    </InvestorSection>
  )
}

function Projections() {
  return (
    <InvestorSection number={9} label="Five-year outlook" tone="paper">
      <div className="section-intro section-intro--split">
        <p className="kicker">The five-year view</p>
        <h2>Start focused. Scale with momentum.</h2>
        <p className="lede">
          Revenue scales from early traction to ₹1,650 Cr by Year 5, driven by increasing
          market penetration and geographic expansion.
        </p>
      </div>
      <div className="projection-grid">
        <figure>
          <figcaption>
            <span>Revenue</span>
            <strong>₹ crore</strong>
          </figcaption>
          <div className="revenue-chart" aria-label="Revenue in crores (INR) by year">
            <div className="revenue-chart__axis" aria-hidden="true">
              {[2000, 1500, 1000, 500, 0].map((value) => (
                <span key={value}>₹{value.toLocaleString('en-IN')} Cr</span>
              ))}
            </div>
            <div className="revenue-chart__plot">
              {[2000, 1500, 1000, 500].map((value) => (
                <i key={value} style={{ top: `${100 - (value / 2000) * 100}%` }} />
              ))}
              <div className="revenue-chart__bars">
                {projectionYears.map((item) => (
                  <div
                    key={item.year}
                    className={`revenue-chart__year revenue-chart__year--${item.year}`}
                  >
                    <strong className="revenue-chart__value">
                      {item.revenueCr === 0 ? 'Minimal' : `₹${item.revenueCr} Cr`}
                    </strong>
                    <i
                      className="revenue-chart__bar"
                      style={{
                        height: `${Math.max((item.revenueCr / 2000) * 100, 0.5)}%`,
                      }}
                      aria-hidden="true"
                    />
                    <span>Year {item.year}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="revenue-chart__milestones">
              {projectionYears.map((item) => (
                <div key={item.year}>
                  <strong>Year {item.year}</strong>
                  <span>{item.outlook}</span>
                </div>
              ))}
            </div>
          </div>
        </figure>
      </div>
      <table className="sr-only">
        <caption>Illustrative Kouponly revenue outlook by year in crores (INR)</caption>
        <thead>
          <tr>
            <th>Year</th>
            <th>Revenue (crores INR)</th>
            <th>Outlook</th>
          </tr>
        </thead>
        <tbody>
          {projectionYears.map((item) => (
            <tr key={item.year}>
              <td>{item.year}</td>
              <td>{item.revenueCr}</td>
              <td>{item.outlook}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InvestorSection>
  )
}

function ContactCard({ founder }: { founder: Founder }) {
  const phoneHref = founder.phone.replace(/\s/g, '')

  return (
    <article className="contact-card">
      <p className="kicker">{founder.role}</p>
      <h3>{founder.fullName}</h3>
      <a href={`mailto:${founder.email}`}>{founder.email}</a>
      <a href={`tel:${phoneHref}`}>{founder.phone}</a>
      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn profile <span aria-hidden="true">↗</span>
      </a>
    </article>
  )
}

function Contact() {
  return (
    <InvestorSection number={10} label="Contact" tone="lime" className="contact-section">
      <div className="section-intro section-intro--compact">
        <p className="kicker">The next step</p>
        <h2>Let’s disrupt the market together</h2>
      </div>
      <div className="contact-grid">
        {founders.map((founder) => (
          <ContactCard founder={founder} key={founder.id} />
        ))}
      </div>
    </InvestorSection>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href="#slide-1" aria-label="Back to Kouponly overview">
        <Brand />
      </a>
      <p>Investor overview · Management estimates noted throughout.</p>
      <a href="https://kouponly.com" target="_blank" rel="noopener noreferrer">
        kouponly.com <span aria-hidden="true">↗</span>
      </a>
    </footer>
  )
}

function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState('slide-1')

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.investor-section'),
    )
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealObserver =
      'IntersectionObserver' in window && !reducedMotion
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('is-visible')
                  revealObserver?.unobserve(entry.target)
                }
              })
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
          )
        : null

    sections.forEach((section) => {
      if (revealObserver) revealObserver.observe(section)
      else section.classList.add('is-visible')
    })

    let frame = 0
    const updateActiveSection = () => {
      frame = 0
      const marker = Math.min(180, window.innerHeight * 0.28)
      const active =
        sections.find((section) => {
          const rect = section.getBoundingClientRect()
          return rect.top <= marker && rect.bottom > marker
        }) ?? sections[0]

      if (!active) return
      setActiveSection(active.id)
      if (window.location.hash !== `#${active.id}`) {
        window.history.replaceState(null, '', `#${active.id}`)
      }
    }

    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }

    const scrollToHash = (hash: string, behavior: ScrollBehavior) => {
      if (!/^#slide-\d+$/.test(hash)) return
      const target = document.querySelector<HTMLElement>(hash)
      target?.scrollIntoView({ behavior, block: 'start' })
    }

    const handleInternalLink = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#slide-"]')
      if (!anchor) return
      event.preventDefault()
      const hash = anchor.hash
      window.history.replaceState(null, '', hash)
      scrollToHash(hash, reducedMotion ? 'auto' : 'smooth')
    }

    const handleHashChange = () => scrollToHash(window.location.hash, 'auto')

    document.addEventListener('click', handleInternalLink)
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)
    window.addEventListener('hashchange', handleHashChange)

    const initialFrame = window.requestAnimationFrame(() => {
      if (window.location.hash) scrollToHash(window.location.hash, 'auto')
      updateActiveSection()
    })

    return () => {
      revealObserver?.disconnect()
      document.removeEventListener('click', handleInternalLink)
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
      window.removeEventListener('hashchange', handleHashChange)
      window.cancelAnimationFrame(initialFrame)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return activeSection
}

export default function App() {
  const activeSection = useSectionNavigation()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to investor overview
      </a>
      <SiteHeader activeSection={activeSection} />
      <main id="main-content">
        <Intro />
        <Problem />
        <Solution />
        <Market />
        <Verification />
        <FounderProfile founder={founders[0]} number={6} />
        <FounderProfile founder={founders[1]} number={7} />
        <Ask />
        <Projections />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
