import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AlertCircle, Building2, Loader2, Lock, Mail, Shield, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { Field, Input, PasswordInput } from "@/components/ui";

const POINTS = [
  { icon: Building2,   title: "All tenants in one place",  text: "Create, manage and monitor every organisation." },
  { icon: Users,       title: "Full user control",          text: "Add, suspend or reset users across any tenant."  },
  { icon: TrendingUp,  title: "Real-time metrics",          text: "Revenue, subscriptions and activity at a glance." },
];

export default function Login() {
  const { signIn, session, loading } = useAuth();
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("admin@aucwin.com");
  const [password, setPassword] = useState("admin123");
  const [error,    setError]    = useState(null);
  const [busy,     setBusy]     = useState(false);

  if (!loading && session) return <Navigate to="/" replace />;

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = await signIn(email.trim(), password);
    setBusy(false);
    if (err) setError(err === "Invalid login credentials"
      ? "That email and password don't match."
      : err);
    else navigate("/");
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_1fr]">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden bg-ink-900 px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-ink-3/40 blur-3xl" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[.07]" aria-hidden>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative flex items-center gap-3">
          <img src="/brand/aucwin-mark-white.png" alt="" className="h-8 w-auto" draggable={false} />
          <img src="/brand/aucwin-name-white.png" alt="AucWin" className="h-6 w-auto" draggable={false} />
        </div>

        <div className="relative max-w-lg">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-[13px] font-bold text-teal-300 ring-1 ring-teal-500/30">
            <Shield size={14} /> Platform Management System
          </p>
          <h2 className="text-[38px] font-extrabold leading-[1.1] tracking-tight">
            Run the whole <span className="text-teal-400">SaaS platform</span> from one dashboard.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
            Provision tenants, manage billing, control features and monitor usage — all in one place.
          </p>
          <ul className="mt-9 space-y-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[.08] text-teal-300 ring-1 ring-white/10">
                  <p.icon size={18} />
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{p.title}</span>
                  <span className="block text-sm text-slate-400">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[13px] text-slate-400 flex items-center gap-2">
          <Shield size={14} className="text-teal-400" />
          Secure sign-in · platform admin access only
        </p>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-mist px-5 py-10 sm:px-8">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <img src="/brand/aucwin-mark.png" alt="" className="h-8 w-auto" draggable={false} />
            <img src="/brand/aucwin-name.png" alt="AucWin" className="h-6 w-auto" draggable={false} />
          </div>

          <div className="rounded-3xl border border-mist-2 bg-white p-7 shadow-lift sm:p-9">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Shield size={22} />
              </span>
              <div>
                <h1 className="text-[22px] font-extrabold tracking-tight text-ink">Platform Sign In</h1>
                <p className="text-[13px] text-slate-500">Admin access only</p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <Field label="Email">
                <div className="relative">
                  <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input type="email" required autoFocus value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@aucwin.com" className="py-3 pl-10" />
                </div>
              </Field>
              <Field label="Password">
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400" />
                  <PasswordInput required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password" className="py-3 pl-10" />
                </div>
              </Field>

              {error && (
                <div className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3 text-sm text-amber-700" role="alert">
                  <AlertCircle size={16} className="mt-px shrink-0" />{error}
                </div>
              )}

              <button className="btn-primary w-full py-3 text-[15px]" disabled={busy}>
                {busy && <Loader2 size={17} className="animate-spin" />}
                {busy ? "Signing in…" : "Sign in to platform"}
              </button>
            </form>

            <p className="mt-4 text-center text-[12px] text-slate-400">
              Demo: admin@aucwin.com / admin123
            </p>
          </div>
          <p className="mt-5 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} AucWin Platform · Restricted Access
          </p>
        </div>
      </div>
    </div>
  );
}
