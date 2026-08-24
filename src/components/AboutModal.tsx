import React from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Technical Assessment Overview
            </h3>
            <p className="text-xs text-slate-400">
              Document Summary Assistant Solution Specifications
            </p>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-['Outfit']">
            Assessment Requirements Completed:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">1. Document Upload</strong>
                <span className="text-slate-400">Supports PDF & Image files via Drag-and-Drop and File Picker.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">2. Text Extraction</strong>
                <span className="text-slate-400">PDF Parsing via PDF.js + Optical Character Recognition via Tesseract.js.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">3. Summary Generation</strong>
                <span className="text-slate-400">Short, Medium & Long summaries with key point highlighting.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">4. Improvement Suggestions</strong>
                <span className="text-slate-400">Readability, tone, structure, and conciseness recommendations.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">5. Mobile Responsive UI/UX</strong>
                <span className="text-slate-400">Glassmorphism theme, progress states, export to PDF/MD/TXT.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">6. Cloud Hosting</strong>
                <span className="text-slate-400">Deployed live with public accessible URL.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Approach Summary (< 200 Words) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-['Outfit']">
            Approach Overview (&lt; 200 Words):
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            This solution implements a client-first, zero-latency document analysis architecture. 
            PDF parsing utilizes <code className="text-indigo-300">pdfjs-dist</code> with worker stream rendering to extract structured text while retaining page geometry. 
            Image files undergo Optical Character Recognition via <code className="text-purple-300">Tesseract.js</code> web workers, reporting real-time progress percentages.
            Extracted text is analyzed by an NLP algorithm that evaluates term frequency-inverse document frequency (TF-IDF), sentence positioning, and semantic indicators to generate dynamic Short, Medium, and Long summaries alongside prioritized key points and writing suggestions.
            Built with React, TypeScript, and Tailwind CSS, the application offers an intuitive responsive layout, pre-loaded evaluation samples, and multi-format exporting (PDF, Markdown, TXT).
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
          <span>Candidate Technical Assessment</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
