import { useMemo, useState, useTransition } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import AuthField from "../../components/auth/AuthField";
import { validate } from "../../utils/validators";
import { loginUser } from "../../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.registered;

  const [values, setValues] = useState({
    email: location.state?.email ?? "",
    password: "",
    remember: false,
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  const errors = useMemo(
    () => ({
      email: validate.email(values.email),
      password: validate.loginPassword(values.password),
    }),
    [values]
  );

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
        await loginUser({ email: values.email.trim(), remember: values.remember });
        navigate("/"); // after login → home
      } catch (err) {
        setFormError(err.message || "Couldn't sign you in. Please try again.");
      }
    });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your style journey."
      footer={
        <>
          New to Vestra? <Link to="/register">Create an account</Link>
        </>
      }
    >
      {justRegistered && (
        <p className="auth-alert is-ok" role="status">
          Account created! Please sign in to continue.
        </p>
      )}
      {formError && (
        <p className="auth-alert is-err" role="alert">{formError}</p>
      )}

      <form onSubmit={onSubmit} noValidate className="auth-form">
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
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          error={show("password")}
          autoComplete="current-password"
          placeholder="Your password"
        />

        <div className="auth-row">
          <label className="auth-check">
            <input type="checkbox" name="remember" checked={values.remember} onChange={onChange} />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
        </div>

        <button type="submit" className="auth-submit" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}