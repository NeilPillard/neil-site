import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const totalSlides = 16
const founderLinks = {
  neil: 'https://www.linkedin.com/in/neilpilllard',
  aazam: 'https://www.linkedin.com/in/aazam-ln',
}

function useDeckViewport() {
  const [viewport, setViewport] = useState({ scale: 1, width: 1920, height: 1080, mobile: false })
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768
      const width = mobile ? 390 : 1920
      const height = mobile ? 844 : 1080
      setViewport({ mobile, width, height, scale: Math.min(window.innerWidth / width, window.innerHeight / height) })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return viewport
}

function Brand({ dark = false }) {
  return <span className={`brand ${dark ? 'brand--dark' : ''}`}>koup<span>o</span>nly</span>
}

function DeckChrome({ number, section, light = false }) {
  return <>
    <div className={`eyebrow ${light ? 'light' : ''}`}>{section}</div>
    <a className={`mini-brand ${light ? 'light' : ''}`} href="https://kouponly.com" target="_blank" rel="noreferrer" aria-label="Visit kouponly.com"><Brand dark={!light} />.com</a>
    <div className={`slide-number ${light ? 'light' : ''}`}>{String(number).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</div>
  </>
}

function Pattern() { return <div className="pattern" aria-hidden="true" /> }
function Check() { return <span className="check">✓</span> }
function Device({ image = '/deck-assets/intro.jpg', className = '' }) {
  return <div className={`device ${className}`}><div className="device__island" /><img src={image} alt="Kouponly app experience" /></div>
}

const Details = ({ title, children }) => <div className="detail"><Check /><div><h3>{title}</h3><p>{children}</p></div></div>
const Stat = ({ value, label, note }) => <div className="stat"><strong>{value}</strong><b>{label}</b><span>{note}</span></div>

function Slide({ number, section, children, tone = 'wine', className = '' }) {
  return <article className={`slide slide--${tone} ${className}`} aria-label={`Slide ${number}: ${section}`}>
    {tone === 'lime' && <Pattern />}
    <DeckChrome number={number} section={section} light={tone === 'wine'} />
    <div className="slide-content">{children}</div>
  </article>
}

function Intro() { return <Slide number={1} section="INTRODUCING" className="hero-slide">
  <div className="hero-copy"><p className="hero-kicker">Introducing</p><h1>The <Brand /> App</h1><p className="hero-subtitle">Bridging the gap between<br />Gen Z and Brands.</p></div><img className="hero-mockup" src="/deck-assets/mockup.png" alt="Kouponly app home screen" />
</Slide> }

function Problem() { return <Slide number={2} section="PROBLEM" tone="lime" className="centered-slide">
  <h2>Students represent one of the largest and most influential consumer segments, yet they are underserved by brands.</h2>
  <div className="three-up"><div>Rising living and education costs put financial pressure on students</div><div>Brands struggle to effectively reach and engage Gen Z audiences</div><div>There is no unified platform dedicated to student needs</div></div>
</Slide> }

function Solution() { return <Slide number={3} section="SOLUTION" className="solution-slide">
  <div><p className="display-small">Meet</p><h2><Brand /></h2><p className="solution-copy"><Brand /> is the first engagement platform in India built exclusively for students and Gen Z.</p></div><img className="hero-mockup solution-mockup" src="/deck-assets/mockup.png" alt="Kouponly app home screen" />
</Slide> }

function Market() { return <Slide number={4} section="MARKET OPPORTUNITY" tone="lime" className="market-slide">
  <h2>Built for the world’s largest youth-driven market</h2><div className="stats-row"><Stat value="800M+" label="Youth audience" note="Massive, experience-driven audience" /><Stat value="65%" label="Population under 35" note="Mobile-first and active consumers" /><Stat value="↗" label="Millions go out weekly" note="High-frequency usage potential" /></div>
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

const slides = [Intro, Problem, Solution, Market, Journey, Verify, Model, () => <Strategy />, () => <Strategy expansion />, Team, FounderDetail, () => <FounderDetail aazam />, Ask, Breakdown, Projection, Contact]

export default function App() {
  const { scale, width: stageWidth, height: stageHeight, mobile } = useDeckViewport()
  const [active, setActive] = useState(() => Math.max(0, Math.min(totalSlides - 1, Number(location.hash.replace('#slide-', '')) - 1 || 0)))
  const touchStart = useRef(null)
  const wheelLock = useRef(false)
  const setSlide = useCallback((next, replace = false) => {
    const safe = Math.max(0, Math.min(totalSlides - 1, next))
    setActive(safe)
    const url = `#slide-${safe + 1}`
    replace ? history.replaceState(null, '', url) : history.pushState(null, '', url)
  }, [])
  useEffect(() => { const listener = () => setActive(Math.max(0, Math.min(totalSlides - 1, Number(location.hash.replace('#slide-', '')) - 1 || 0))); addEventListener('hashchange', listener); return () => removeEventListener('hashchange', listener) }, [])
  useEffect(() => { const keys = (event) => { if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); setSlide(active + 1) } if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); setSlide(active - 1) } if (event.key === 'Home') setSlide(0); if (event.key === 'End') setSlide(totalSlides - 1) }; addEventListener('keydown', keys); return () => removeEventListener('keydown', keys) }, [active, setSlide])
  const handleWheel = useCallback((event) => {
    if (wheelLock.current || Math.abs(event.deltaY) < 12) return
    event.preventDefault()
    wheelLock.current = true
    setSlide(active + (event.deltaY > 0 ? 1 : -1))
    window.setTimeout(() => { wheelLock.current = false }, 650)
  }, [active, setSlide])
  const ActiveSlide = useMemo(() => slides[active], [active])
  return <main className={`deck-shell ${mobile ? 'deck-shell--mobile' : ''}`} onWheel={handleWheel} onTouchStart={(e) => { const touch = e.changedTouches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY } }} onTouchEnd={(e) => {
    if (!touchStart.current) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    const verticalSwipe = mobile && Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)
    const horizontalSwipe = !mobile && Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)
    if (verticalSwipe) setSlide(active + (deltaY < 0 ? 1 : -1))
    if (horizontalSwipe) setSlide(active + (deltaX < 0 ? 1 : -1))
    touchStart.current = null
  }}>
    <div className="stage-wrap" style={{ width: stageWidth * scale, height: stageHeight * scale }}><div className="stage" style={{ width: stageWidth, height: stageHeight, transform: `scale(${scale})` }}><ActiveSlide /></div></div>
    <nav className="deck-controls" aria-label="Presentation controls"><button onClick={() => setSlide(active - 1)} disabled={active === 0} aria-label="Previous slide">←</button><div className="progress"><i style={{ width: `${((active + 1) / totalSlides) * 100}%` }} /></div><span>{String(active + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span><button onClick={() => setSlide(active + 1)} disabled={active === totalSlides - 1} aria-label="Next slide">→</button></nav>
  </main>
}
