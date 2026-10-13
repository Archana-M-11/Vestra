import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const LINKS = [
  { label: "New Arrivals", href: "#new" },
  { label: "Clothing", href: "#clothing" },
  { label: "Shoes", href: "#shoes" },
  { label: "Accessories", href: "#accessories" },
];

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 016 0v2" />
  </svg>
);

export default function Navbar({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll + close on Escape while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && (setOpen(false), setSearchOpen(false));
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`vx-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container-fluid">
          <div className="vx-card">
            {/* Top row */}
            <div className="row align-items-center g-0 vx-top">
              {/* Left: menu button (mobile/tablet) */}
              <div className="col-4">
                <button
                  className="vx-menu-btn d-lg-none"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={open}
                >
                  <span className="vx-burger" aria-hidden="true">
                    <i></i>
                    <i></i>
                  </span>
                  <span className="d-none d-sm-inline">Menu</span>
                </button>
              </div>

              {/* Center: logo */}
              <div className="col-4 text-center">
                <a href="/" className="vx-logo text-decoration-none">
                  <span className="vx-logo-main">VESTRA</span>
                  <span className="vx-logo-sub">Fashion</span>
                </a>
              </div>

              {/* Right: icons */}
              <div className="col-4 d-flex justify-content-end align-items-center gap-1 gap-sm-3">
                <button
                  className="vx-icon-btn"
                  aria-label="Search"
                  onClick={() => setSearchOpen((s) => !s)}
                >
                  <SearchIcon />
                </button>
                <a href="/account" className="vx-icon-btn" aria-label="Account">
                  <UserIcon />
                </a>
                <a href="/cart" className="vx-icon-btn vx-cart" aria-label={`Cart, ${cartCount} items`}>
                  <BagIcon />
                  <span className="vx-badge">{cartCount}</span>
                </a>
              </div>
            </div>

            {/* Search bar (toggle) */}
            <div className={`vx-search ${searchOpen ? "show" : ""}`}>
              <input
                type="search"
                className="form-control vx-search-input"
                placeholder="Search dresses, sneakers, bags…"
                aria-label="Search products"
                tabIndex={searchOpen ? 0 : -1}
              />
            </div>

            {/* Desktop nav */}
            <nav className="vx-desktop-nav d-none d-lg-block" aria-label="Main">
              <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="vx-link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`vx-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`vx-drawer ${open ? "show" : ""}`} aria-hidden={!open}>
        <div className="d-flex justify-content-between align-items-center vx-drawer-head">
          <div className="vx-logo">
            <span className="vx-logo-main">VESTRA</span>
            <span className="vx-logo-sub">Fashion</span>
          </div>
          <button className="vx-icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <ul className="list-unstyled vx-drawer-links">
          {LINKS.map((l, i) => (
            <li key={l.label} style={{ transitionDelay: `${open ? 80 + i * 60 : 0}ms` }}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="vx-drawer-foot">
          <a href="/account">My account</a>
          <a href="/cart">Bag ({cartCount})</a>
        </div>
      </aside>
    </>
  );
}