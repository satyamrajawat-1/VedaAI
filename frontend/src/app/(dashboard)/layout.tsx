"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileNav from "@/components/layout/MobileNav";
import AuthGuard from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-neutral-50">
        {/* Sidebar */}
        <Sidebar />

        
        <div className="md:ml-[var(--sidebar-width)] flex flex-col min-h-screen">
          {/* Topbar */}
          <Topbar showBack breadcrumb="Assignment" />

          
          <main className="flex-1 pb-[var(--mobile-nav-height)] md:pb-0">
            {children}
          </main>
        </div>

        
        <MobileNav />
      </div>
    </AuthGuard>
  );
}
