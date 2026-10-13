import { useActionState, useEffect, useId, useState } from "react";
import "./Footer.css";

const SHOP = [
  { label: "New Arrivals", href: "#new" },
  { label: "Clothing", href: "#clothing" },
  { label: "Shoes", href: "#shoes" },
  { label: "Accessories", href: "#accessories" },
];

const HELP = [
  { label: "Contact Us", href: "#contact" },
  { label: "Shipping & Returns", href: "#shipping" },
  { label: "Size Guide", href: "#size-guide" },
  { label: "FAQs", href: "#faqs" },
];

const COMPANY = [
  { label: "Our Story", href: "#story" },
  { label: "Careers", href: "#careers" },
  { label: "Privacy Policy", href: "#privacy" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M11 8.5c2.5-.8 4.5.8 4 3.2-.4 2-2 3-3.3 2.4-1-.5-1-1.800-.6-3M11.100 12.500L10 18" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: <path d="M14 8h2V5h-2.500A3.500 3.500 0 0010 8.500V11H8v3h2v6h3v-6h2.200l.5-3H13V8.800c0-.5.3-.8 1-.8z" />,
  },
];

/* React 19: form action handler used with useActionState */
async function subscribeAction(_prev, formData) {
  const email = String(formData.get("email") || "").trim();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  // TODO: replace with your real API call
  await new Promise((r) => setTimeout(r, 900));

  return { ok: true, message: "You're in. Watch your inbox for new arrivals." };
}

export default function Footer() {
  const emailId = useId();
  const [state, formAction, isPending] = useActionState(subscribeAction, null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="vf-footer">
      <div className="container-xl">
        {/* Newsletter card (warm beige, sits on the dark footer) */}
        <section className="vf-news">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h2 className="vf-news-title">Be first to see what's new.</h2>
              <p className="vf-news-text">
                New collections and early access, sent occasionally. No spam.
              </p>
            </div>

            <div className="col-lg-6">
                        
            <form action={formAction} className="vf-form" noValidate>
            <label htmlFor={emailId} className="visually-hidden">
                Email address
            </label>

            <div className="vf-input-frame">
                <input
                id={emailId}
                name="email"
                type="email"
                className="vf-input"
                placeholder="Your email address"
                autoComplete="email"
                aria-invalid={state && !state.ok ? "true" : undefined}
                required
                />
            </div>

            <button type="submit" className="vf-submit" disabled={isPending}>
                {isPending ? "Subscribing…" : "Subscribe"}
            </button>
            </form>


              <p
                className={`vf-msg ${state ? (state.ok ? "is-ok" : "is-err") : ""}`}
                role="status"
                aria-live="polite"
              >
                {state?.message}
              </p>
            </div>
          </div>
        </section>

        {/* Link columns */}
        <div className="row g-5 vf-main">
          <div className="col-lg-4">
            <a href="/" className="vf-logo text-decoration-none">
              <span className="vf-logo-main">VESTRA</span>
              <span className="vf-logo-sub">Fashion House</span>
            </a>
            <p className="vf-tagline">Fashion, thoughtfully discovered.</p>

            <div className="d-flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="vf-social"
                  aria-label={s.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={SHOP} className="col-6 col-md-4 col-lg-2 offset-lg-1" />
          <FooterCol title="Help" links={HELP} className="col-6 col-md-4 col-lg-2" />
          <FooterCol title="Company" links={COMPANY} className="col-12 col-md-4 col-lg-2" />
        </div>

        {/* Bottom bar */}
        <div className="vf-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <small>© {new Date().getFullYear()} Vestra. All rights reserved.</small>
          <small className="vf-pay">Secure checkout · Free returns within 30 days</small>
        </div>
      </div>

      {/* Big watermark word */}
      <div className="vf-watermark" aria-hidden="true">VESTRA</div>

      <button
        className={`vf-top ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
    </footer>
  );
}

function FooterCol({ title, links, className }) {
  return (
    <nav className={className} aria-label={title}>
      <h3 className="vf-col-title">{title}</h3>
      <ul className="list-unstyled mb-0">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="vf-link">{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}