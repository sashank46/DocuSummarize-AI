import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/80 py-8 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
            DS
          </div>
          <span className="font-semibold text-slate-300">
            Document Summary Assistant &bull; Software Engineering Assessment
          </span>
        </div>

        {/* Center Tech Stack */}
        <div className="flex items-center space-x-3 text-[11px] text-slate-400">
          <span>React 19</span>
          <span>&bull;</span>
          <span>TypeScript</span>
          <span>&bull;</span>
          <span>PDF.js</span>
          <span>&bull;</span>
          <span>Tesseract.js OCR</span>
          <span>&bull;</span>
          <span>Tailwind CSS</span>
        </div>

        {/* Right Status */}
        <div className="flex items-center space-x-2 text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Production Ready</span>
        </div>
      </div>
    </footer>
  );
};
