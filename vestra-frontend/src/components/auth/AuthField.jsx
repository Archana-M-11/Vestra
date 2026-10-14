import { useId, useState } from "react";

export default function AuthField({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  autoComplete,
  placeholder,
  optional = false,
  children, // extra content under the input (e.g. strength meter)
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;

  return (
    <div className={`af ${error ? "has-error" : ""}`}>
      <label htmlFor={id} className="af-label">
        {label}
        {optional && <span className="af-opt"> (optional)</span>}
      </label>

      <div className="af-control">
        <input
          id={id}
          name={name}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className="af-input"
        />
        {isPassword && (
          <button
            type="button"
            className="af-eye"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
          >
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 3l18 18M10.600 10.600a2 2 0 002.800 2.800M9.900 5.100A9.500 9.500 0 0112 5c5 0 8.500 4.500 9.500 7a12 12 0 01-2.700 3.800M6.400 6.400C4.300 7.900 2.900 10 2.500 12c1 2.500 4.500 7 9.500 7 1.400 0 2.700-.3 3.800-.9" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.500 12C3.500 9.500 7 5 12 5s8.500 4.500 9.500 7c-1 2.500-4.500 7-9.500 7s-8.500-4.500-9.500-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-err`} className="af-error" role="alert">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="af-hint">{hint}</p>
      ) : null}

      {children}
    </div>
  );
}