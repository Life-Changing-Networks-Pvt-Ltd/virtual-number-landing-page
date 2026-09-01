import { useEffect, useMemo, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "bot"
  | "briefcase"
  | "building"
  | "calendar"
  | "call"
  | "cart"
  | "check"
  | "chevron"
  | "education"
  | "health"
  | "menu"
  | "play"
  | "spark"
  | "stop"
  | "users"
  | "x";

const Icon = ({ name, size = 20 }: { name: IconName; size?: number }) => {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M14 6l6 6-6 6" />
      </>
    ),
    bot: (
      <>
        <rect x="4" y="7" width="16" height="13" rx="4" />
        <path d="M12 3v4M8.5 12h.01M15.5 12h.01M9 16h6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="3" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3M9 21v-2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" />
      </>
    ),
    call: (
      <path d="M21 16.6v3a2 2 0 0 1-2.2 2A19.7 19.7 0 0 1 10.2 18a19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 .7 3.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L6.7 9.3a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 2.2 2.3Z" />
    ),
    cart: (
      <>
        <circle cx="9" cy="20" r="1" />
        <circle cx="19" cy="20" r="1" />
        <path d="M3 3h2l2.5 12h11l2-8H6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    education: (
      <>
        <path d="m2 10 10-5 10 5-10 5L2 10Z" />
        <path d="M6 12.5V17c3 2 9 2 12 0v-4.5M22 10v6" />
      </>
    ),
    health: (
      <>
        <path d="M12 21S4 16 4 9a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 7-8 12-8 12Z" />
        <path d="M9 12h6M12 9v6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    spark: (
      <>
        <path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Z" />
        <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
      </>
    ),
    stop: <rect x="7" y="7" width="10" height="10" rx="1" />,
    users: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2M16 4.5a4 4 0 0 1 0 7.2M18 14a5 5 0 0 1 4 4.9V21" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
};

const agents = [
  {
    icon: "users" as const,
    title: "AI Receptionist",
    tag: "Inbound",
    color: "#ff6b35",
    duration: "00:24",
    script:
      "Hello! Welcome to SellersLogin. I am your AI receptionist. How may I help you today? I can answer your questions, connect you to the right team, or schedule a callback.",
  },
  {
    icon: "cart" as const,
    title: "Cart Recovery",
    tag: "Ecommerce",
    color: "#b8f34b",
    duration: "00:29",
    script:
      "Hi Riya, this is a quick call regarding the items left in your cart. Your selected product is still available, and I can help you complete the order right now. Would you like to continue?",
  },
  {
    icon: "building" as const,
    title: "Property Advisor",
    tag: "Real Estate",
    color: "#8a7cff",
    duration: "00:31",
    script:
      "Hello! The two bedroom apartment you asked about is available. It includes covered parking and is close to the metro. I can book a site visit for Saturday morning. Would that work for you?",
  },
  {
    icon: "calendar" as const,
    title: "Builder Follow-up",
    tag: "Outbound",
    color: "#ffd15c",
    duration: "00:27",
    script:
      "Hi Amit, I am calling to follow up on your property visit. I hope you liked the project. We have a limited offer this week, and I can connect you with an advisor to discuss the best price.",
  },
  {
    icon: "health" as const,
    title: "Appointment Agent",
    tag: "Healthcare",
    color: "#52d6c7",
    duration: "00:22",
    script:
      "Welcome to City Care Clinic. Doctor Mehta is available tomorrow at eleven thirty and four in the evening. Which appointment time would you prefer?",
  },
  {
    icon: "briefcase" as const,
    title: "HR Interviewer",
    tag: "HR Operations",
    color: "#ff8aa0",
    duration: "00:34",
    script:
      "Hello, thank you for applying for the sales executive role. I will conduct your first round interview. Please tell me about your recent experience and why you are interested in this position.",
  },
  {
    icon: "spark" as const,
    title: "Creator Commerce",
    tag: "Influencer",
    color: "#56b4ff",
    duration: "00:26",
    script:
      "Yo! You have reached Fukra Bhai products. Our new combo includes the bestseller and free delivery. Tell me what you are looking for, and I will help you pick the right one.",
  },
  {
    icon: "education" as const,
    title: "Admission Guide",
    tag: "Education",
    color: "#ff935c",
    duration: "00:30",
    script:
      "Hello! Admissions for the new batch are now open. I can explain course eligibility, fees, scholarships and available timings. Which programme are you interested in?",
  },
];

const steps = [
  {
    n: "01",
    icon: "call" as const,
    title: "Book your virtual number",
    copy: "Choose one professional business number. No extra SIM, phone or hardware required.",
  },
  {
    n: "02",
    icon: "bot" as const,
    title: "Make your AI agent",
    copy: "Give it a role, knowledge and tone. Train it on the conversations your business receives.",
  },
  {
    n: "03",
    icon: "users" as const,
    title: "Connect your actual number",
    copy: "Forward important calls to any existing phone, team member or department securely.",
  },
  {
    n: "04",
    icon: "spark" as const,
    title: "Switch on. Start talking.",
    copy: "Your AI answers, qualifies, books and transfers calls around the clock.",
  },
];

const faqs = [
  [
    "What exactly is a virtual number?",
    "A virtual number is a cloud-based business phone number. It receives calls without a physical SIM and can route them to AI agents, teams or your existing mobile numbers.",
  ],
  [
    "Can the AI speak Hindi and Hinglish?",
    "Yes. Your agent can be configured for English, Hindi and natural Hinglish conversations, depending on your business audience and final voice setup.",
  ],
  [
    "Can I connect my existing mobile number?",
    "Yes. Calls can be forwarded or transferred to your existing number, so your team does not need new phones or hardware.",
  ],
  [
    "Can every business get a different AI agent?",
    "Absolutely. The script, voice, knowledge, goals and call flow can be customised for sales, support, bookings, interviews, follow-ups and more.",
  ],
  [
    "What happens when the AI cannot answer?",
    "You can define fallback rules. The AI can transfer the call to a human, create a callback request or capture the caller’s details for your team.",
  ],
  [
    "Are calls recorded and secure?",
    "Recording can be enabled according to your workflow and applicable consent requirements. Access controls and call masking help keep customer and team numbers private.",
  ],
  [
    "How quickly can we go live?",
    "A basic number and agent can be configured quickly. More advanced agents depend on the knowledge base, integrations and call flows your business needs.",
  ],
  [
    "Can it connect with our CRM or ecommerce store?",
    "Yes. Integrations can send qualified leads, appointment details, order context and call outcomes to your existing business tools.",
  ],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const timerRef = useRef<number | null>(null);
  const bars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => 18 + ((i * 17 + i * i * 3) % 62)),
    [],
  );

  const stopAudio = () => {
    window.speechSynthesis?.cancel();
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setActiveAgent(null);
    setProgress(0);
  };
  const playAgent = (index: number) => {
    if (activeAgent === index) {
      stopAudio();
      return;
    }
    stopAudio();
    if (!("speechSynthesis" in window)) return;
    const agent = agents[index];
    const utterance = new SpeechSynthesisUtterance(agent.script);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice =
      voices.find((v) => /en-IN|hi-IN/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      null;
    utterance.rate = 0.94;
    utterance.pitch = index % 2 ? 1.05 : 0.94;
    const estimate = Math.max(9000, agent.script.split(" ").length * 430);
    utterance.onend = stopAudio;
    utterance.onerror = stopAudio;
    setActiveAgent(index);
    setProgress(1);
    window.speechSynthesis.speak(utterance);
    timerRef.current = window.setInterval(
      () =>
        setProgress((value) => Math.min(96, value + (200 / estimate) * 100)),
      200,
    );
  };
  useEffect(
    () => () => {
      window.speechSynthesis?.cancel();
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    [],
  );
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="app overflow-hidden">
      <header className="nav fixed z-50 flex items-center justify-between">
        <a className="brand-logo flex shrink-0 items-center no-underline" href="#top" aria-label="SellersLogin home">
          <img src="/sellerslogin-logo.png" alt="SellersLogin" />
        </a>
        <nav className={menuOpen ? "navlinks open items-center gap-8" : "navlinks items-center gap-8"}>
          <a href="#agents" onClick={() => setMenuOpen(false)}>
            Voice demos
          </a>
          <a href="#how" onClick={() => setMenuOpen(false)}>
            How it works
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            FAQs
          </a>
        </nav>
        <a className="nav-cta flex min-h-11 items-center gap-2 rounded-xl px-4 no-underline" href="mailto:sales@sellerslogin.com">
          Build my AI agent <Icon name="arrow" size={16} />
        </a>
        <button
          className="menu place-items-center"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
      </header>
      <main>
        <section className="hero relative grid min-h-svh items-center overflow-hidden text-white" id="top">
          <div className="noise" />
          <div
            className="hero-orbit-wrap relative z-[2] mx-auto aspect-square"
            aria-label="Animated virtual number call flow"
          >
            <div className="orbit-label orbit-label-top">
              <span>01</span> Customer calls
            </div>
            <div className="orbit-label orbit-label-right">
              <span>02</span> AI understands
            </div>
            <div className="orbit-label orbit-label-bottom">
              <span>03</span> Action completed
            </div>
            <div className="orbit-ring orbit-ring-outer">
              <i />
              <i />
              <i />
            </div>
            <div className="orbit-ring orbit-ring-inner">
              <i />
              <i />
            </div>
            <svg
              className="always-on-orbit"
              viewBox="0 0 500 500"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="always-on-path"
                  d="M250,250 m-221,0 a221,221 0 1,1 442,0 a221,221 0 1,1 -442,0"
                />
              </defs>
              <text>
                <textPath href="#always-on-path" startOffset="4%">
                  YOUR BUSINESS NEVER GOES OFFLINE • HANDLED 24/7 • 365 DAYS •
                  ALWAYS ON •
                </textPath>
              </text>
            </svg>
            <div className="orbit-core">
              <div className="core-pulse" />
              <span className="core-icon">
                <Icon name="bot" size={31} />
              </span>
              <small>AI agent • always on</small>
              <strong>+91 80 4567 89XX</strong>
              <div className="live-wave">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <i key={n} />
                ))}
              </div>
              <div className="core-status-loop" aria-hidden="true">
                <span>Your team is offline</span>
                <span>AI answered the call</span>
                <span>Lead qualified</span>
                <span>Visit booked ✓</span>
              </div>
            </div>
            <div className="day-night-chip" aria-label="AI agent online 24 hours">
              <span className="day-night-icons"><i>☀</i><i>☾</i></span>
              <span><small>Working</small><b>24 / 7</b></span>
            </div>
            <div className="orbit-metrics" aria-hidden="true">
              <span><b>0</b><small>missed calls</small></span>
              <i />
              <span><b>1.2s</b><small>response</small></span>
            </div>
            <div className="orbit-chip chip-call">
              <Icon name="call" size={17} />
              <span>
                <small>Incoming call</small>
                <b>Ringing...</b>
              </span>
            </div>
            <div className="orbit-chip chip-book">
              <Icon name="calendar" size={17} />
              <span>
                <small>Action</small>
                <b>Visit booked</b>
              </span>
            </div>
          </div>
          <div className="hero-copy relative z-[3] max-w-[600px]">
            <div className="kicker">
              <span>
                <Icon name="spark" size={14} />
              </span>{" "}
              Calls that work while you sleep
            </div>
            <h1>
              Don’t just answer calls. <em>Make them perform.</em>
            </h1>
            <p>
              One virtual number powered by an AI voice agent that talks,
              qualifies, books, follows up—and knows when to bring your team in.
            </p>
            <div className="hero-actions flex items-center gap-6">
              <a className="btn btn-dark inline-flex min-h-14 items-center justify-center gap-3 no-underline" href="#agents">
                Hear the agents{" "}
                <span className="play-dot">
                  <Icon name="play" size={14} />
                </span>
              </a>
              <a className="text-link flex items-center gap-2" href="#how">
                See how it works <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="hero-proof flex flex-wrap items-center gap-5">
              <span>
                <Icon name="check" size={14} /> Hindi + Hinglish
              </span>
              <span>
                <Icon name="check" size={14} /> 24/7 calls
              </span>
              <span>
                <Icon name="check" size={14} /> No extra SIM
              </span>
            </div>
          </div>
          {/* <div className="scroll-note"><span /> Scroll to hear what your next employee sounds like
        </div> */}
        </section>
        <section className="agents section px-6 lg:px-[5vw]" id="agents">
          <div className="section-head mx-auto grid max-w-[1200px] items-end gap-12">
            <div>
              <span className="section-no">01 / VOICE LAB</span>
              <h2>
                Meet the team
                <br />
                that never clocks out.
              </h2>
            </div>
            <p>
              Real conversations. Different jobs. Tap any agent to hear how your
              business could sound.
            </p>
          </div>
          <div className="agents-grid mx-auto grid max-w-[1200px] grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent, index) => (
              <article
                className={`agent-card relative flex flex-col ${activeAgent === index ? "playing" : ""}`}
                style={{ "--accent": agent.color } as React.CSSProperties}
                key={agent.title}
              >
                <div className="agent-top relative flex items-center justify-between">
                  <span className="agent-icon grid place-items-center">
                    <Icon name={agent.icon} />
                  </span>
                  <span className="agent-tag rounded-full">{agent.tag}</span>
                </div>
                <h3>{agent.title}</h3>
                <p>{agent.script.split(".")[0]}.</p>
                <div className="player relative mt-auto flex items-center gap-2.5">
                  <button
                    className="grid shrink-0 cursor-pointer place-items-center rounded-full"
                    onClick={() => playAgent(index)}
                    aria-label={`${activeAgent === index ? "Stop" : "Play"} ${agent.title} demo`}
                  >
                    <Icon
                      name={activeAgent === index ? "stop" : "play"}
                      size={16}
                    />
                  </button>
                  <div className="waveform">
                    {bars.map((height, bar) => (
                      <i
                        key={bar}
                        className={
                          progress > (bar / bars.length) * 100 ? "passed" : ""
                        }
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <time>{activeAgent === index ? "LIVE" : agent.duration}</time>
                </div>
              </article>
            ))}
          </div>
          {/* <div className="voice-note">
            <span>
              <Icon name="spark" size={18} />
            </span>
            <p>
              <b>These are live browser voice previews.</b> Final approved call
              recordings can be plugged into the same players without changing
              the design.
            </p>
          </div> */}
        </section>
        <section className="how section grid px-6 lg:px-[5vw]" id="how">
          <div className="how-intro">
            <span className="section-no">02 / HOW IT WORKS</span>
            <h2>
              From “hello” to
              <br />
              <em>handled.</em>
            </h2>
            <p>
              Your complete calling system goes live in four clear steps. No
              telecom headache, no new device.
            </p>
            <a className="btn btn-light inline-flex min-h-14 items-center justify-center gap-3 no-underline" href="mailto:sales@sellerslogin.com">
              Watch full tutorial <Icon name="play" size={15} />
            </a>
          </div>
          <div className="steps relative">
            <svg
              className="step-road step-road--desktop"
              viewBox="0 0 170 656"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="road-signal-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path id="desktop-road-path" className="step-road-track" d="M79 85 C79 135 82 170 123 191 L123 249 C123 299 120 334 79 355 L79 413 C79 463 82 498 123 519 L123 577" />
              <circle className="step-road-signal" r="6" filter="url(#road-signal-glow)">
                <animateMotion dur="9s" repeatCount="indefinite" calcMode="linear"><mpath href="#desktop-road-path" /></animateMotion>
              </circle>
            </svg>
            <svg
              className="step-road step-road--mobile"
              viewBox="0 0 110 568"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path id="mobile-road-path" className="step-road-track" d="M62 72 C62 112 64 145 86 166 L86 214 C86 254 84 287 62 308 L62 356 C62 396 64 429 86 450 L86 498" />
              <circle className="step-road-signal" r="5">
                <animateMotion dur="9s" repeatCount="indefinite" calcMode="linear"><mpath href="#mobile-road-path" /></animateMotion>
              </circle>
            </svg>
            {steps.map((step) => (
              <article className="step relative grid items-start" key={step.n}>
                <span className="step-number">{step.n}</span>
                <div className="step-icon grid place-items-center rounded-full">
                  <Icon name={step.icon} size={23} />
                </div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="faq section grid px-6 lg:px-[5vw]" id="faq">
          <div className="faq-title">
            <span className="section-no">03 / CLEAR ANSWERS</span>
            <h2>
              Before you ask
              <br />
              your AI, <em>ask us.</em>
            </h2>
            <p>
              Everything you need to know before putting your first intelligent
              number to work.
            </p>
          </div>
          <div className="faq-list border-t">
            {faqs.map(([question, answer], index) => (
              <article
                className={openFaq === index ? "open" : ""}
                key={question}
              >
                <button
                  className="grid w-full cursor-pointer items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{question}</b>
                  <i>
                    <Icon name="chevron" size={18} />
                  </i>
                </button>
                <div className="answer">
                  <p>{answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="grid items-center gap-8 px-6 lg:px-[5vw]">
        <a className="brand-logo flex shrink-0 items-center no-underline" href="#top" aria-label="SellersLogin home">
          <img src="/sellerslogin-logo.png" alt="SellersLogin" />
        </a>
        <p>© 2026 SellersLogin. All rights reserved.</p>
        <p>Virtual numbers. Intelligent conversations.</p>
      </footer>
    </div>
  );
}

export default App;
