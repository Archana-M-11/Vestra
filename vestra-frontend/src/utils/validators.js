export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const passwordChecks = (pw = "") => [
  { key: "len", label: "At least 8 characters", ok: pw.length >= 8 },
  { key: "upper", label: "One uppercase letter", ok: /[A-Z]/.test(pw) },
  { key: "lower", label: "One lowercase letter", ok: /[a-z]/.test(pw) },
  { key: "num", label: "One number", ok: /\d/.test(pw) },
  { key: "special", label: "One special character", ok: /[^A-Za-z0-9]/.test(pw) },
];

export const normalizePhone = (v = "") =>
  v.replace(/[\s-]/g, "").replace(/^\+?91/, "").replace(/^0/, "");

/* Each validator returns an error string, or "" when valid */
export const validate = {
  name(v = "") {
    const s = v.trim();
    if (!s) return "Full name is required.";
    if (s.length < 2) return "Name must be at least 2 characters.";
    if (s.length > 50) return "Name must be 50 characters or less.";
    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(s)) return "Use letters, spaces, . ' or - only.";
    return "";
  },

  email(v = "") {
    const s = v.trim();
    if (!s) return "Email is required.";
    if (!EMAIL_RE.test(s)) return "Enter a valid email address.";
    return "";
  },

  /* optional field: only checked when filled */
  phone(v = "") {
    if (!v.trim()) return "";
    if (!/^[6-9]\d{9}$/.test(normalizePhone(v))) return "Enter a valid 10-digit mobile number.";
    return "";
  },

  loginPassword(v = "") {
    if (!v) return "Password is required.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    return "";
  },

  newPassword(v = "") {
    if (!v) return "Password is required.";
    const failed = passwordChecks(v).filter((c) => !c.ok);
    return failed.length ? "Password doesn't meet all the requirements." : "";
  },

  confirm(v = "", pw = "") {
    if (!v) return "Please confirm your password.";
    if (v !== pw) return "Passwords do not match.";
    return "";
  },

  terms(checked) {
    return checked ? "" : "You must accept the terms to continue.";
  },
};