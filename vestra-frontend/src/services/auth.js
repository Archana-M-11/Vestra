/* Mock auth service. Replace the bodies with real API calls (fetch / axios). */
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function loginUser({ email, remember }) {
  await delay(900);
  // TODO: const res = await fetch("/api/auth/login", { method: "POST", ... });
  //       if (!res.ok) throw new Error("Incorrect email or password.");
  const session = { email };
  try {
    (remember ? localStorage : sessionStorage).setItem("vestra-session", JSON.stringify(session));
  } catch {
    /* storage blocked */
  }
  return session;
}

export async function registerUser({ name, email, phone }) {
  await delay(1000);
  // TODO: const res = await fetch("/api/auth/register", { method: "POST", ... });
  //       if (res.status === 409) throw new Error("An account with this email already exists.");
  return { ok: true, name, email, phone };
}