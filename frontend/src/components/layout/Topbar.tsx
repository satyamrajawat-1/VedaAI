"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, ChevronDown, LayoutGrid } from "lucide-react";

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

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[var(--topbar-height)] px-4 md:px-6 bg-white border-b border-neutral-100">
      
      <div className="flex items-center gap-3">
        
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="text-base font-bold text-neutral-900">VedaAI</span>
        </div>

        
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

      
      <div className="flex items-center gap-2 md:gap-3">
        
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-neutral-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-primary"></span>
        </button>

        
        <button className="flex items-center gap-2 pl-2 pr-1 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
            <span className="text-xs font-semibold text-neutral-600">JD</span>
          </div>
          <span className="hidden md:block text-sm font-medium text-neutral-700">
            XYZ
          </span>
          <ChevronDown
            size={14}
            className="hidden md:block text-neutral-400"
          />
        </button>

        
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
