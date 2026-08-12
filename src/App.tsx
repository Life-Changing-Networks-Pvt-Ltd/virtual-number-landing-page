import { useEffect, useState } from 'react'

type IconName =
  | 'arrow'
  | 'bot'
  | 'building'
  | 'call'
  | 'check'
  | 'chevron'
  | 'clock'
  | 'headset'
  | 'layers'
  | 'lock'
  | 'menu'
  | 'route'
  | 'shield'
  | 'spark'
  | 'users'
  | 'x'

const Icon = ({ name, size = 20 }: { name: IconName; size?: number }) => {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    bot: <><rect x="5" y="7" width="14" height="12" rx="3" /><path d="M12 3v4M8.5 12h.01M15.5 12h.01M9 16h6" /></>,
    building: <><path d="M4 21V5l8-3 8 3v16M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h6" /></>,
    call: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M18 19c0 1.1-.9 2-2 2h-3M4 14h3v5H5a1 1 0 0 1-1-1v-4ZM20 14h-3v5h2a1 1 0 0 0 1-1v-4Z" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    route: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h3a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3M14 10V9a3 3 0 0 1 3-3" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
    spark: <><path d="m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    x: <><path d="M6 6l12 12M18 6 6 18" /></>,
  }

  return (
    <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

const features = [
  { icon: 'shield' as const, label: 'Call Masking', title: 'Keep personal numbers personal.', copy: 'Connect customers and vendors without exposing either side’s private number.' },
  { icon: 'route' as const, label: 'Smart Routing', title: 'Every call finds the right person.', copy: 'Route by team, agent or availability, with automatic fallback when someone is busy.' },
  { icon: 'bot' as const, label: 'Voice AI', title: 'Always ready to answer.', copy: 'Let an AI agent handle repetitive conversations, qualify leads and hand off priority calls.' },
  { icon: 'layers' as const, label: 'Multi-vendor', title: 'One system. Every vendor.', copy: 'Give every vendor a professional calling layer while you control it from one dashboard.' },
  { icon: 'call' as const, label: 'Call Forwarding', title: 'Works with the phones you have.', copy: 'Forward business calls to any existing number. No new device or physical SIM required.' },
  { icon: 'headset' as const, label: 'Agent Control', title: 'Build a team that never misses.', copy: 'Create agents, manage availability and keep customer conversations moving.' },
]

const industries = [
  ['E-commerce', 'Protect buyer and seller numbers while resolving orders faster.', '01'],
  ['Logistics', 'Connect customers and delivery partners without privacy leaks.', '02'],
  ['Real Estate', 'Route every property lead to the right sales representative.', '03'],
  ['Healthcare', 'Manage appointment calls through one trusted business number.', '04'],
  ['Education', 'Handle admissions and student queries at scale with Voice AI.', '05'],
  ['Financial Services', 'Create professional, traceable customer call journeys.', '06'],
]

const faqs = [
  ['What is an Indian virtual number?', 'It is a cloud-based business phone number that can receive and route calls without needing another physical SIM card.'],
  ['Will customers see my personal number?', 'No. With call masking enabled, customers interact with your virtual business number while your personal number stays protected.'],
  ['Can one number route calls to multiple agents?', 'Yes. Calls can be distributed across agents or teams based on your configured routing rules and availability.'],
  ['Can I use only call forwarding?', 'Yes. You can keep the setup simple and forward calls to your existing phone, then add agents, routing or AI as your business grows.'],
  ['How does the 14-day free trial work?', 'You can start with a guided trial to explore the virtual number experience. Exact usage limits and activation details will be shown during onboarding.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <div className="app-shell overflow-x-clip bg-[#f8f8fb] text-ink antialiased">
      <header className={`navbar fixed inset-x-0 top-0 z-50 ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="nav-inner container flex h-full items-center justify-between">
          <a className="brand" href="#top" aria-label="Callflow home">
            <span className="brand-mark"><Icon name="call" size={18} /></span>
            <span>call<span>flow</span></span>
          </a>

          {menuOpen && <button className="nav-backdrop" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
          <nav id="primary-navigation" className={`nav-links items-center gap-8 min-[821px]:flex ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
            <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
            <a className="mobile-demo" href="#contact" onClick={() => setMenuOpen(false)}>Book demo</a>
          </nav>

          <div className="nav-actions items-center gap-6 min-[821px]:flex">
            <a className="nav-login" href="#contact">Log in</a>
            <a className="button min-h-10 rounded-lg bg-brand px-[18px] text-xs font-bold text-white shadow-[0_10px_28px_rgba(121,82,255,.35)] hover:bg-brand-dark" href="#trial">Start free trial <Icon name="arrow" size={16} /></a>
          </div>
          <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero relative overflow-hidden bg-night text-white" id="top">
          <div className="hero-glow hero-glow--one" />
          <div className="hero-glow hero-glow--two" />
          <div className="hero-grid" />
          <div className="container hero-layout relative grid items-center gap-[70px] max-[820px]:grid-cols-1 max-[820px]:gap-8 min-[821px]:grid-cols-[1.05fr_.95fr]">
            <div className="hero-copy reveal relative z-[2] max-[820px]:mx-auto max-[820px]:text-center">
              <div className="eyebrow"><span className="eyebrow-dot" /> Built for ambitious Indian businesses</div>
              <h1>Your business needs <em>one number.</em><br />Not another SIM.</h1>
              <p className="hero-lead text-white/80">Protect personal numbers, route every customer call intelligently, and let Voice AI answer when your team can’t.</p>
              <div className="hero-actions flex items-center gap-3 max-[560px]:flex-col max-[560px]:items-stretch">
                <a className="button button--primary" href="#trial">Start your 14-day free trial <Icon name="arrow" /></a>
                <a className="button button--ghost" href="#contact"><span className="play-icon">▶</span> Book a live demo</a>
              </div>
              <div className="hero-proof">
                <span><Icon name="check" size={15} /> No hardware</span>
                <span><Icon name="check" size={15} /> Quick activation</span>
                <span><Icon name="check" size={15} /> Multi-vendor ready</span>
              </div>
            </div>

            <div className="call-stage reveal reveal--delay" aria-label="Animated virtual number call flow">
              <div className="orbit orbit--outer" />
              <div className="orbit orbit--inner" />
              <div className="call-card">
                <div className="call-card-top">
                  <span className="live-badge"><i /> Live call</span>
                  <span className="call-time">00:42</span>
                </div>
                <div className="caller-row">
                  <div className="caller-avatar"><Icon name="users" size={23} /></div>
                  <div><small>Incoming customer</small><strong>+91 98••• ••721</strong></div>
                  <span className="sound-wave"><i /><i /><i /><i /></span>
                </div>
                <div className="route-track"><span /><b><Icon name="shield" size={14} /> Number protected</b></div>
                <div className="virtual-number">
                  <small>Your virtual number</small>
                  <strong>+91 80 4567 8900</strong>
                  <span>IND</span>
                </div>
                <div className="destination-grid">
                  <div><span className="mini-icon violet"><Icon name="headset" size={17} /></span><small>Routing to</small><b>Sales agent</b></div>
                  <div><span className="mini-icon cyan"><Icon name="bot" size={17} /></span><small>AI status</small><b>Ready</b></div>
                </div>
              </div>
              <div className="float-chip float-chip--privacy"><Icon name="lock" size={16} /><span><b>100% private</b><small>Number masked</small></span></div>
              <div className="float-chip float-chip--connected"><span className="connected-icon"><Icon name="call" size={16} /></span><span><b>Connected</b><small>in 1.2 seconds</small></span></div>
            </div>
          </div>
          <div className="container trust-row relative z-[4] flex items-center justify-between">
            <p className="text-white/75">Everything between <strong className="text-white">“Hello”</strong> and <strong className="text-white">conversion</strong> — handled.</p>
            <div><span>Privacy first</span><span>Always available</span><span>Built to scale</span></div>
          </div>
        </section>

        <section className="section how-section bg-white py-[120px] max-[820px]:py-[90px] max-[560px]:py-[68px]" id="how">
          <div className="container">
            <div className="section-heading centered text-center">
              <div className="eyebrow eyebrow--light">How it works</div>
              <h2>From first ring to the right person.<br /><em>Automatically.</em></h2>
              <p>Set up once. Let every customer call take the smartest route.</p>
            </div>
            <div className="steps-grid relative grid grid-cols-3 gap-4 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
              <article className="step-card"><span className="step-number">01</span><div className="step-visual phone-visual"><span>+91</span><b>Choose number</b></div><h3>Get your number</h3><p>Choose a professional Indian virtual number for your business.</p></article>
              <article className="step-card featured-step"><span className="step-number">02</span><div className="step-visual route-visual"><span><Icon name="call" /></span><i /><span><Icon name="route" /></span><i /><span><Icon name="users" /></span></div><h3>Build your call flow</h3><p>Choose forwarding, masking, smart agents or Voice AI.</p></article>
              <article className="step-card"><span className="step-number">03</span><div className="step-visual live-visual"><span><i /> LIVE</span><b>24/7</b></div><h3>Go live in minutes</h3><p>Receive calls on existing phones and manage it all in one place.</p></article>
            </div>
          </div>
        </section>

        <section className="section features-section bg-[#f7f6fa] py-[120px] max-[820px]:py-[90px] max-[560px]:py-[68px]" id="features">
          <div className="container">
            <div className="section-heading split-heading flex items-end justify-between max-[820px]:block">
              <div><div className="eyebrow eyebrow--light">Power behind every call</div><h2>More than a number.<br /><em>Your calling engine.</em></h2></div>
              <p>Everything your team needs to connect, protect and convert—without changing the phones they already use.</p>
            </div>
            <div className="feature-grid grid grid-cols-3 gap-3.5 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
              {features.map((feature, index) => (
                <article className={`feature-card feature-card--${index + 1}`} key={feature.label}>
                  <div className="feature-top"><span className="feature-icon"><Icon name={feature.icon} size={22} /></span><small>{feature.label}</small></div>
                  <h3>{feature.title}</h3><p>{feature.copy}</p><a href="#contact" aria-label={`Learn more about ${feature.label}`}>Learn more <Icon name="arrow" size={17} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section masking-section bg-white py-[120px] max-[820px]:py-[90px] max-[560px]:py-[68px]">
          <div className="container masking-layout grid grid-cols-[.78fr_1.22fr] items-center gap-20 max-[820px]:grid-cols-1 max-[820px]:gap-[55px] max-[560px]:gap-[38px]">
            <div className="masking-copy">
              <div className="eyebrow eyebrow--light">Privacy by design</div>
              <h2>They connect.<br /><em>Numbers don’t.</em></h2>
              <p>Your virtual number creates a secure privacy layer between every customer, vendor and agent.</p>
              <ul className="check-list">
                <li><span><Icon name="check" size={16} /></span> Personal numbers stay hidden</li>
                <li><span><Icon name="check" size={16} /></span> One trusted business identity</li>
                <li><span><Icon name="check" size={16} /></span> Safe for customers and vendors</li>
              </ul>
              <a className="text-link" href="#trial">Protect your team <Icon name="arrow" size={18} /></a>
            </div>
            <div className="masking-demo">
              <div className="mask-person mask-person--customer"><span className="person-avatar">AK</span><div><small>Customer</small><b>98••• ••721</b></div></div>
              <div className="mask-line mask-line--left"><i /></div>
              <div className="mask-center"><span className="shield-rings" /><div className="shield-core"><Icon name="shield" size={28} /></div><small>Secure virtual layer</small><strong>+91 80 4567 8900</strong><span className="protected-pill"><Icon name="lock" size={12} /> Privacy protected</span></div>
              <div className="mask-line mask-line--right"><i /></div>
              <div className="mask-person mask-person--vendor"><span className="person-avatar">VM</span><div><small>Vendor</small><b>99••• ••184</b></div></div>
            </div>
          </div>
        </section>

        <section className="section pricing-section relative overflow-hidden bg-night py-[120px] text-white max-[820px]:py-[90px] max-[560px]:py-[68px]" id="pricing">
          <div className="pricing-orb" />
          <div className="container pricing-layout relative grid grid-cols-2 items-center gap-[130px] max-[820px]:grid-cols-1 max-[820px]:gap-[55px] max-[560px]:gap-10">
            <div className="pricing-copy">
              <div className="eyebrow">Simple, transparent pricing</div>
              <h2>Start small.<br /><em>Sound big.</em></h2>
              <p className="text-white/75">Enterprise-grade calling infrastructure, priced for businesses that are ready to move.</p>
              <div className="trial-note"><span><Icon name="spark" size={20} /></span><div><b>14 days on us</b><small>Explore the complete experience before you commit.</small></div></div>
            </div>
            <div className="price-card" id="trial">
              <div className="price-card-head"><span>Indian Virtual Number</span><span className="popular-pill">Most popular</span></div>
              <div className="main-price"><sup>₹</sup><strong>499</strong><span>+ GST<br /><small>starting price</small></span></div>
              <div className="price-lines">
                <div><span><Icon name="call" size={18} /> Inbound calls</span><b>₹0.80<small>*</small></b></div>
                <div><span><Icon name="bot" size={18} /> Voice AI Agent</span><b>₹3.50<small>/call</small></b></div>
              </div>
              <a className="button button--primary button--wide" href="#contact">Start your free trial <Icon name="arrow" /></a>
              <p><Icon name="check" size={14} /> No hardware required <span>•</span> Quick activation</p>
            </div>
          </div>
        </section>

        <section className="section importance-section bg-white py-[120px] max-[820px]:py-[90px] max-[560px]:py-[68px]">
          <div className="container">
            <div className="section-heading centered narrow text-center">
              <div className="eyebrow eyebrow--light">Why a virtual number?</div>
              <h2>A SIM gives you a number.<br /><em>We give you a system.</em></h2>
            </div>
            <div className="comparison-wrap">
              <div className="comparison-title"><span>Capability</span><span>Personal SIM</span><span className="brand-col"><span className="brand-mark mini"><Icon name="call" size={12} /></span> Virtual Number</span></div>
              {[
                ['Protect personal numbers', false, true], ['Route calls to your team', false, true], ['Support multiple vendors', false, true], ['Automate with Voice AI', false, true], ['Central dashboard control', false, true], ['Scale without new SIMs', false, true],
              ].map(([label, personal, virtual]) => <div className="comparison-row" key={String(label)}><span>{label}</span><span>{personal ? <Icon name="check" /> : <Icon name="x" />}</span><span className="brand-col">{virtual && <Icon name="check" />}</span></div>)}
            </div>
          </div>
        </section>

        <section className="section industries-section bg-[#f7f6fa] py-[120px] max-[820px]:py-[90px] max-[560px]:py-[68px]" id="industries">
          <div className="container">
            <div className="section-heading split-heading flex items-end justify-between max-[820px]:block">
              <div><div className="eyebrow eyebrow--light">Industries we serve</div><h2>Built for businesses<br />that never stop.</h2></div>
              <p>From the first lead to the final delivery, build a better calling experience at every step.</p>
            </div>
            <div className="industry-grid grid grid-cols-3 overflow-hidden rounded-[18px] border border-[#e5e2e9] max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
              {industries.map(([name, copy, number]) => <article className="industry-card" key={name}><div><span>{number}</span><Icon name={name === 'Logistics' ? 'route' : name === 'Healthcare' ? 'call' : name === 'Education' ? 'users' : 'building'} size={24} /></div><h3>{name}</h3><p>{copy}</p><a href="#contact" aria-label={`Explore ${name}`}><Icon name="arrow" size={18} /></a></article>)}
            </div>
          </div>
        </section>

        <section className="section dashboard-section bg-white py-[120px] max-[820px]:py-[90px] max-[560px]:py-[68px]">
          <div className="container">
            <div className="section-heading centered text-center">
              <div className="eyebrow eyebrow--light">One command centre</div>
              <h2>Your entire calling operation.<br /><em>One clear view.</em></h2>
              <p>See agents, vendors, call activity and AI performance without switching screens.</p>
            </div>
            <div className="dashboard-shell">
              <div className="dash-sidebar"><span className="dash-logo"><Icon name="call" size={15} /></span>{['layers','call','users','bot'].map((item, index) => <span className={index === 1 ? 'active' : ''} key={item}><Icon name={item as IconName} size={16} /></span>)}</div>
              <div className="dash-main">
                <div className="dash-head"><div><small>OVERVIEW</small><b>Good morning, Aakash</b></div><span className="dash-avatar">AK</span></div>
                <div className="dash-stats"><div><small>Total calls</small><b>2,847</b><em>+18.4%</em></div><div><small>Answered</small><b>2,594</b><em>91.1%</em></div><div><small>AI handled</small><b>1,206</b><em>+24.2%</em></div><div><small>Avg. response</small><b>1.2s</b><em>Fast</em></div></div>
                <div className="dash-panels"><div className="chart-panel"><div><b>Call activity</b><small>Last 7 days</small></div><div className="bar-chart">{[44,68,53,82,64,92,74,87,58,76,98,70,84,62].map((height, i) => <i style={{height: `${height}%`}} key={i} />)}</div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div className="agents-panel"><div><b>Agents</b><small>6 online</small></div>{[['RS','Riya Sharma','On call'],['AM','Arjun Mehta','Available'],['VK','Vikram K.','Available']].map(([initials,name,status]) => <div className="agent" key={name}><span>{initials}</span><p><b>{name}</b><small>{status}</small></p><i className={status === 'On call' ? 'busy' : ''} /></div>)}</div></div>
              </div>
              <div className="floating-live"><i /><span><small>LIVE</small><b>18 calls active</b></span></div>
            </div>
          </div>
        </section>

        <section className="section faq-section bg-[#f7f6fa] py-[120px] max-[820px]:py-[90px] max-[560px]:py-[68px]" id="faq">
          <div className="container faq-layout grid grid-cols-[.7fr_1.3fr] gap-[100px] max-[820px]:grid-cols-1 max-[820px]:gap-[55px] max-[560px]:gap-[38px]">
            <div className="faq-copy"><div className="eyebrow eyebrow--light">Questions, answered</div><h2>Before you<br /><em>say hello.</em></h2><p>Still curious? Our team can walk you through your exact use case.</p><a className="text-link" href="#contact">Talk to an expert <Icon name="arrow" size={18} /></a></div>
            <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="final-cta relative overflow-hidden bg-night py-[120px] text-center text-white max-[560px]:py-[76px]" id="contact">
          <div className="cta-grid" />
          <div className="cta-orb" />
          <div className="container final-cta-inner relative">
            <div className="eyebrow">Ready when you are</div>
            <h2>Your customers are already calling.<br /><em>Make every call count.</em></h2>
            <p className="text-white/75">Launch your Indian virtual number and build a calling experience your customers remember.</p>
            <div className="hero-actions flex items-center justify-center gap-3 max-[560px]:flex-col max-[560px]:items-stretch"><a className="button button--primary" href="#top">Start 14-day free trial <Icon name="arrow" /></a><a className="button button--ghost" href="mailto:sales@example.com">Book your demo</a></div>
            <small><Icon name="clock" size={14} /> Quick activation <span>•</span> No additional hardware</small>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner"><a className="brand" href="#top"><span className="brand-mark"><Icon name="call" size={18} /></span><span>call<span>flow</span></span></a><p>Virtual calling infrastructure for modern Indian businesses.</p><span>© 2026 Callflow. All rights reserved.</span></div>
      </footer>

      <aside className="mobile-cta-bar" aria-label="Free trial offer">
        <div><small>Starts at</small><strong>₹499 <span>+ GST</span></strong></div>
        <a href="#trial">Start free trial <Icon name="arrow" size={17} /></a>
      </aside>
    </div>
  )
}

export default App
