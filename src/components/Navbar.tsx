import React from 'react';
import { FileText, Sparkles, Key, CheckCircle, Cpu, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  hasCustomKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings, onOpenAbout, hasCustomKey }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3.5">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
              <FileText className="h-5 w-5 text-indigo-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg sm:text-xl text-white tracking-tight font-['Outfit']">
                Docu<span className="gradient-text">Summarize</span> <span className="text-slate-400 font-normal">AI</span>
              </h1>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
                <Zap className="h-2.5 w-2.5 text-indigo-400" />
                <span>v1.0 Enterprise</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Client-First PDF Parsing & Tesseract.js OCR Engine
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* AI Engine Status */}
          <button
            onClick={onOpenSettings}
            className="group flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all shadow-sm"
            title="Configure AI Engine API Settings"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden md:inline">
              {hasCustomKey ? 'Custom LLM API Connected' : 'Zero-Config NLP Engine'}
            </span>
            <span className="inline md:hidden">Engine</span>
            <Key className="h-3.5 w-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
            {hasCustomKey && <CheckCircle className="h-3 w-3 text-emerald-400" />}
          </button>

          {/* Technical Submission Overview */}
          <button
            onClick={onOpenAbout}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
            <span>Submission Overview</span>
          </button>
        </div>
      </div>
    </header>
  );
};

