"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, ChevronDown, LayoutGrid, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/assignmentStore";

interface TopbarProps {
  title?: string;
  showBack?: boolean;
  breadcrumb?: string;
}

export default function Topbar({
  title,
  showBack = false,
  breadcrumb,
}: TopbarProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "VD";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[var(--topbar-height)] px-4 md:px-6 bg-white border-b border-neutral-100">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="text-base font-bold text-neutral-900">VedaAI</span>
        </div>

        {/* Desktop breadcrumb */}
        <div className="hidden md:flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft size={18} className="text-neutral-600" />
            </button>
          )}
          {breadcrumb && (
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <LayoutGrid size={14} />
              <span>{breadcrumb}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Notifications */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-neutral-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-primary"></span>
        </button>

        {/* User menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 pl-2 pr-1 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
              <span className="text-xs font-semibold text-neutral-600">
                {initials}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium text-neutral-700 max-w-[120px] truncate">
              {user?.name || "User"}
            </span>
            <ChevronDown
              size={14}
              className={`hidden md:block text-neutral-400 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-neutral-200 shadow-dropdown py-1.5 z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-neutral-100">
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.email || ""}
                </p>
              </div>

              {/* Profile */}
              <button
                onClick={() => {
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <User size={16} className="text-neutral-400" />
                Profile
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut size={16} className="text-red-400" />
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <button
          className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1">
            <span className="w-4 h-0.5 bg-neutral-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-neutral-600 rounded-full"></span>
            <span className="w-3 h-0.5 bg-neutral-600 rounded-full"></span>
          </div>
        </button>
      </div>
    </header>
  );
}
