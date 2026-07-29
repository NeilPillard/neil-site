import { useEffect, useState, type ReactNode } from 'react'
import {
  expansionStrategy,
  founders,
  launchStrategy,
  marketStats,
  navigation,
  problemStatements,
  projectionYears,
  verificationSteps,
  type DetailItem,
  type Founder,
} from './content'

const totalSections = 11

type ImageAsset = 'mockup' | 'intro' | 'journey' | 'solution' | 'neil' | 'aazam'
type SectionTone = 'wine' | 'ink' | 'lime' | 'paper'

type ResponsiveImageProps = {
  asset: ImageAsset
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
  priority?: boolean
}

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

function ResponsiveImage({
  asset,
  alt,
  width,
  height,
  className,
  sizes = '100vw',
  priority = false,
}: ResponsiveImageProps) {
  const base = `/deck-assets/optimized/${asset}`

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${base}-640.avif 640w, ${base}-1200.avif 1200w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w`}
        sizes={sizes}
      />
      <img
        className={className}
        src={`${base}-1200.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
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
        <a className="header-cta" href="#slide-11">
          Connect
        </a>
      </div>
    </header>
  )
}

function Device({
  screen,
  alt,
  className = '',
}: {
  screen: 'verification' | 'discovery' | 'redemption'
  alt: string
  className?: string
}) {
  return (
    <figure className={`device ${className}`} aria-label={alt}>
      <span className="device__island" aria-hidden="true" />
      <div className="app-screen" aria-hidden="true">
        <div className="app-status" aria-hidden="true">
          <b>9:41</b>
          <span>● ● ▰</span>
        </div>
        <div className="app-bar">
          <Brand dark />
          <span className="app-avatar" aria-hidden="true">
            K
          </span>
        </div>
        {screen === 'verification' && (
          <div className="screen-verification">
            <span className="screen-icon" aria-hidden="true">
              ✓
            </span>
            <p className="screen-eyebrow">Student access</p>
            <div className="screen-title">
              Verify once.
              <br />
              Save all year.
            </div>
            <p>Use your student email to unlock verified offers near you.</p>
            <label>
              Student email
              <span>name@university.edu</span>
            </label>
            <button type="button" tabIndex={-1}>
              Verify student status
            </button>
            <small>Secure verification · Usually instant</small>
          </div>
        )}
        {screen === 'discovery' && (
          <div className="screen-discovery">
            <p className="screen-eyebrow">Good afternoon</p>
            <div className="screen-title">What feels good today?</div>
            <div className="screen-search">Search food, coffee, experiences</div>
            <div className="offer-feature">
              <span>Weekend pick</span>
              <strong>35% off your next coffee run.</strong>
              <small>Daily Grind · 0.8 km</small>
            </div>
            <div className="offer-heading">
              <b>Near you</b>
              <span>See all</span>
            </div>
            <div className="offer-row">
              <i className="offer-art offer-art--food">🍔</i>
              <div>
                <b>Urban Burger Club</b>
                <small>30% off · Today</small>
              </div>
              <strong>›</strong>
            </div>
            <div className="offer-row">
              <i className="offer-art offer-art--coffee">☕</i>
              <div>
                <b>Morning Theory</b>
                <small>Free pastry · 1.1 km</small>
              </div>
              <strong>›</strong>
            </div>
          </div>
        )}
        {screen === 'redemption' && (
          <div className="screen-redemption">
            <div className="success-mark" aria-hidden="true">
              ✓
            </div>
            <p className="screen-eyebrow">Offer redeemed</p>
            <div className="screen-title">You saved ₹240.</div>
            <p>Your student offer at Daily Grind has been applied.</p>
            <div className="receipt">
              <span>Redemption ID</span>
              <b>KP87TI3</b>
              <span>Offer</span>
              <b>35% off</b>
              <span>Today</span>
              <b>4:42 PM</b>
            </div>
            <button type="button" tabIndex={-1}>
              Discover another offer
            </button>
          </div>
        )}
        <div className="app-tabs" aria-hidden="true">
          <span className={screen === 'discovery' ? 'is-active' : ''}>
            ⌂<small>Home</small>
          </span>
          <span>
            ♡<small>Saved</small>
          </span>
          <span>
            ⌖<small>Explore</small>
          </span>
          <span>
            ○<small>Profile</small>
          </span>
        </div>
      </div>
    </figure>
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

function DetailGrid({
  items,
  ordered = false,
}: {
  items: DetailItem[]
  ordered?: boolean
}) {
  const List = ordered ? 'ol' : 'ul'

  return (
    <List className={`detail-grid${ordered ? ' detail-grid--ordered' : ''}`}>
      {items.map((item, index) => (
        <li className="detail-card" key={item.title}>
          <span className="detail-card__mark" aria-hidden="true">
            {ordered ? String(index + 1).padStart(2, '0') : '✓'}
          </span>
          <div>
            <h3>{item.title}</h3>
            {item.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </li>
      ))}
    </List>
  )
}

function Intro() {
  return (
    <InvestorSection number={1} label="Investor overview" className="hero-section">
      <div className="hero-copy">
        <ProofBadge>Created for Students</ProofBadge>
        <h1>
          Save on more.
          <br />
          Live a little bigger.
        </h1>
        <p>
          One place for verified students to discover better value—and for brands to
          become part of everyday life.
        </p>
        <div className="hero-actions">
          <a className="button button--lime" href="#slide-9">
            See the opportunity
          </a>
          <a className="button button--ghost" href="#slide-11">
            Meet the founders
          </a>
        </div>
        <p className="hero-proof">Verified. Relevant. Ready when students are.</p>
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
        <h2>
          Students look for value. Brands look for exposure
        </h2>
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
        <h2>One app. More student life.</h2>
        <p className="lede">
          Students discover offers worth using. Brands reach verified people ready to
          visit, buy, and come back.
        </p>
        <div className="proof-row" aria-label="Kouponly value proposition">
          <ProofBadge>Real students</ProofBadge>
          <ProofBadge>Useful offers</ProofBadge>
          <ProofBadge>Visible results</ProofBadge>
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
      <p className="data-note">
        Management estimates. Supporting sources are available during diligence.
      </p>
    </InvestorSection>
  )
}

function Journey() {
  return (
    <InvestorSection number={5} label="Product journey" className="journey-section">
      <div className="section-intro section-intro--compact">
        <p className="kicker">The experience</p>
        <h2>Verify. Discover. Save.</h2>
      </div>
      <figure className="journey-showcase">
        <img
          src="/deck-assets/supplied/journey-flow.webp"
          alt="Kouponly journey from student verification through exploring discounts to redeeming offers"
        />
      </figure>
    </InvestorSection>
  )
}

function Verification() {
  return (
    <InvestorSection number={6} label="Technology" tone="lime">
      <div className="section-intro section-intro--split">
        <p className="kicker">Trust, built in</p>
        <h2>Real students. Real value.</h2>
        <p className="lede">
          Simple verification protects every offer—without getting in the student’s way.
        </p>
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

function Strategy({ expansion = false }: { expansion?: boolean }) {
  const number = expansion ? 8 : 7
  const items = expansion ? expansionStrategy : launchStrategy

  return (
    <InvestorSection
      number={number}
      label="Go-to-market strategy"
      tone={expansion ? 'ink' : 'wine'}
    >
      <div className="section-intro section-intro--compact">
        <p className="kicker">
          {expansion ? 'Scale with evidence' : 'Win the first market'}
        </p>
        <h2>{expansion ? 'Expansion strategy' : 'Launch strategy'}</h2>
      </div>
      <DetailGrid items={items} ordered />
    </InvestorSection>
  )
}

function Team() {
  return (
    <InvestorSection number={8} label="Founding team" tone="lime">
      <div className="section-intro section-intro--split">
        <p className="kicker">Operators across growth and technology</p>
        <h2>Built by founders who have shipped, scaled, and partnered.</h2>
        <p className="lede">
          The team combines ecosystem development, business growth, product engineering,
          and open-source experience.
        </p>
      </div>
      <div className="founder-grid">
        {founders.map((founder) => (
          <article key={founder.id}>
            <ResponsiveImage
              asset={founder.image}
              alt={founder.name}
              width={1200}
              height={675}
              sizes="(max-width: 640px) 92vw, 520px"
            />
            <div>
              <h3>{founder.name}</h3>
              <p>{founder.role}</p>
            </div>
          </article>
        ))}
      </div>
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
    <InvestorSection number={9} label="The ask" tone="ink" className="ask-section">
      <div className="ask-ticket">
        <p className="kicker">The seed round</p>
        <h2>₹6 crore. 10% equity.</h2>
        <p>
          Build the product. Grow the team. Expand the network. Create the place students
          check before they go out.
        </p>
        <a className="button button--lime" href="#slide-11">
          Let’s talk
        </a>
      </div>
    </InvestorSection>
  )
}

function Projections() {
  return (
    <InvestorSection number={10} label="Five-year outlook" tone="paper">
      <div className="section-intro section-intro--split">
        <p className="kicker">The five-year view</p>
        <h2>Start focused. Scale with momentum.</h2>
        <p className="lede">
          Relative growth indices, not audited forecasts. Detailed assumptions are
          available during diligence.
        </p>
      </div>
      <div className="projection-grid">
        <figure>
          <figcaption>
            <span>Revenue momentum</span>
            <strong>0–100</strong>
          </figcaption>
          <div className="vertical-chart" aria-label="Revenue growth index by year">
            {projectionYears.map((item) => (
              <div key={item.year}>
                <span className="chart-value">{item.revenueIndex}</span>
                <i className={`index-height-${item.revenueIndex}`} aria-hidden="true" />
                <b>Y{item.year}</b>
              </div>
            ))}
          </div>
        </figure>
        <figure>
          <figcaption>
            <span>User momentum</span>
            <strong>0–100</strong>
          </figcaption>
          <div className="horizontal-chart" aria-label="User growth index by year">
            {projectionYears.map((item) => (
              <div key={item.year}>
                <b>Y{item.year}</b>
                <i className={`index-width-${item.userIndex}`} aria-hidden="true" />
                <span className="chart-value">{item.userIndex}</span>
              </div>
            ))}
          </div>
        </figure>
      </div>
      <table className="sr-only">
        <caption>Illustrative Kouponly growth indices by year</caption>
        <thead>
          <tr>
            <th>Year</th>
            <th>Revenue index</th>
            <th>User index</th>
          </tr>
        </thead>
        <tbody>
          {projectionYears.map((item) => (
            <tr key={item.year}>
              <td>{item.year}</td>
              <td>{item.revenueIndex}</td>
              <td>{item.userIndex}</td>
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
    <InvestorSection number={11} label="Contact" tone="lime" className="contact-section">
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
        <Journey />
        <Verification />
        <FounderProfile founder={founders[0]} number={7} />
        <FounderProfile founder={founders[1]} number={8} />
        <Ask />
        <Projections />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
