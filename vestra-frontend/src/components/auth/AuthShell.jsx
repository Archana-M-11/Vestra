import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero-image.jpg";
import "../../pages/auth/Auth.css";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="auth">
      {/* Visual side (desktop only) */}
      <aside className="auth-visual" aria-hidden="true">
        <img src={heroImage} alt="" />
        <div className="auth-visual-shade" />
        <div className="auth-visual-copy">
          <span className="auth-visual-logo">VESTRA</span>
          <p>Fashion, thoughtfully discovered.</p>
        </div>
      </aside>

      {/* Form side */}
      <section className="auth-panel">
        <div className="auth-box">
          <Link to="/" className="auth-logo">
            <span>VESTRA</span>
            <small>Fashion House</small>
          </Link>

          <h1 className="auth-title">{title}</h1>
          <p className="auth-sub">{subtitle}</p>

          {children}

          <p className="auth-footer">{footer}</p>
        </div>
      </section>
    </main>
  );
}