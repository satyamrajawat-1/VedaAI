"use client";

import React from "react";
import AssignmentCard from "./AssignmentCard";
import type { Assignment } from "@/types";

interface AssignmentGridProps {
  assignments: Assignment[];
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function AssignmentGrid({
  assignments,
  onView,
  onDelete,
}: AssignmentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 page-enter">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment._id}
          assignment={assignment}
          onView={onView}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
