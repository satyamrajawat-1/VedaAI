"use client";

import React, { useCallback, useState } from "react";
import { Upload, FileText, Image, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
];
const ACCEPTED_EXTENSIONS = ".pdf, .png, .jpeg, .webp";

export default function FileUpload({
  onFileSelect,
  selectedFile,
  onRemove,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && ACCEPTED_TYPES.includes(file.type)) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  if (selectedFile) {
    const isPdf = selectedFile.type === "application/pdf";
    const FileIcon = isPdf ? FileText : Image;

    return (
      <div className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-neutral-200">
          <FileIcon size={20} className="text-neutral-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900 truncate">
            {selectedFile.name}
          </p>
          <p className="text-xs text-neutral-400">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          aria-label="Remove file"
        >
          <X size={16} className="text-neutral-500" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-colors duration-200 cursor-pointer ${
        isDragging
          ? "border-brand-primary bg-brand-primary-light"
          : "border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:bg-neutral-50"
      }`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
        <Upload
          size={20}
          className={`${
            isDragging ? "text-brand-primary" : "text-neutral-400"
          }`}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-neutral-700">
          Choose a file or drag & drop it here
        </p>
        <p className="text-xs text-brand-primary mt-1 font-medium">
          {ACCEPTED_EXTENSIONS.toUpperCase()}
        </p>
      </div>
      <label className="cursor-pointer">
        <span className="inline-flex items-center px-4 py-2 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
          Browse Files
        </span>
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileInput}
          className="hidden"
        />
      </label>
      <p className="text-xs text-neutral-400 mt-1">
        Upload images of your preferred document/image
      </p>
    </div>
  );
}
