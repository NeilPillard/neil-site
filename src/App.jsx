import { useEffect } from 'react'

const totalSlides = 16
const founderLinks = {
  neil: 'https://www.linkedin.com/in/neilpilllard',
  aazam: 'https://www.linkedin.com/in/aazam-ln',
}

const navigation = [
  ['Product', 5],
  ['Market', 4],
  ['Strategy', 8],
  ['Team', 10],
  ['Investment', 13],
  ['Contact', 16],
]

function Brand({ dark = false }) {
  return <span className={`brand ${dark ? 'brand--dark' : ''}`}>koup<span>o</span>nly</span>
}

function SiteHeader() {
  return <header className="site-header">
    <div className="site-header__inner">
      <a className="site-logo" href="#slide-1" aria-label="Kouponly home"><Brand /></a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navigation.map(([label, slide]) => <a key={label} href={`#slide-${slide}`}>{label}</a>)}
      </nav>
      <a className="site-link" href="https://kouponly.com" target="_blank" rel="noreferrer">kouponly.com <span aria-hidden="true">↗</span></a>
    </div>
  </header>
}

function SectionHeader({ number, section }) {
  return <div className="section-header"><span>{String(number).padStart(2, '0')}</span>{section}</div>
}

function Pattern() { return <div className="pattern" aria-hidden="true" /> }
function Check() { return <span className="check">✓</span> }
function Device({ image = '/deck-assets/intro.jpg', className = '' }) {
  return <div className={`device ${className}`}><div className="device__island" /><img src={image} alt="Kouponly app experience" /></div>
}

const Details = ({ title, children }) => <div className="detail"><Check /><div><h3>{title}</h3><p>{children}</p></div></div>
const Stat = ({ value, label, note }) => <div className="stat"><strong>{value}</strong><b>{label}</b><span>{note}</span></div>

function Slide({ number, section, children, tone = 'wine', className = '' }) {
  return <section id={`slide-${number}`} className={`slide slide--${tone} ${className}`} aria-label={`Section ${number}: ${section}`}>
    {tone === 'lime' && <Pattern />}
    <div className="section-shell">
      <SectionHeader number={number} section={section} />
      <div className="slide-content">{children}</div>
    </div>
  </section>
}

function Intro() { return <Slide number={1} section="INTRODUCING" className="hero-slide">
  <div className="hero-copy"><p className="hero-kicker">Introducing</p><h1>The <Brand /> App</h1><p className="hero-subtitle">Bridging the gap between<br />Gen Z and Brands.</p></div><img className="hero-mockup" src="/deck-assets/mockup.png" alt="Kouponly app home screen" />
</Slide> }

function Problem() { return <Slide number={2} section="PROBLEM" tone="lime" className="centered-slide">
  <h2>Students represent one of the largest and most influential consumer segments, yet they are underserved by brands.</h2>
  <div className="three-up"><div>Rising living and education costs put financial pressure on students</div><div>Brands struggle to effectively reach and engage Gen Z audiences</div><div>Tcke is no unified platform dedicated to student needs</div></div>
</Slide> }

function Solution() { return <Slide number={3} section="SOLUTION" className="solution-slide">
  <div><p className="display-small">Meet</p><h2><Brand /></h2><p className="solution-copy"><Brand /> is the first engagement platform in India built exclusively for students and Gen Z.</p></div><Device image="/deck-assets/solution.jpg" />
</Slide> }

function Market() { return <Slide number={4} section="MARKET OPPORTUNITY" tone="lime" className="market-slide">
  <div className="india-ghost">INDIA</div><h2>Built for the world’s largest youth-driven market</h2><div className="stats-row"><Stat value="800M+" label="Youth in India" note="Massive, experience-driven audience" /><Stat value="65%" label="Population under 35" note="Mobile-first and active consumers" /><Stat value="↗" label="Millions go out weekly" note="High-frequency usage potential" /></div>
</Slide> }

function Journey() { return <Slide number={5} section="PRODUCT" className="journey-slide">
  <h2>The User Journey</h2><div className="journey-grid"><JourneyItem image="/deck-assets/journey.jpg" title="Student Verification" /><JourneyItem image="/deck-assets/solution.jpg" title="Explore Discounts" /><JourneyItem image="/deck-assets/journey.jpg" title="Redeem Offers" /></div>
</Slide> }
function JourneyItem({ image, title }) { return <div className="journey-item"><Device image={image} /><div className="journey-label"><span>✦</span>{title}</div></div> }

function Verify() { return <Slide number={6} section="TECHNOLOGY" tone="lime" className="verify-slide">
  <h2>How we verify</h2><div className="verify-grid"><div><h3>INSTANT VERIFICATION</h3><p>Users enter their student email, or upload a 10th/12th certificate, to verify instantly</p></div><div><h3>24-HOUR VERIFICATION</h3><p>Users upload student ID, or supporting documents, reviewed by Kouponly within 24 hours.</p></div></div>
</Slide> }

function Model() { return <Slide number={7} section="BUSINESS MODEL" className="model-slide">
  <h2>Sustainable and Scalable</h2><div className="details-grid"><Details title="Subscription">Students &amp; general users<br />Built so user savings significantly exceed subscription cost</Details><Details title="Strategic Partnerships">Telecom bundles<br />Banking partnerships</Details><Details title="Growth & Visibility">Paid featured placements<br />Targeted campaigns and push notifications</Details><Details title="Marketing & Brand Services">Gen Z focused campaigns<br />Content, influencer marketing, and digital promotions</Details></div>
</Slide> }

function Strategy({ expansion = false }) { const title = expansion ? 'Expansion Strategy' : 'Launch Strategy'; const items = expansion ? [['Build & Validate','Launch across all districts in Kerala','Establish product-market fit and repeat usage'], ['Rapid Expansion','Launch in major metropolitan cities across India','Scale partnerships and brand visibility'], ['Scale Nationwide','Expand to Tier 2 cities and key tourist destinations'], ['Long-Term Vision','Become the default app for going out','Users check Kouponly before any experience']] : [['Pre-Launch Waitlist','Early access campaign with free trial memberships'], ['Exclusive Launch Discount','Designed to trigger immediate downloads and first visits'], ['Referral-Led Growth','Users unlock free access by inviting others'], ['Digital Marketing','Social media & influencer campaigns']]; return <Slide number={expansion ? 9 : 8} section="GO TO MARKET STRATEGY" className="strategy-slide"><div className="strategy-mark">↗</div><h2>{title}</h2><div className="details-grid">{items.map(([name, ...copy]) => <Details key={name} title={name}>{copy.map((line) => <span key={line}>{line}<br /></span>)}</Details>)}</div></Slide> }

function Team() { return <Slide number={10} section="TEAM" tone="lime" className="team-slide"><h2>Meet the Founders</h2><p className="team-intro">Experienced in Ecosystem Development, Business Development, Scaling, and Growth</p><div className="founder-cards"><Founder image="/deck-assets/neil.jpg" name="Neil Pillard" /><Founder image="/deck-assets/aazam.jpg" name="Aazam Thakur" /></div></Slide> }
function Founder({ image, name }) { return <div className="founder"><img src={image} alt={name} /><h3>{name}</h3></div> }

function FounderDetail({ aazam = false }) { const name = aazam ? 'AAZAM THAKUR' : 'NEIL JOSE PILLARD'; const title = aazam ? 'Full-Stack Engineering, Open Source, and AI Research' : 'Expert in Scaling, Growth, and Business Development'; const bullets = aazam ? ['Designed and developed the entire technical ecosystem of RealX (Mobile + Web Applications)', 'OpenMainframe Technical Maintainer — Linux Foundation ($300M ARR)', 'Open Source Contributor, Data Engineering — Airbyte (YC W20, $20M ARR)', 'Google Summer of Code — AI Research (1000+ Projects)'] : ['Scaled ClassMate App Qatar during early prototype phase and launched the app', 'Raised GMV to QAR 10M in 11 months', 'Secured 350+ Partnerships under 6 months']; return <Slide number={aazam ? 12 : 11} section={name} className="founder-detail"><div><h2>{title}</h2><div className="founder-bullets">{bullets.map(x => <p key={x}>{x}</p>)}</div></div><aside><img src={aazam ? '/deck-assets/aazam.jpg' : '/deck-assets/neil.jpg'} alt={name} /><strong>{aazam ? 'Aazam Thakur' : 'Neil Pillard'}</strong><span>{aazam ? 'Co-Founder, Technology' : 'Co-Founder'}</span></aside></Slide> }

function Ask() { return <Slide number={13} section="THE ASK" className="ask-slide"><h2>Let’s Disrupt the Market Together.</h2><p>Seeking <u>₹6,00,00,000</u> for 10% Equity</p></Slide> }

function Breakdown() { const rows = [['Technology & Product Development', 20], ['Team Expansion & Salaries', 25], ['Vendor Acquisition & Partnerships', 10], ['Legal, Compliance & Operations', 5]]; return <Slide number={14} section="THE ASK" className="breakdown-slide"><h2>Investment<br />Breakdown</h2><div className="bar-chart">{rows.map(([name, percent]) => <div className="bar-row" key={name}><span>{name}</span><div><i style={{ width: `${percent * 3}%` }} /></div><b>{percent}%</b></div>)}</div></Slide> }

function Projection() { const years = [1, 2, 3, 4, 5]; return <Slide number={15} section="THE ASK" className="projection-slide"><h2>Kouponly Financial Projection Year 1-5</h2><div className="projection-grid"><div><p>● Revenue</p><div className="vertical-bars">{years.map((year, i) => <div key={year}><i style={{ height: `${[5, 7, 25, 48, 86][i]}%` }} /><span>Year {year}</span></div>)}</div></div><div><p>● Users (300 Million Pool)</p><div className="horizontal-bars">{years.map((year, i) => <div key={year}><span>Year {year}</span><i style={{ width: `${[2, 5, 18, 48, 92][i]}%` }} /></div>)}</div></div></div></Slide> }

function Contact() { return <Slide number={16} section="CONTACT" tone="lime" className="contact-slide"><div className="contact-grid"><ContactPerson name="NEIL JOSE PILLARD" email="neil.j.pillard@gmail.com" phone="+974 3363 7582" linkedin={founderLinks.neil} /><ContactPerson name="AAZAM THAKUR" email="aazamthakur@gmail.com" phone="+974 70450340" linkedin={founderLinks.aazam} /></div></Slide> }
function ContactPerson({ name, email, phone, linkedin }) { return <section><h2>{name}</h2><a href={`mailto:${email}`}>{email}</a><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a><a href={linkedin} target="_blank" rel="noreferrer">{linkedin.replace('https://www.', '')}</a></section> }

const sections = [Intro, Problem, Solution, Market, Journey, Verify, Model, () => <Strategy />, () => <Strategy expansion />, Team, FounderDetail, () => <FounderDetail aazam />, Ask, Breakdown, Projection, Contact]

function SiteFooter() {
  return <footer className="site-footer">
    <a href="https://kouponly.com" target="_blank" rel="noreferrer"><Brand />.com</a>
    <span>Kouponly investor overview</span>
  </footer>
}

export default function App() {
  useEffect(() => {
    const sectionElements = [...document.querySelectorAll('.slide')]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const initialHash = location.hash
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    const hashObserver = new IntersectionObserver((entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (activeEntry && location.hash !== `#${activeEntry.target.id}`) {
        history.replaceState(null, '', `#${activeEntry.target.id}`)
      }
    }, { rootMargin: '-34% 0px -56% 0px', threshold: 0 })

    sectionElements.forEach((section) => {
      if (reducedMotion) section.classList.add('is-visible')
      else revealObserver.observe(section)
    })

    const target = initialHash ? document.querySelector(initialHash) : null
    let observerFrame
    const scrollFrame = requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
      observerFrame = requestAnimationFrame(() => {
        sectionElements.forEach((section) => hashObserver.observe(section))
      })
    })

    return () => {
      cancelAnimationFrame(scrollFrame)
      if (observerFrame) cancelAnimationFrame(observerFrame)
      revealObserver.disconnect()
      hashObserver.disconnect()
    }
  }, [])

  return <div className="site-shell">
    <SiteHeader />
    <main className="landing-page">
      {sections.map((Section, index) => <Section key={index} />)}
    </main>
    <SiteFooter />
  </div>
}
