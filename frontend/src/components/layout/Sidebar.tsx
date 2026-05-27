"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  ClipboardList,
  Sparkles,
  Library,
  Settings,
  Plus,
} from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { useAuthStore } from "@/store/assignmentStore";

const navItems = [
  { label: "Home", href: "/", icon: LayoutGrid },
  { label: "My Groups", href: "/groups", icon: Users },
  { label: "Assignments", href: "/assignments", icon: ClipboardList },
  { label: "AI Teacher's Toolkit", href: "/toolkit", icon: Sparkles },
  { label: "My Library", href: "/library", icon: Library },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { assignments } = useAssignmentStore();
  const { user } = useAuthStore();
  const assignmentCount = assignments.length;

  return (
    <aside className="hidden md:flex flex-col w-[var(--sidebar-width)] h-screen bg-sidebar-bg border-r border-sidebar-border fixed left-0 top-0 z-40">
      
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primary">
          <span className="text-white font-bold text-lg">V</span>
        </div>
        <span className="text-lg font-bold text-neutral-900 tracking-tight">
          VedaAI
        </span>
      </div>

     
      <div className="px-4 mb-4">
        <Link href="/assignments/create">
          <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary-hover transition-colors duration-200 active:scale-[0.98] cursor-pointer border-2 border-brand-primary-hover">
            <Plus size={16} />
            Create Assignment
          </button>
        </Link>
      </div>

     
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group ${
                isActive
                  ? "bg-sidebar-active text-sidebar-text-active"
                  : "text-sidebar-text hover:bg-sidebar-active hover:text-sidebar-text-active"
              }`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 ${
                  isActive ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-600"
                }`}
              />
              <span className="flex-1">{item.label}</span>
              {item.label === "Assignments" &&
                assignmentCount !== undefined &&
                assignmentCount > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-brand-primary text-white text-xs font-semibold">
                    {assignmentCount}
                  </span>
                )}
              {item.label === "My Library" &&
                assignmentCount !== undefined &&
                assignmentCount > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold">
                    {assignmentCount}
                  </span>
                )}
            </Link>
          );
        })}
      </nav>

     
      <div className="px-3 py-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-text hover:bg-sidebar-active hover:text-sidebar-text-active transition-colors duration-150"
        >
          <Settings size={18} className="text-neutral-400" />
          <span>Settings</span>
        </Link>
      </div>

     
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-active transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-neutral-300 flex items-center justify-center overflow-hidden">
            <span className="text-sm font-semibold text-neutral-600">
              {user?.schoolName?.charAt(0) || "D"}
              {user?.schoolName?.split(" ")[1]?.charAt(0) || "P"}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-neutral-900 truncate">
              {user?.schoolName || "Delhi Public School"}
            </span>
            <span className="text-xs text-neutral-400 truncate">
              {user?.schoolLocation || "Bokaro Steel City"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
