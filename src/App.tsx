import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
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
const TURNSTILE_SITE_KEY = '0x4AAAAAAEEg3HHvHgQf9Z5K'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback': () => void
          'error-callback': () => void
        },
      ) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}

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
          {navigation.map((item) => {
            const href = item.href ?? `#${item.target}`
            return (
              <a
                key={href}
                href={href}
                aria-current={
                  item.target && activeSection === item.target ? 'location' : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          })}
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
        <a
          className="founder-profile__image-link"
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${founder.fullName} on LinkedIn`}
        >
          <img src={`/deck-assets/supplied/${founder.id}.webp`} alt={founder.name} />
        </a>
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
        <p className="contact-section__email">
          General enquiries: <a href="mailto:info@kouponly.in">info@kouponly.in</a>
        </p>
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
      <div className="site-footer__links">
        <a href="mailto:info@kouponly.in">info@kouponly.in</a>
        <a href="https://kouponly.com" target="_blank" rel="noopener noreferrer">
          kouponly.com <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  )
}

type WaitlistStatus = 'idle' | 'submitting' | 'success' | 'error'
type AdminStatus = 'idle' | 'submitting' | 'error'

type WaitlistEntry = {
  id: number
  name: string
  email: string
  phone: string
  instagram_handle: string
  created_at: string
}

type Country = { name: string; code: string; dialCode: string }

const countries: Country[] = [
  { name: 'India', code: 'IN', dialCode: '+91' },
  { name: 'Qatar', code: 'QA', dialCode: '+974' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971' },
  { name: 'United States', code: 'US', dialCode: '+1' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44' },
  { name: 'Canada', code: 'CA', dialCode: '+1' },
  { name: 'Australia', code: 'AU', dialCode: '+61' },
  { name: 'Bangladesh', code: 'BD', dialCode: '+880' },
  { name: 'Bahrain', code: 'BH', dialCode: '+973' },
  { name: 'France', code: 'FR', dialCode: '+33' },
  { name: 'Germany', code: 'DE', dialCode: '+49' },
  { name: 'Indonesia', code: 'ID', dialCode: '+62' },
  { name: 'Ireland', code: 'IE', dialCode: '+353' },
  { name: 'Italy', code: 'IT', dialCode: '+39' },
  { name: 'Japan', code: 'JP', dialCode: '+81' },
  { name: 'Kenya', code: 'KE', dialCode: '+254' },
  { name: 'Kuwait', code: 'KW', dialCode: '+965' },
  { name: 'Malaysia', code: 'MY', dialCode: '+60' },
  { name: 'Maldives', code: 'MV', dialCode: '+960' },
  { name: 'Nepal', code: 'NP', dialCode: '+977' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31' },
  { name: 'New Zealand', code: 'NZ', dialCode: '+64' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234' },
  { name: 'Oman', code: 'OM', dialCode: '+968' },
  { name: 'Pakistan', code: 'PK', dialCode: '+92' },
  { name: 'Philippines', code: 'PH', dialCode: '+63' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966' },
  { name: 'Singapore', code: 'SG', dialCode: '+65' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27' },
  { name: 'South Korea', code: 'KR', dialCode: '+82' },
  { name: 'Sri Lanka', code: 'LK', dialCode: '+94' },
  { name: 'Turkey', code: 'TR', dialCode: '+90' },
]

function WaitlistPage() {
  const [count, setCount] = useState<number | null>(null)
  const [status, setStatus] = useState<WaitlistStatus>('idle')
  const [message, setMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [localPhone, setLocalPhone] = useState('')
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    let active = true

    const loadCount = async () => {
      try {
        const response = await fetch('/api/waitlist/count')
        if (!response.ok) throw new Error('Count request failed')
        const data = (await response.json()) as { count?: unknown }
        if (active && typeof data.count === 'number') setCount(data.count)
      } catch {
        // The signup form remains usable if the social-proof count is temporarily unavailable.
      }
    }

    void loadCount()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const container = turnstileContainerRef.current
    if (!container) return

    const widgetContainer = document.createElement('div')
    container.replaceChildren(widgetContainer)
    let widgetId: string | undefined
    const render = () => {
      if (!window.turnstile || widgetId) return
      widgetId = window.turnstile.render(widgetContainer, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      })
      turnstileWidgetIdRef.current = widgetId
    }

    let script = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/"]',
    )
    if (window.turnstile) {
      render()
    } else if (script) {
      script.addEventListener('load', render)
    } else {
      script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.addEventListener('load', render)
      document.head.append(script)
    }

    return () => {
      if (widgetId) window.turnstile?.remove(widgetId)
      if (turnstileWidgetIdRef.current === widgetId) {
        turnstileWidgetIdRef.current = null
      }
      script?.removeEventListener('load', render)
      widgetContainer.remove()
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    setStatus('submitting')
    setMessage('')

    if (!turnstileToken) {
      setStatus('error')
      setMessage('Complete the verification before joining the waitlist.')
      return
    }

    const form = new FormData(formElement)
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: `${selectedCountry.dialCode} ${localPhone}`,
      instagramHandle: String(form.get('instagramHandle') ?? ''),
      website: String(form.get('website') ?? ''),
      turnstileToken,
    }

    try {
      const response = await fetch('/api/waitlist/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as { count?: unknown; message?: unknown }

      if (!response.ok) {
        setStatus('error')
        setMessage(
          typeof data.message === 'string'
            ? data.message
            : 'Unable to join the waitlist.',
        )
        return
      }

      if (typeof data.count === 'number') setCount(data.count)
      formElement.reset()
      setLocalPhone('')
      setSelectedCountry(countries[0])
      setTurnstileToken('')
      if (turnstileWidgetIdRef.current) {
        window.turnstile?.reset(turnstileWidgetIdRef.current)
      }
      setStatus('success')
      setMessage('You’re on the list. We’ll be in touch soon.')
    } catch {
      setStatus('error')
      setMessage('We could not reach the waitlist right now. Please try again.')
    }
  }

  return (
    <div className="waitlist-page">
      <a className="skip-link" href="#waitlist-form">
        Skip to waitlist form
      </a>
      <header className="waitlist-header">
        <a className="site-logo" href="/" aria-label="Kouponly home">
          <Brand />
        </a>
        <a className="waitlist-header__back" href="/">
          Investor overview <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main className="waitlist-main">
        <section className="waitlist-intro" aria-labelledby="waitlist-title">
          <p className="kicker">Kouponly is coming</p>
          <h1 id="waitlist-title">Your next student essential.</h1>
          <p>Join the waitlist and be first to experience India’s student super app.</p>
          <div className="waitlist-count" aria-live="polite">
            <strong>{count === null ? '—' : count.toLocaleString()}</strong>
            <span>people have joined the waitlist</span>
          </div>
        </section>
        <section className="waitlist-card" aria-labelledby="waitlist-form-title">
          <div className="waitlist-card__topline">
            <span>Early access</span>
            <span aria-hidden="true">01</span>
          </div>
          <h2 id="waitlist-form-title">Save your spot.</h2>
          <p>Be first to hear when Kouponly launches near you.</p>
          <form id="waitlist-form" className="waitlist-form" onSubmit={handleSubmit}>
            <div className="waitlist-form__trap" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <label>
              Your name
              <input
                name="name"
                type="text"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
            <label className="waitlist-form__phone-label">
              Mobile number
              <span className="waitlist-form__phone-row">
                <select
                  className="country-picker"
                  aria-label="Country code"
                  value={selectedCountry.code}
                  onChange={(event) => {
                    const country = countries.find(
                      (item) => item.code === event.target.value,
                    )
                    if (country) setSelectedCountry(country)
                  }}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.dialCode})
                    </option>
                  ))}
                </select>
                <input
                  name="localPhone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  aria-label="Mobile number"
                  placeholder="98765 43210"
                  pattern="[0-9 ()\-]{6,15}"
                  value={localPhone}
                  onChange={(event) => setLocalPhone(event.target.value)}
                  required
                />
              </span>
              <small>Select your country, then enter your mobile number.</small>
            </label>
            <label>
              Instagram handle
              <input
                name="instagramHandle"
                type="text"
                autoComplete="off"
                placeholder="yourhandle"
                maxLength={30}
                required
              />
              <small>Enter it without the @ sign.</small>
            </label>
            <div className="waitlist-form__turnstile" ref={turnstileContainerRef} />
            <button
              className="waitlist-form__submit"
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Joining waitlist…' : 'Join the waitlist'}
            </button>
            <p className="waitlist-form__notice">
              We use your details to contact you about the giveaway and Kouponly launch
              updates.
            </p>
            <p className="waitlist-form__instagram">
              Follow{' '}
              <a
                href="https://www.instagram.com/kouponly/"
                target="_blank"
                rel="noreferrer"
              >
                @kouponly
              </a>{' '}
              and{' '}
              <a
                href="https://www.instagram.com/kouponly.in/"
                target="_blank"
                rel="noreferrer"
              >
                @kouponly.in
              </a>{' '}
              on Instagram.
            </p>
            {message ? (
              <p
                className={`waitlist-form__message waitlist-form__message--${status}`}
                role={status === 'error' ? 'alert' : 'status'}
              >
                {message}
              </p>
            ) : null}
          </form>
        </section>
      </main>
      <footer className="waitlist-footer">
        <span>kouponly</span>
        <a href="mailto:info@kouponly.in">info@kouponly.in</a>
      </footer>
    </div>
  )
}

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [status, setStatus] = useState<AdminStatus>('idle')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loadingEntries, setLoadingEntries] = useState(false)

  const loadEntries = async (offset = 0) => {
    setLoadingEntries(true)
    setMessage('')
    try {
      const response = await fetch(
        '/api/admin/entries?limit=100&offset=' + offset + '&request=' + Date.now(),
      )
      const data = (await response.json()) as {
        entries?: WaitlistEntry[]
        count?: number
        message?: string
      }
      if (response.status === 401) {
        setAuthenticated(false)
        setEntries([])
        setTotal(null)
        return
      }
      if (!response.ok || !Array.isArray(data.entries)) {
        setMessage(data.message ?? 'Unable to load waitlist entries.')
        return
      }
      setEntries((current) =>
        offset === 0 ? data.entries! : [...current, ...data.entries!],
      )
      if (typeof data.count === 'number') setTotal(data.count)
    } catch {
      setMessage('Unable to load waitlist entries.')
    } finally {
      setLoadingEntries(false)
    }
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting')
    setMessage('')
    const credentials = new FormData(form)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(credentials.get('email') ?? ''),
          password: String(credentials.get('password') ?? ''),
        }),
      })
      const data = (await response.json()) as { message?: string }
      if (!response.ok) {
        setStatus('error')
        setMessage(data.message ?? 'Unable to sign in.')
        return
      }
      setAuthenticated(true)
      setStatus('idle')
      form.reset()
      void loadEntries()
    } catch {
      setStatus('error')
      setMessage('Unable to sign in. Check your connection and try again.')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthenticated(false)
    setEntries([])
    setTotal(null)
    setMessage('')
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <a className="site-logo" href="/" aria-label="Kouponly home">
          <Brand />
        </a>
        {authenticated ? (
          <button className="admin-logout" type="button" onClick={handleLogout}>
            Sign out
          </button>
        ) : (
          <a className="admin-header__back" href="/waitlist">
            Waitlist <span aria-hidden="true">↗</span>
          </a>
        )}
      </header>
      <main className="admin-main">
        {!authenticated ? (
          <section className="admin-login" aria-labelledby="admin-title">
            <p className="kicker">Private workspace</p>
            <h1 id="admin-title">Waitlist records.</h1>
            <p>Sign in to review the details submitted by prospective members.</p>
            <form onSubmit={handleLogin}>
              <label>
                Administrator email
                <input name="email" type="email" autoComplete="username" required />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Signing in…' : 'Open waitlist'}
              </button>
              {message ? (
                <p className="admin-message" role="alert">
                  {message}
                </p>
              ) : null}
            </form>
          </section>
        ) : (
          <section className="admin-records" aria-labelledby="records-title">
            <div className="admin-records__heading">
              <div>
                <p className="kicker">Waitlist administration</p>
                <h1 id="records-title">Every signup, in one place.</h1>
              </div>
              <div className="admin-records__actions">
                <div className="admin-total" aria-live="polite">
                  <strong>{total === null ? '—' : total.toLocaleString()}</strong>
                  <span>total signups</span>
                </div>
                <a className="admin-export" href="/api/admin/export">
                  Export CSV <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            {message ? (
              <p className="admin-message" role="alert">
                {message}
              </p>
            ) : null}
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Instagram</th>
                    <th scope="col">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.name}</td>
                      <td>
                        <a href={'mailto:' + entry.email}>{entry.email}</a>
                      </td>
                      <td>
                        <a href={'tel:' + entry.phone.replaceAll(' ', '')}>
                          {entry.phone}
                        </a>
                      </td>
                      <td>
                        {entry.instagram_handle ? (
                          <a
                            href={
                              'https://www.instagram.com/' + entry.instagram_handle + '/'
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            @{entry.instagram_handle}
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{new Date(entry.created_at + 'Z').toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loadingEntries && entries.length === 0 ? (
                <p className="admin-empty">No one has joined the waitlist yet.</p>
              ) : null}
            </div>
            {entries.length < (total ?? 0) ? (
              <button
                className="admin-load-more"
                type="button"
                disabled={loadingEntries}
                onClick={() => void loadEntries(entries.length)}
              >
                {loadingEntries ? 'Loading…' : 'Load more signups'}
              </button>
            ) : null}
          </section>
        )}
      </main>
    </div>
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

function InvestorOverview() {
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

export default function App() {
  if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
    return <AdminPage />
  }

  if (
    window.location.pathname === '/waitlist' ||
    window.location.pathname === '/waitlist/'
  ) {
    return <WaitlistPage />
  }

  return <InvestorOverview />
}
