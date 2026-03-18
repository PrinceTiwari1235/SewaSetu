"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Mail,
  Lock,
  CheckCircle2,
} from "lucide-react";

const perks = [
  "Save & bookmark your favourite portals",
  "Access step-by-step guides for 50+ services",
  "Get deadline reminders for exams and taxes",
  "Full Nepali and English interface",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = (p: string) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (strength < 2) {
      setError("Please choose a stronger password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      // Auto sign in after successful registration
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setDone(true);
      } // fallback: show success, let them log in manually
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-900/30 border border-green-700/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} className="text-green-400" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Account created!
          </h2>
          <p className="text-white/50 mb-8">
            Welcome to SewaSetu. Check your email to verify your account, then
            sign in to access your dashboard.
          </p>
          <Link
            href="/login"
            className="btn-primary inline-flex items-center gap-2"
          >
            Continue to Sign In <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-mountain-950 via-slate-950 to-crimson-950" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-mountain-800/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-crimson-900/15 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-crimson-700 rounded-xl flex items-center justify-center text-white font-display font-bold">
              स
            </div>
            <div>
              <span className="font-display font-bold text-white text-xl block leading-none">
                SewaSetu
              </span>
              <span className="text-white/30 text-[10px] tracking-widest uppercase">
                सेवासेतु
              </span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
              Join thousands of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
                empowered citizens
              </span>
            </h2>
            <p className="text-white/50 leading-relaxed">
              Your free account unlocks everything SewaSetu has to offer.
            </p>
          </div>

          <div className="space-y-3">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-900/40 border border-green-700/50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={11} className="text-green-400" />
                </div>
                <span className="text-white/65 text-sm">{perk}</span>
              </div>
            ))}
          </div>

          <div className="glass-card p-5">
            <div className="text-white/30 text-xs uppercase tracking-wider mb-2">
              Free forever
            </div>
            <div className="font-display text-3xl font-bold text-white">
              NPR 0
            </div>
            <div className="text-white/40 text-sm mt-1">
              No credit card required. Always free for citizens.
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/20 text-xs">
          © {new Date().getFullYear()} SewaSetu · Made in Nepal
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-crimson-700 rounded-xl flex items-center justify-center text-white font-display font-bold">
              स
            </div>
            <span className="font-display font-bold text-white text-xl">
              SewaSetu
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-white/45 text-sm mb-8">
            Already have one?{" "}
            <Link
              href="/login"
              className="text-crimson-400 hover:text-crimson-300 transition-colors"
            >
              Sign in instead
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-crimson-950/50 border border-crimson-800/50 rounded-xl text-crimson-300 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                />
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ramesh Shrestha"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                />
                <input
                  required
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-11 pr-12 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-white/10"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/40">{strengthLabel}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                />
                <input
                  required
                  type="password"
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  placeholder="Repeat your password"
                  className={`w-full bg-white/[0.04] border rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none transition-all ${
                    form.confirm && form.confirm !== form.password
                      ? "border-red-700/60 focus:border-red-600"
                      : "border-white/[0.09] focus:border-crimson-700/60 focus:bg-white/[0.06]"
                  }`}
                />
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p className="mt-1.5 text-red-400 text-xs">
                  Passwords do not match
                </p>
              )}
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                required
                type="checkbox"
                id="terms"
                className="accent-crimson-600 w-4 h-4 mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-white/40 text-xs cursor-pointer leading-relaxed"
              >
                I agree to SewaSetu's{" "}
                <Link
                  href="/terms"
                  className="text-crimson-400 hover:text-crimson-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-crimson-400 hover:text-crimson-300"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={
                loading || (!!form.confirm && form.confirm !== form.password)
              }
              className="btn-primary w-full !py-4 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                  Creating account…
                </>
              ) : (
                <>
                  Create Free Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-white/25 text-xs">
            Account creation currently supports email and password signup.
          </p>
        </div>
      </div>
    </div>
  );
}
