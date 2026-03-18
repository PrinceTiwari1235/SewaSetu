"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError(
        result.error === "CredentialsSignin"
          ? "Invalid email or password."
          : result.error,
      );
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-950 via-slate-950 to-mountain-950" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-crimson-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-mountain-900/20 rounded-full blur-[100px]" />

        {/* Nepal flag motif */}
        <div className="absolute right-0 top-0 h-full w-3/4 overflow-hidden opacity-[0.03] pointer-events-none">
          <svg
            viewBox="0 0 400 800"
            className="h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <polygon points="0,0 400,0 0,480" fill="white" />
            <polygon points="0,480 340,480 0,800" fill="white" />
          </svg>
        </div>

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

        <div className="relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
            Welcome back to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              your portal hub
            </span>
          </h2>
          <p className="text-white/50 leading-relaxed mb-10">
            Access all your saved government portals, guides, and reminders in
            one place.
          </p>

          {/* Social proof */}
          <div className="glass-card p-5 max-w-xs">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                  ★
                </span>
              ))}
            </div>
            <p className="text-white/60 text-sm italic mb-3">
              "SewaSetu saved me hours. I finally renewed my driving license
              without confusion."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-mountain-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                SK
              </div>
              <span className="text-white/40 text-xs">Suresh K., Chitwan</span>
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
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-crimson-700 rounded-xl flex items-center justify-center text-white font-display font-bold">
              स
            </div>
            <span className="font-display font-bold text-white text-xl">
              SewaSetu
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Sign in
          </h1>
          <p className="text-white/45 text-sm mb-8">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-crimson-400 hover:text-crimson-300 transition-colors"
            >
              Create one free
            </Link>
          </p>

          {error && (
            <div className="mb-5 p-4 bg-crimson-950/50 border border-crimson-800/50 rounded-xl text-crimson-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                Email address
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
              <div className="flex justify-between items-center mb-2">
                <label className="text-white/50 text-xs uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-white/35 hover:text-crimson-400 text-xs transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
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
                  placeholder="Enter your password"
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
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-crimson-600 w-4 h-4"
              />
              <label
                htmlFor="remember"
                className="text-white/45 text-sm cursor-pointer"
              >
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-4 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-white/25 text-xs">
            Use your email and password to sign in.
          </p>

          <p className="mt-8 text-center text-white/20 text-xs">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-white/40 transition-colors"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-white/40 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LoginPageContent />
    </Suspense>
  );
}
