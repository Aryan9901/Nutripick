"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, RefreshCw, FileText } from "lucide-react";
import { analyzeMenuImage } from "@/lib/api";
import type { MenuAnalysisResult } from "@/types/eatery";

interface MenuUploadProps {
  eateryId: string;
  onMenuAnalyzed: (result: MenuAnalysisResult) => void;
}

export default function MenuUpload({
  eateryId,
  onMenuAnalyzed,
}: MenuUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // In a real app, this would upload the image to the API
      // For now, we'll use our mock API function that simulates the response
      const result = await analyzeMenuImage(file);
      onMenuAnalyzed(result);
    } catch (err) {
      console.error("Error analyzing menu:", err);
      setError("Failed to analyze the menu. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Analyze Menu</h3>

      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Upload a photo of the menu to get health scores for each item.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="btn btn-primary flex items-center"
        >
          {isUploading ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Upload Menu Photo
            </>
          )}
        </button>

        <button className="btn btn-outline flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          View Sample Analysis
        </button>
      </div>
    </div>
  );
}
