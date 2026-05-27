"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  User,
  School,
  MapPin,
} from "lucide-react";
import { useAuthStore } from "@/store/assignmentStore";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  schoolName?: string;
  schoolLocation?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = () => {
    const errors: FormErrors = {};
    if (!name || name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Enter a valid email";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!schoolName) errors.schoolName = "School name is required";
    if (!schoolLocation) errors.schoolLocation = "School location is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearField = (field: keyof FormErrors) => {
    if (formErrors[field]) {
      setFormErrors((f) => ({ ...f, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    const success = await register({
      name,
      email,
      password,
      schoolName,
      schoolLocation,
    });
    if (success) {
      router.push("/assignments");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-11 pr-4 py-3 rounded-xl border ${
      hasError ? "border-red-300" : "border-neutral-200"
    } bg-white text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10`;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-32 left-16 w-80 h-80 rounded-full bg-brand-primary blur-[120px]" />
          <div className="absolute bottom-16 right-10 w-72 h-72 rounded-full bg-brand-primary/50 blur-[140px]" />
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

          {/* Hero */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Start Creating
              <br />
              <span className="text-brand-primary">Question Papers</span>
              <br />
              in Minutes
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Join hundreds of teachers using AI to create customized
              assignments, save time, and focus on what matters — teaching.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">
              {[
                "AI-powered question generation",
                "Support for PDFs and images",
                "Multiple question types & difficulty levels",
                "Download papers as PDF",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                  </div>
                  <span className="text-sm text-neutral-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p className="text-sm text-neutral-600">
            © 2026 VedaAI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8 page-enter">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">VedaAI</span>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 mb-1">
            Create your account
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            Get started with VedaAI — it&apos;s free
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearField("name");
                  }}
                  placeholder="John Doe"
                  className={inputClass(!!formErrors.name)}
                />
              </div>
              {formErrors.name && (
                <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>

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
                    clearField("email");
                  }}
                  placeholder="you@school.edu"
                  className={inputClass(!!formErrors.email)}
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      clearField("password");
                    }}
                    placeholder="••••••"
                    className={inputClass(!!formErrors.password)}
                  />
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearField("confirmPassword");
                    }}
                    placeholder="••••••"
                    className={inputClass(!!formErrors.confirmPassword)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                School Name
              </label>
              <div className="relative">
                <School
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => {
                    setSchoolName(e.target.value);
                    clearField("schoolName");
                  }}
                  placeholder="Delhi Public School"
                  className={inputClass(!!formErrors.schoolName)}
                />
              </div>
              {formErrors.schoolName && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.schoolName}
                </p>
              )}
            </div>

            {/* School Location */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                School Location
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  value={schoolLocation}
                  onChange={(e) => {
                    setSchoolLocation(e.target.value);
                    clearField("schoolLocation");
                  }}
                  placeholder="Bokaro Steel City"
                  className={inputClass(!!formErrors.schoolLocation)}
                />
              </div>
              {formErrors.schoolLocation && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.schoolLocation}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-neutral-500 text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
