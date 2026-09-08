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
    title: "AI Hotel Receptionist",
    tag: "Inbound",
    color: "#ff6b35",
    duration: "01:31",
    audioSrc: `${import.meta.env.BASE_URL}audio/ai-hotel-receptionist.mp3`,
    script:
      "Handles room bookings, guest inquiries and hotel services 24/7 through automated voice calls."
  },
  {
    icon: "cart" as const,
    title: "Cart Recovery",
    tag: "Ecommerce",
    color: "#b8f34b",
    duration: "00:55",
    audioSrc: `${import.meta.env.BASE_URL}audio/cart-recovery.mp3`,
    script:
      "Encourage customers with abandoned carts to complete their purchases through automated AI calls.",
  },
  {
    icon: "building" as const,
    title: "Property Advisor",
    tag: "Real Estate",
    color: "#8a7cff",
    duration: "00:31",
    script:
      "Assists prospective buyers with property details, pricing, site visits and availability inquiries via AI automated calls.",
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
    title: "Patient Appointment AI Agent",
    tag: "Healthcare",
    color: "#52d6c7",
    duration: "00:58",
    audioSrc: `${import.meta.env.BASE_URL}audio/patient-appointment.mp3`,
    script:
      "Manages patient bookings, reschedules and clinic inquiries with automated voice assistance.",
  },
  {
    icon: "briefcase" as const,
    title: "HR Interviewer",
    tag: "HR Operations",
    color: "#ff8aa0",
    duration: "01:32",
    audioSrc: `${import.meta.env.BASE_URL}audio/hr-interviewer.mp3`,
    script:
      "Conducts Automated initial telephonic rounds for candidates screening and gathers basic details for HR review.",
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
      "Guides prospective students through course details, eligibility and batch admission procedures.",
  },
];

const maskingSteps = [
  {
    n: "01",
    icon: "call" as const,
    title: "Buy your virtual number",
    copy: "Choose the business number your customers will call.",
  },
  {
    n: "02",
    icon: "spark" as const,
    title: "Configure call routing",
    copy: "Open routing settings and select Forward Only mode.",
  },
  {
    n: "03",
    icon: "users" as const,
    title: "Add your destinations",
    copy: "Enter a primary number and a secondary backup number.",
  },
  {
    n: "04",
    icon: "check" as const,
    title: "Save and go live",
    copy: "Calls start routing instantly while personal numbers stay private.",
  },
];

const aiSteps = [
  {
    n: "01",
    icon: "call" as const,
    title: "Buy your virtual number",
    copy: "Pick one professional number for every incoming customer call.",
  },
  {
    n: "02",
    icon: "bot" as const,
    title: "Create your AI voice agent",
    copy: "Choose its voice, role, knowledge and conversation style.",
  },
  {
    n: "03",
    icon: "spark" as const,
    title: "Connect agent and number",
    copy: "In Configure AI Call Forwarding, select AI Answers and your agent.",
  },
  {
    n: "04",
    icon: "check" as const,
    title: "Save and start calls",
    copy: "AI now answers every customer call directly, around the clock.",
  },
];

const fallbackSteps = [
  {
    n: "01",
    icon: "call" as const,
    title: "Buy your virtual number",
    copy: "Pick the professional number your customers will call.",
  },
  {
    n: "02",
    icon: "bot" as const,
    title: "Create your AI voice agent",
    copy: "Train the agent for your business, customers and call goals.",
  },
  {
    n: "03",
    icon: "users" as const,
    title: "Configure AI + Fallback",
    copy: "Connect the agent, then add primary and backup human numbers.",
  },
  {
    n: "04",
    icon: "check" as const,
    title: "Save and start calls",
    copy: "AI answers first and transfers when a human is needed.",
  },
];

const howWorkflows = [
  {
    id: "masking" as const,
    number: "01",
    kicker: "CALL MASKING",
    title: "Forward Only",
    intro: "Forward calls to your existing phones while keeping personal numbers private.",
    status: "Routing active",
    steps: maskingSteps,
    benefits: ["Number privacy", "Primary + backup", "No extra SIM"],
  },
  {
    id: "answers" as const,
    number: "02",
    kicker: "AI VOICE ROUTING",
    title: "AI Answers",
    intro: "Your trained AI agent answers the virtual number directly—no forwarding number required.",
    status: "Agent online",
    steps: aiSteps,
    benefits: ["Answers 24/7", "Instant response", "No vendor forwarding"],
  },
  {
    id: "fallback" as const,
    number: "03",
    kicker: "AI + HUMAN ROUTING",
    title: "AI + Fallback",
    intro: "AI handles the call first, then transfers to your team whenever human help is needed.",
    status: "Fallback ready",
    steps: fallbackSteps,
    benefits: ["AI handles routine calls", "Human handoff", "Primary + backup"],
  },
];

const faqs = [
  [
    "What exactly is a virtual number?",
    "A virtual number is a cloud-based business phone number. It receives calls without a physical SIM and can route them to AI agents, teams or your existing mobile numbers.",
  ],
  [
    "Can the AI agent speak multiple Indian languages?",
    "Yes. The AI agent can communicate in Hindi, English, Hinglish, Punjabi, Tamil, Gujarati and other supported Indian languages. Its language, voice and speaking style can be configured for your customers and business requirements.",
  ],
  [
    "Will the AI agent work 24/7?",
    "Yes. Your AI agent can answer and manage calls around the clock, including after business hours, weekends and holidays, so your business never misses an important customer conversation.",
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
    "Can the AI handle multiple calls at the same time?",
    "Yes. The cloud-based setup can handle multiple customer calls simultaneously. The exact call capacity can be configured according to your selected plan, expected call volume and business workflow.",
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
  const [visibleAgentCount, setVisibleAgentCount] = useState(4);
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<
    (typeof howWorkflows)[number]["id"]
  >("masking");
  const [comingSoonContext, setComingSoonContext] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => 18 + ((i * 17 + i * i * 3) % 62)),
    [],
  );

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
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
    const agent = agents[index];
    if (agent.audioSrc) {
      const audio = new Audio(agent.audioSrc);
      audioRef.current = audio;
      audio.onended = stopAudio;
      audio.onerror = stopAudio;
      audio.ontimeupdate = () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };
      setActiveAgent(index);
      void audio.play().catch(() => {
        if (audioRef.current === audio) stopAudio();
      });
      return;
    }
    if (!("speechSynthesis" in window)) return;
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
  const allAgentDemosVisible = visibleAgentCount >= agents.length;
  const toggleAgentDemos = () => {
    if (allAgentDemosVisible) {
      if (activeAgent !== null && activeAgent >= 4) stopAudio();
      setVisibleAgentCount(4);
      return;
    }
    setVisibleAgentCount((count) => Math.min(count + 4, agents.length));
  };
  useEffect(
    () => () => {
      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.ontimeupdate = null;
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.speechSynthesis?.cancel();
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    [],
  );
  useEffect(() => {
    document.body.style.overflow = menuOpen || comingSoonContext ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, comingSoonContext]);

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
          <a href="#pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            FAQs
          </a>
        </nav>
        <button
          className="nav-cta flex min-h-11 items-center gap-2 rounded-xl px-4 no-underline"
          type="button"
          onClick={() => setComingSoonContext("AI agent builder")}
        >
          Build my AI agent <Icon name="arrow" size={16} />
        </button>
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
            {agents.slice(0, visibleAgentCount).map((agent, index) => (
              <article
                className={`agent-card agent-card--reveal relative flex flex-col ${activeAgent === index ? "playing" : ""}`}
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
          {agents.length > 4 && (
            <button
              className={`agents-more ${allAgentDemosVisible ? "expanded" : ""}`}
              type="button"
              aria-expanded={allAgentDemosVisible}
              onClick={toggleAgentDemos}
            >
              <span>{allAgentDemosVisible ? "Show less" : "Load more"}</span>
              <i><Icon name="chevron" size={17} /></i>
            </button>
          )}
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
        <section className="how how-redesign section" id="how">
          <header className="how-overview">
            <div>
              <span className="section-no">02 / HOW IT WORKS</span>
              <h2>One number.<br /><em>Three ways to answer.</em></h2>
            </div>
            <div className="how-overview-copy">
              <p>
                Compare every routing mode in one place. Forward calls privately,
                let AI answer directly, or combine AI with a human fallback.
              </p>
              <span className="how-live"><i /> Live routing preview</span>
            </div>
          </header>

          <div className="workflow-mobile-tabs" aria-label="Choose a routing workflow">
            {howWorkflows.map((workflow) => (
              <button
                className={activeWorkflow === workflow.id ? "active" : ""}
                type="button"
                aria-pressed={activeWorkflow === workflow.id}
                onClick={() => setActiveWorkflow(workflow.id)}
                key={workflow.id}
              >
                <span>{workflow.number}</span>{workflow.title}
              </button>
            ))}
          </div>

          <div className="workflow-columns">
            {howWorkflows.map((workflow) => (
              <article
                className={`vertical-workflow vertical-workflow--${workflow.id} ${activeWorkflow === workflow.id ? "active" : ""}`}
                key={workflow.id}
              >
                <header className="vertical-workflow-head">
                  <div className="vertical-workflow-meta">
                    <span>{workflow.number} / {workflow.kicker}</span>
                    <span className="workflow-status"><i /> {workflow.status}</span>
                  </div>
                  <h3>{workflow.title}</h3>
                  <p>{workflow.intro}</p>
                </header>

                <div className="vertical-steps" aria-label={`${workflow.title} setup steps`}>
                  {workflow.steps.map((step, index) => (
                    <div className="vertical-step" key={step.n}>
                      <div className="vertical-step-icon"><Icon name={step.icon} size={18} /><span>{step.n}</span></div>
                      <div><h4>{step.title}</h4><p>{step.copy}</p></div>
                      {index < workflow.steps.length - 1 && <div className="vertical-connector" aria-hidden="true"><i /></div>}
                    </div>
                  ))}
                </div>

                <div className="workflow-outcome">
                  {workflow.id === "masking" && (
                    <div className="outcome-route" aria-label="Virtual number forwards to primary and backup phones">
                      <span><Icon name="call" size={15} /> Virtual</span><i><Icon name="arrow" size={14} /></i><span>Primary</span><i><Icon name="arrow" size={14} /></i><span>Backup</span>
                    </div>
                  )}
                  {workflow.id === "answers" && (
                    <div className="outcome-route" aria-label="Customer call connects directly to AI">
                      <span><Icon name="call" size={15} /> Customer</span><i><Icon name="arrow" size={14} /></i><span className="outcome-ai"><Icon name="bot" size={15} /> AI answers</span>
                    </div>
                  )}
                  {workflow.id === "fallback" && (
                    <div className="outcome-route" aria-label="AI answers first and hands off to a human">
                      <span><Icon name="bot" size={15} /> AI first</span><i><Icon name="arrow" size={14} /></i><span className="outcome-human"><Icon name="users" size={15} /> Human</span>
                    </div>
                  )}
                  <div className="workflow-benefits">
                    {workflow.benefits.map((benefit) => <span key={benefit}><Icon name="check" size={12} /> {benefit}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="faq section grid px-6 lg:px-[5vw]" id="faq">
          <div className="faq-title">
            <span className="section-no">04 / CLEAR ANSWERS</span>
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
            {faqs.slice(0, showAllFaqs ? faqs.length : 6).map(([question, answer], index) => (
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
            <button
              className="faq-more"
              type="button"
              aria-expanded={showAllFaqs}
              onClick={() => {
                setShowAllFaqs((visible) => !visible);
                if (showAllFaqs && openFaq >= 6) setOpenFaq(-1);
              }}
            >
              <span>
                {showAllFaqs
                  ? "Show fewer"
                  : `View ${faqs.length - 6} more questions`}
              </span>
              <i><Icon name="chevron" size={17} /></i>
            </button>
          </div>
        </section>
      </main>
      {comingSoonContext && (
        <div
          className="coming-soon-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setComingSoonContext(null);
          }}
        >
          <section
            className="coming-soon-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
          >
            <button
              className="coming-soon-close"
              type="button"
              aria-label="Close dialog"
              onClick={() => setComingSoonContext(null)}
              autoFocus
            >
              <Icon name="x" size={18} />
            </button>

            <div className="coming-soon-visual" aria-hidden="true">
              <span className="launch-orbit launch-orbit--outer"><i /><i /><i /></span>
              <span className="launch-orbit launch-orbit--inner"><i /><i /></span>
              <span className="launch-core"><Icon name="bot" size={34} /></span>
              <span className="launch-wave">
                {bars.slice(0, 11).map((height, index) => (
                  <i key={index} style={{ height: `${Math.max(24, height)}%` }} />
                ))}
              </span>
            </div>

            <span className="coming-soon-context">{comingSoonContext} selected</span>
            <p className="coming-soon-kicker">Something powerful is dialing in</p>
            <h2 id="coming-soon-title">We’re building something worth the wait.</h2>

            {/* <div className="coming-soon-actions">
              <button type="button" onClick={() => setComingSoonContext(null)}>
                Keep exploring
              </button>
            </div> */}
          </section>
        </div>
      )}
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
