import { useEffect, useState, type ReactNode } from 'react'
import {
  businessModel,
  expansionStrategy,
  founders,
  investmentAllocations,
  journeySteps,
  launchStrategy,
  marketStats,
  navigation,
  problemStatements,
  projectionYears,
  verificationSteps,
  type DetailItem,
  type Founder,
} from './content'

const totalSections = 16

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
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-logo" href="#slide-1" aria-label="Kouponly home">
          <Brand />
        </a>
        <nav className="site-nav" aria-label="Investor overview">
          {navigation.map(({ label, target }) => (
            <a
              key={target}
              href={`#${target}`}
              aria-current={activeSection === target ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#slide-16">
          Start a conversation
        </a>
      </div>
    </header>
  )
}

function Device({
  asset,
  alt,
  className = '',
}: {
  asset: ImageAsset
  alt: string
  className?: string
}) {
  return (
    <div className={`device ${className}`}>
      <span className="device__island" aria-hidden="true" />
      <ResponsiveImage
        asset={asset}
        alt={alt}
        width={1200}
        height={675}
        sizes="(max-width: 640px) 76vw, 420px"
      />
    </div>
  )
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
        <ProofBadge>Student-first engagement platform</ProofBadge>
        <h1>
          Better value for Gen Z.
          <br />
          Better attention for brands.
        </h1>
        <p>
          Kouponly connects verified students with local experiences and meaningful
          savings—bridging the gap between Gen Z and brands.
        </p>
        <div className="hero-actions">
          <a className="button button--lime" href="#slide-13">
            Review the opportunity
          </a>
          <a className="button button--ghost" href="#slide-16">
            Contact the founders
          </a>
        </div>
        <p className="hero-proof">Designed around trust, relevance, and repeat use.</p>
      </div>
      <div className="hero-visual">
        <div className="hero-ticket" aria-hidden="true">
          <span>VERIFIED VALUE</span>
          <strong>01</strong>
        </div>
        <ResponsiveImage
          asset="mockup"
          alt="Kouponly app home screen showing local student offers"
          width={1200}
          height={1200}
          className="hero-mockup"
          sizes="(max-width: 640px) 108vw, (max-width: 1100px) 52vw, 620px"
          priority
        />
      </div>
    </InvestorSection>
  )
}

function Problem() {
  return (
    <InvestorSection number={2} label="Problem" tone="lime" className="problem-section">
      <div className="section-intro">
        <p className="kicker">A valuable audience is being missed</p>
        <h2>
          Students are influential consumers, yet brands still struggle to serve them
          well.
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
        <h2>A verified channel between student demand and local supply.</h2>
        <p className="lede">
          Kouponly is an engagement platform built for students and Gen Z, giving users
          relevant savings while brands earn measurable visits and repeat attention.
        </p>
        <div className="proof-row" aria-label="Kouponly value proposition">
          <ProofBadge>Verified users</ProofBadge>
          <ProofBadge>Relevant offers</ProofBadge>
          <ProofBadge>Measurable visits</ProofBadge>
        </div>
      </div>
      <Device
        asset="solution"
        alt="Kouponly product interface displaying student offers"
      />
    </InvestorSection>
  )
}

function Market() {
  return (
    <InvestorSection number={4} label="Market opportunity" tone="ink">
      <div className="section-intro section-intro--split">
        <p className="kicker">A high-frequency consumer market</p>
        <h2>Built for one of the world’s largest youth-driven audiences.</h2>
        <p className="lede">
          Kouponly is positioned around a mobile-first generation that discovers, chooses,
          and shares experiences in real time.
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
        Market figures are management estimates. The supporting source pack is available
        during diligence.
      </p>
    </InvestorSection>
  )
}

function Journey() {
  return (
    <InvestorSection number={5} label="Product journey" className="journey-section">
      <div className="section-intro section-intro--compact">
        <p className="kicker">From verification to value</p>
        <h2>One clear loop for students and brands.</h2>
      </div>
      <ol className="journey-grid">
        {journeySteps.map((step, index) => (
          <li key={step.title}>
            <span className="journey-number">{String(index + 1).padStart(2, '0')}</span>
            <Device asset={step.image} alt={`${step.title} in the Kouponly app`} />
            <div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </InvestorSection>
  )
}

function Verification() {
  return (
    <InvestorSection number={6} label="Technology" tone="lime">
      <div className="section-intro section-intro--split">
        <p className="kicker">Trust is the product infrastructure</p>
        <h2>Two verification paths. One credible student network.</h2>
        <p className="lede">
          Verification protects offer quality for brands while keeping eligibility
          straightforward for students.
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

function BusinessModel() {
  return (
    <InvestorSection number={7} label="Business model" tone="paper">
      <div className="section-intro section-intro--compact">
        <p className="kicker">Multiple aligned revenue paths</p>
        <h2>Designed to scale with users, brands, and distribution partners.</h2>
      </div>
      <DetailGrid items={businessModel} />
    </InvestorSection>
  )
}

function Strategy({ expansion = false }: { expansion?: boolean }) {
  const number = expansion ? 9 : 8
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
    <InvestorSection number={10} label="Founding team" tone="lime">
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
      tone={number === 11 ? 'wine' : 'paper'}
      className="founder-profile"
    >
      <div className="founder-profile__identity">
        <ResponsiveImage
          asset={founder.image}
          alt={founder.name}
          width={1200}
          height={675}
          sizes="(max-width: 640px) 42vw, 360px"
        />
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
    <InvestorSection number={13} label="The ask" tone="ink" className="ask-section">
      <div className="ask-ticket">
        <p className="kicker">Seed investment opportunity</p>
        <h2>Seeking ₹6,00,00,000 for 10% equity.</h2>
        <p>
          Capital will be used to strengthen the product, team, partner network, and
          operating foundation required for scale.
        </p>
        <a className="button button--lime" href="#slide-16">
          Discuss the round
        </a>
      </div>
    </InvestorSection>
  )
}

function InvestmentBreakdown() {
  const listedTotal = investmentAllocations.reduce((sum, item) => sum + item.value, 0)

  return (
    <InvestorSection number={14} label="Use of funds">
      <div className="section-intro section-intro--compact">
        <p className="kicker">Current allocation framework</p>
        <h2>Investment breakdown</h2>
      </div>
      <figure className="allocation-figure">
        <div className="allocation-list">
          {investmentAllocations.map((item) => (
            <div className="allocation-row" key={item.label}>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}%</strong>
              </div>
              <div
                className={`allocation-track allocation-track--${item.value}`}
                aria-hidden="true"
              >
                <i />
              </div>
            </div>
          ))}
        </div>
        <figcaption>
          <strong>{listedTotal}% currently specified.</strong>
          <span>
            The remaining {100 - listedTotal}% allocation has not yet been specified and
            will be finalized before investment.
          </span>
        </figcaption>
      </figure>
    </InvestorSection>
  )
}

function Projections() {
  return (
    <InvestorSection number={15} label="Five-year outlook" tone="paper">
      <div className="section-intro section-intro--split">
        <p className="kicker">Illustrative management trajectory</p>
        <h2>Growth outlook, years one through five.</h2>
        <p className="lede">
          The charts show relative growth indices, not audited forecasts. Detailed
          financial values and assumptions are available during diligence.
        </p>
      </div>
      <div className="projection-grid">
        <figure>
          <figcaption>
            <span>Revenue growth index</span>
            <strong>0–100</strong>
          </figcaption>
          <div className="vertical-chart" aria-hidden="true">
            {projectionYears.map((item) => (
              <div key={item.year}>
                <span>{item.revenueIndex}</span>
                <i className={`index-height-${item.revenueIndex}`} />
                <b>Y{item.year}</b>
              </div>
            ))}
          </div>
        </figure>
        <figure>
          <figcaption>
            <span>User growth index</span>
            <strong>0–100</strong>
          </figcaption>
          <div className="horizontal-chart" aria-hidden="true">
            {projectionYears.map((item) => (
              <div key={item.year}>
                <b>Y{item.year}</b>
                <i className={`index-width-${item.userIndex}`} />
                <span>{item.userIndex}</span>
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
    <InvestorSection number={16} label="Contact" tone="lime" className="contact-section">
      <div className="section-intro section-intro--compact">
        <p className="kicker">Continue the conversation</p>
        <h2>Let’s build the student value network.</h2>
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
      <p>Investor overview · Management estimates are identified throughout.</p>
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
        <BusinessModel />
        <Strategy />
        <Strategy expansion />
        <Team />
        <FounderProfile founder={founders[0]} number={11} />
        <FounderProfile founder={founders[1]} number={12} />
        <Ask />
        <InvestmentBreakdown />
        <Projections />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
