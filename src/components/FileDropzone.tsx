import React, { useRef, useState } from 'react';
import { Upload, FileCode, Image as ImageIcon, AlertCircle, Sparkles } from 'lucide-react';
import type { ProcessStage } from '../types';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  processStage: ProcessStage;
  progressPercent: number;
  progressMessage: string;
  error?: string | null;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelected,
  isProcessing,
  processStage,
  progressPercent,
  progressMessage,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSubmit(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSubmit(file);
    }
  };

  const validateAndSubmit = (file: File) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.txt')) {
      alert('Please select a valid PDF file, Image (PNG, JPG, WebP), or Plain Text document.');
      return;
    }
    onFileSelected(file);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative overflow-hidden rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-2 border-indigo-400 bg-indigo-950/40 shadow-2xl shadow-indigo-500/20 scale-[1.01]'
            : 'glass-card glass-card-hover border-slate-700/80'
        } ${isProcessing ? 'pointer-events-none opacity-90' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/jpg,image/webp,.txt"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />

        {/* Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {isProcessing ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2 max-w-md">
              <h3 className="text-lg font-semibold text-white">
                {processStage === 'parsing_pdf' && 'Parsing PDF Document...'}
                {processStage === 'running_ocr' && 'Running Optical Character Recognition (OCR)...'}
                {processStage === 'analyzing_text' && 'Analyzing Text Structure & Sentiment...'}
                {processStage === 'generating_summary' && 'Generating Smart Summaries & Highlights...'}
                {processStage === 'completed' && 'Processing Completed!'}
              </h3>
              <p className="text-sm text-slate-300">{progressMessage}</p>

              {/* Live Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
              <span className="text-xs text-slate-400 font-mono">{progressPercent}% complete</span>
            </div>
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8 text-indigo-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Drop your PDF or Image here, or <span className="gradient-text">browse files</span>
              </h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Supports PDF documents, scanned images (PNG, JPG, WebP), or plain text files.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                <FileCode className="h-3.5 w-3.5 text-indigo-400" />
                <span>PDF Text Parsing</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                <ImageIcon className="h-3.5 w-3.5 text-purple-400" />
                <span>Tesseract.js OCR</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                <span>Smart Summarizer</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-3 text-rose-300 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
