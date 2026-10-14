import { useMemo, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import AuthField from "../../components/auth/AuthField";
import { passwordChecks, validate } from "../../utils/validators";
import { registerUser } from "../../services/auth";

const STRENGTH = ["Too weak", "Weak", "Fair", "Good", "Strong"];

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  const errors = useMemo(
    () => ({
      name: validate.name(values.name),
      email: validate.email(values.email),
      phone: validate.phone(values.phone),
      password: validate.newPassword(values.password),
      confirm: validate.confirm(values.confirm, values.password),
      terms: validate.terms(values.terms),
    }),
    [values]
  );

  const checks = passwordChecks(values.password);
  const score = checks.filter((c) => c.ok).length;

  const show = (f) => (touched[f] || submitted ? errors[f] : "");
  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormError("");
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormError("");

    const firstBad = Object.keys(errors).find((k) => errors[k]);
    if (firstBad) {
      e.currentTarget.elements[firstBad]?.focus();
      return;
    }

    startTransition(async () => {
      try {
        await registerUser({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          password: values.password,
        });
        // after register → login page
        navigate("/login", { state: { registered: true, email: values.email.trim() } });
      } catch (err) {
        setFormError(err.message || "Couldn't create your account. Please try again.");
      }
    });
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Vestra for new arrivals, saved favourites and faster checkout."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      {formError && <p className="auth-alert is-err" role="alert">{formError}</p>}

      <form onSubmit={onSubmit} noValidate className="auth-form">
        <AuthField
          label="Full name"
          name="name"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          error={show("name")}
          autoComplete="name"
          placeholder="Your full name"
        />

        <div className="auth-two">
          <AuthField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            error={show("email")}
            autoComplete="email"
            placeholder="you@example.com"
          />
          <AuthField
            label="Mobile"
            name="phone"
            type="tel"
            optional
            value={values.phone}
            onChange={onChange}
            onBlur={onBlur}
            error={show("phone")}
            autoComplete="tel"
            placeholder="98765 43210"
          />
        </div>

        <AuthField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          error={show("password")}
          autoComplete="new-password"
          placeholder="Create a strong password"
        >
        </AuthField>

        <AuthField
          label="Confirm password"
          name="confirm"
          type="password"
          value={values.confirm}
          onChange={onChange}
          onBlur={onBlur}
          error={show("confirm")}
          autoComplete="new-password"
          placeholder="Re-enter your password"
        />

        <div>
          <label className="auth-check">
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={show("terms") ? "true" : undefined}
            />
            <span>
              I agree to the <a href="/terms" className="auth-link">Terms</a> and{" "}
              <a href="/privacy" className="auth-link">Privacy Policy</a>.
            </span>
          </label>
          {show("terms") && <p className="af-error" role="alert">{errors.terms}</p>}
        </div>

        <button type="submit" className="auth-submit" disabled={isPending}>
          {isPending ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}