import { useEffect, useRef, useState } from "react";
import "./DemoBooking.css";

const slots = [
  { hour: 10, label: "10:00 AM – 11:00 AM" },
  { hour: 11, label: "11:00 AM – 12:00 PM" },
  { hour: 12, label: "12:00 PM – 1:00 PM" },
  { hour: 14, label: "2:00 PM – 3:00 PM" },
  { hour: 16, label: "4:00 PM – 5:00 PM" },
];
const purposes = ["Handle customer enquiries", "Qualify leads", "Follow up with leads", "Book appointments", "Recover abandoned carts", "Screen job candidates", "Other"];
const istDate = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const dateKey = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
const slotIsPast = (date: string, hour: number) => new Date(`${date}T${String(hour).padStart(2, "0")}:00:00+05:30`).getTime() <= Date.now();

export default function DemoBooking({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [, setClock] = useState(Date.now);
  const today = istDate();
  const [month, setMonth] = useState(() => new Date(`${today}T12:00:00`));
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ company: "", name: "", email: "", phone: "", purpose: [] as string[] });
  const [purposeError, setPurposeError] = useState(false);
  const purposeMenu = useRef<HTMLDetailsElement>(null);
  const purposeTrigger = useRef<HTMLElement>(null);
  const togglePurpose = (purpose: string) => {
    setDetails(current => ({ ...current, purpose: current.purpose.includes(purpose) ? current.purpose.filter(item => item !== purpose) : [...current.purpose, purpose] }));
    setPurposeError(false);
  };
  useEffect(() => {
    const element = dialog.current!;
    const previousFocus = document.activeElement;
    element.showModal();
    const timer = window.setInterval(() => setClock(Date.now()), 30000);
    return () => {
      window.clearInterval(timer);
      element.close();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); dialog.current?.scrollTo(0, 0); }, [step]);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const offset = new Date(year, monthIndex, 1).getDay();
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const validSlot = slot !== null && date !== "" && !slotIsPast(date, slots[slot].hour);
  const dateLabel = date ? new Intl.DateTimeFormat("en-IN", { dateStyle: "full", timeZone: "Asia/Kolkata" }).format(new Date(`${date}T12:00:00+05:30`)) : "";
  const summary = `${dateLabel} · ${slot !== null ? slots[slot].label : ""} IST`;
  return (
    <dialog ref={dialog} className="demo-booking" aria-labelledby="demo-heading" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}>
      <button className="demo-close" type="button" aria-label="Close booking" onClick={onClose}>×</button>
      <div className="demo-header">
      <span className="demo-eyebrow">SELLERSLOGIN · {step === 2 ? "DEMO PREVIEW" : `STEP ${step + 1} OF 2`}</span>
      <h2 id="demo-heading" ref={heading} tabIndex={-1}>{step === 0 ? "Book a Demo" : step === 1 ? "Enter Your Contact Details" : "Your demo selection is ready"}</h2>
      <p className="demo-intro">{step === 0 ? "Choose a date and time that works for you." : step === 1 ? "Share your contact details and select how you’d like to use your AI agent." : "This is a preview. No booking has been made or confirmation email sent."}</p>
      {step < 2 && <ol className="demo-steps" aria-label="Booking progress"><li aria-current={step === 0 ? "step" : undefined} className={step > 0 ? "is-complete" : ""}><span>{step > 0 ? "✓" : "1"}</span>Date & time</li><li aria-current={step === 1 ? "step" : undefined}><span>2</span>Your details</li></ol>}
      </div>
      {step === 0 ? <>
        <div className="demo-scroll">
        <div className="demo-scheduler">
          <section aria-label="Choose a date">
            <div className="demo-month"><button type="button" aria-label="Previous month" disabled={dateKey(year, monthIndex, 1) <= today.slice(0, 7) + "-01"} onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}>‹</button><strong aria-live="polite">{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</strong><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}>›</button></div>
            <div className="demo-calendar">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <span className="demo-weekday" key={day}>{day}</span>)}
              {Array.from({ length: offset }, (_, index) => <span key={`blank-${index}`} />)}
              {Array.from({ length: days }, (_, index) => { const key = dateKey(year, monthIndex, index + 1); return <button type="button" key={key} disabled={key < today || slotIsPast(key, 16)} aria-label={new Date(`${key}T12:00:00`).toLocaleDateString("en-IN", { dateStyle: "full" })} aria-pressed={date === key} aria-current={key === today ? "date" : undefined} onClick={() => { setDate(key); setSlot(null); setError(""); }}>{index + 1}</button>; })}
            </div>
          </section>
          <section className="demo-times" aria-label="Choose a time">
            <h3>Select Your Demo Time</h3>
            {slots.map((item, index) => <button type="button" key={item.hour} disabled={!date || slotIsPast(date, item.hour)} aria-pressed={slot === index} onClick={() => { setSlot(index); setError(""); }}>{item.label}</button>)}
            {!date && <small>Select a date to choose your time.</small>}
          </section>
        </div>
        {date && slot !== null && <p className="demo-summary">{summary}</p>}
        {error && <p role="alert" className="demo-error">{error}</p>}
        </div>
        <div className="demo-actions"><small>Preview only · Booking is not yet live</small><button className="demo-primary" type="button" disabled={!validSlot} onClick={() => { if (validSlot) setStep(1); else setError("Please choose a future time slot."); }}>Continue →</button></div>
      </> : step === 1 ? <>
        <form onSubmit={(event) => { event.preventDefault(); if (!validSlot) { setError("That time has passed. Please choose a new slot."); setStep(0); return; } if (!details.name.trim()) { setError("Please enter your name."); return; } if (!details.purpose.length) { setPurposeError(true); purposeTrigger.current?.focus(); return; } setError(""); setStep(2); }}>
          <div className="demo-scroll">
          <div className="demo-summary">{summary}<button type="button" onClick={() => setStep(0)}>Change</button></div>
          <div className="demo-fields">
            <label><strong>Company Name <span>(Optional)</span></strong><input name="company" autoComplete="organization" maxLength={150} value={details.company} onChange={e => setDetails({ ...details, company: e.target.value })} /></label>
            <label><strong>Name <span aria-hidden="true">*</span></strong><input name="name" autoComplete="name" required maxLength={100} value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} /></label>
            <label><strong>Email <span aria-hidden="true">*</span></strong><input name="email" type="email" autoComplete="email" required maxLength={254} value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} /></label>
            <label><strong>Phone Number <span aria-hidden="true">*</span></strong><span className="demo-phone"><span className="demo-phone-prefix" aria-hidden="true">+91</span><input name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" required pattern="[0-9]{10}" placeholder="9876543210" aria-describedby="demo-phone-hint" title="Enter a 10-digit Indian phone number" value={details.phone} onChange={e => { let digits = e.target.value.replace(/\D/g, ""); if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2); setDetails({ ...details, phone: digits.slice(0, 10) }); }} /></span>
            {/* <small id="demo-phone-hint">India (+91) · 10-digit phone number</small> */}
            </label>
            <fieldset className="demo-full demo-purpose-field">
              <legend id="demo-purpose-label">What would you like your AI agent to do? <span aria-hidden="true">*</span></legend>
              <details ref={purposeMenu} className="demo-purpose-menu" onKeyDown={event => { if (event.key === "Escape" && purposeMenu.current?.open) { event.preventDefault(); event.stopPropagation(); purposeMenu.current.open = false; purposeTrigger.current?.focus(); } }}>
                <summary ref={purposeTrigger} aria-describedby={purposeError ? "demo-purpose-error" : "demo-purpose-help"} aria-invalid={purposeError || undefined}><span>{details.purpose.length ? `${details.purpose.length} option${details.purpose.length === 1 ? "" : "s"} selected` : "Select purposes"}</span><span aria-hidden="true">⌄</span></summary>
                <div className="demo-purpose-options" role="group" aria-labelledby="demo-purpose-label">
                  {purposes.map(purpose => <label key={purpose}><input type="checkbox" name="purpose" value={purpose} checked={details.purpose.includes(purpose)} onChange={() => togglePurpose(purpose)} /><span>{purpose}</span></label>)}
                  <button type="button" className="demo-purpose-done" onClick={() => { if (purposeMenu.current) purposeMenu.current.open = false; purposeTrigger.current?.focus(); }}>Done</button>
                </div>
              </details>
              <small id="demo-purpose-help">Select one or more options.</small>
              {details.purpose.length > 0 && <ul className="demo-purpose-tags" aria-label="Selected purposes">{details.purpose.map(purpose => <li key={purpose}><span>{purpose}</span><button type="button" aria-label={`Remove ${purpose}`} onClick={() => { togglePurpose(purpose); purposeTrigger.current?.focus(); }}>×</button></li>)}</ul>}
              {purposeError && <p id="demo-purpose-error" role="alert" className="demo-error">Please select at least one purpose.</p>}
            </fieldset>
          </div>
          {error && <p role="alert" className="demo-error">{error}</p>}
          <p className="demo-note">Preview only. Your details will not be sent or saved.</p>
          </div>
          <div className="demo-actions"><button type="button" className="demo-secondary" onClick={() => setStep(0)}>← Back</button><button className="demo-primary" type="submit">Book Demo</button></div>
        </form>
      </> : <div className="demo-complete"><span className="demo-check" aria-hidden="true">✓</span><h3>Thank you {details.name.trim()}</h3><p className="demo-summary">{summary}</p><p>{details.purpose.join(" · ")}</p><button className="demo-primary" type="button" onClick={onClose}>Done</button></div>}
    </dialog>
  );
}
