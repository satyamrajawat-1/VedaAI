"use client";

import React from "react";
import { Search } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 page-enter">
      {/* Illustration */}
      <div className="relative w-48 h-48 mb-8">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
         
          <rect
            x="55"
            y="30"
            width="90"
            height="120"
            rx="8"
            fill="#f5f5f5"
            stroke="#e5e5e5"
            strokeWidth="2"
          />
        
          <line
            x1="75"
            y1="60"
            x2="125"
            y2="60"
            stroke="#d4d4d4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="75"
            y1="75"
            x2="115"
            y2="75"
            stroke="#d4d4d4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="75"
            y1="90"
            x2="120"
            y2="90"
            stroke="#d4d4d4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="75"
            y1="105"
            x2="105"
            y2="105"
            stroke="#d4d4d4"
            strokeWidth="3"
            strokeLinecap="round"
          />

        
          <circle
            cx="130"
            cy="110"
            r="30"
            fill="white"
            stroke="#d4d4d4"
            strokeWidth="3"
          />
          <line
            x1="152"
            y1="132"
            x2="168"
            y2="150"
            stroke="#a3a3a3"
            strokeWidth="4"
            strokeLinecap="round"
          />

          
          <line
            x1="118"
            y1="98"
            x2="142"
            y2="122"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="142"
            y1="98"
            x2="118"
            y2="122"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
          />

          
          <circle cx="160" cy="70" r="3" fill="#e5e5e5" />
          <circle cx="45" cy="90" r="2" fill="#e5e5e5" />
          <circle cx="170" cy="95" r="2" fill="#d4d4d4" />
        </svg>
      </div>

     
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
        No assignments yet
      </h3>
      <p className="text-sm text-neutral-500 text-center max-w-md mb-6 leading-relaxed">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let AI
        assist with grading.
      </p>

    
      <a
        href="/assignments/create"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors duration-200 active:scale-[0.98]"
      >
        <span className="text-lg leading-none">+</span>
        Create Your First Assignment
      </a>
    </div>
  );
}
