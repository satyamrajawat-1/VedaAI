"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Filter, Plus, Loader2 } from "lucide-react";
import EmptyState from "@/components/assignments/EmptyState";
import AssignmentGrid from "@/components/assignments/AssignmentGrid";
import SearchInput from "@/components/ui/SearchInput";
import { useAssignmentStore } from "@/store/assignmentStore";

export default function AssignmentsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const {
    assignments,
    isLoading,
    error,
    fetchAssignments,
    deleteAssignment,
  } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const isEmpty = !isLoading && assignments.length === 0;

  const handleView = (id: string) => {
    router.push(`/assignments/${id}/output`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      await deleteAssignment(id);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-brand-primary" />
        </div>
      )}

     
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      
      {isEmpty && !error && <EmptyState />}

      
      {!isLoading && assignments.length > 0 && (
        <>
          
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-neutral-900">
              Assignments
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Manage and create assignments for your classes.
            </p>
          </div>

          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
              <Filter size={14} className="text-neutral-400" />
              Filter By
            </button>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search Assignment"
              className="w-full sm:w-64"
            />
          </div>

          
          {filteredAssignments.length === 0 && search && (
            <div className="text-center py-12">
              <p className="text-sm text-neutral-500">
                No assignments found for &quot;{search}&quot;
              </p>
            </div>
          )}

          
          {filteredAssignments.length > 0 && (
            <AssignmentGrid
              assignments={filteredAssignments}
              onView={handleView}
              onDelete={handleDelete}
            />
          )}

        
          <Link
            href="/assignments/create"
            className="fixed bottom-24 md:bottom-8 right-6 z-30 flex items-center gap-2 px-4 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium shadow-lg hover:bg-neutral-800 transition-all duration-200 hover:shadow-xl active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Create Assignment</span>
          </Link>
        </>
      )}
    </div>
  );
}
