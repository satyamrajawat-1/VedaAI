"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/assignmentStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Enter a valid email";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    const success = await login(email, password);
    if (success) {
      router.push("/assignments");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-brand-primary blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-brand-primary/60 blur-[150px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-primary shadow-lg shadow-brand-primary/30">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              VedaAI
            </span>
          </div>

          {/* Hero text */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Create Smarter
              <br />
              <span className="text-brand-primary">Assignments</span>
              <br />
              with AI
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Upload your study material, set your preferences, and let AI
              generate customized question papers in seconds.
            </p>
          </div>

          {/* Bottom quote */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["bg-blue-500", "bg-emerald-500", "bg-amber-500"].map(
                (bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-neutral-900 flex items-center justify-center text-[10px] font-semibold text-white`}
                  >
                    {["T", "A", "S"][i]}
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-neutral-500">
              Trusted by <span className="text-white font-medium">500+</span>{" "}
              teachers across India
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md page-enter">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-10">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">VedaAI</span>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-neutral-500 mb-8">
            Sign in to your account to continue
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email)
                      setFormErrors((f) => ({ ...f, email: undefined }));
                  }}
                  placeholder="you@school.edu"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    formErrors.email ? "border-red-300" : "border-neutral-200"
                  } bg-white text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10`}
                />
              </div>
              {formErrors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password)
                      setFormErrors((f) => ({ ...f, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                    formErrors.password
                      ? "border-red-300"
                      : "border-neutral-200"
                  } bg-white text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-neutral-500 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
