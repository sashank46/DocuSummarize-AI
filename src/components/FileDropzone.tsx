import React, { useRef, useState } from 'react';
import { Upload, FileText, Image as ImageIcon, AlertCircle, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';
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

  const stages = [
    { key: 'parsing_pdf', label: '1. Load & Extract' },
    { key: 'running_ocr', label: '2. Tesseract OCR' },
    { key: 'analyzing_text', label: '3. NLP Analytics' },
    { key: 'generating_summary', label: '4. Executive Summary' },
  ];

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-2 border-dashed border-indigo-400 bg-indigo-950/40 shadow-2xl shadow-indigo-500/25 scale-[1.01]'
            : 'glass-card glass-card-hover border border-slate-800'
        } ${isProcessing ? 'pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/jpg,image/webp,.txt"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />

        {/* Ambient Glow background */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {isProcessing ? (
          <div className="py-4 flex flex-col items-center justify-center space-y-6 max-w-lg mx-auto">
            {/* Spinning AI Core Visual */}
            <div className="relative flex items-center justify-center">
              <div className="h-20 w-20 rounded-full border-4 border-slate-800 border-t-indigo-500 border-r-purple-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3 w-full">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Cpu className="h-3.5 w-3.5 text-indigo-400 animate-bounce" />
                <span>Client-Side Pipeline Executing</span>
              </div>

              <h3 className="text-xl font-bold text-white font-['Outfit']">
                {processStage === 'parsing_pdf' && 'Parsing PDF Document Pages...'}
                {processStage === 'running_ocr' && 'Processing Image Optical Character Recognition...'}
                {processStage === 'analyzing_text' && 'Evaluating Vocabulary & Sentiment...'}
                {processStage === 'generating_summary' && 'Synthesizing Executive Summaries & Highlights...'}
                {processStage === 'completed' && 'Analysis Complete!'}
              </h3>
              <p className="text-xs text-slate-300 font-medium">{progressMessage}</p>

              {/* Multi-step Visual Pipeline */}
              <div className="grid grid-cols-4 gap-1.5 pt-2">
                {stages.map((stg) => {
                  const isActive = processStage === stg.key;
                  const isDone = progressPercent === 100;
                  return (
                    <div
                      key={stg.key}
                      className={`p-2 rounded-xl text-[10px] font-bold border transition-all ${
                        isActive
                          ? 'bg-indigo-600/30 border-indigo-500/60 text-white shadow-md shadow-indigo-500/20'
                          : isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      }`}
                    >
                      {stg.label}
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-300 shadow-md shadow-indigo-500/50"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                  <span>Extracting & Summarizing</span>
                  <span className="font-bold text-indigo-400">{progressPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center justify-center space-y-5">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative h-20 w-20 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                <Upload className="h-9 w-9 text-indigo-400" />
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Outfit']">
                Drop your PDF or Image here, or <span className="gradient-text">browse computer</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Seamlessly extracts text from native PDFs or performs client-side OCR on images (PNG, JPG, WebP) with zero data leaving your browser.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900/90 text-indigo-300 border border-indigo-500/20 shadow-sm">
                <FileText className="h-3.5 w-3.5 text-indigo-400" />
                <span>PDF Page Parser</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900/90 text-purple-300 border border-purple-500/20 shadow-sm">
                <ImageIcon className="h-3.5 w-3.5 text-purple-400" />
                <span>Tesseract.js OCR Stream</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900/90 text-emerald-300 border border-emerald-500/20 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>100% Client Privacy</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-3 text-rose-300 text-xs sm:text-sm shadow-lg">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

