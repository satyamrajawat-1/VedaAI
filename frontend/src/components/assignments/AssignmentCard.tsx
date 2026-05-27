"use client";

import React, { useState } from "react";
import { MoreVertical, Eye, Trash2 } from "lucide-react";
import type { Assignment } from "@/types";
import { formatDate } from "@/lib/utils";

interface AssignmentCardProps {
  assignment: Assignment;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function AssignmentCard({
  assignment,
  onView,
  onDelete,
}: AssignmentCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative bg-white rounded-xl border border-neutral-200 p-4 md:p-5 card-hover group">
      
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm md:text-base font-semibold text-neutral-900 pr-6 leading-snug">
          {assignment.title}
        </h3>

        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="More options"
          >
            <MoreVertical size={16} className="text-neutral-400" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-8 z-50 w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-[var(--shadow-dropdown)]">
                <button
                  onClick={() => {
                    onView?.(assignment._id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Eye size={14} className="text-neutral-400" />
                  View Assignment
                </button>
                <button
                  onClick={() => {
                    onDelete?.(assignment._id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} className="text-red-400" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

     
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
        <span>
          <span className="text-neutral-400">Assigned on :</span>{" "}
          <span className="font-medium text-neutral-600">
            {formatDate(assignment.assignedOn)}
          </span>
        </span>
        <span>
          <span className="text-neutral-400">Due :</span>{" "}
          <span className="font-medium text-neutral-600">
            {formatDate(assignment.dueDate)}
          </span>
        </span>
      </div>
    </div>
  );
}
