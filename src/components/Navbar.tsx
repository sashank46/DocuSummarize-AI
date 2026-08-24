import React from 'react';
import { FileText, Sparkles, Key, CheckCircle } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  hasCustomKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings, onOpenAbout, hasCustomKey }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg sm:text-xl text-white tracking-tight font-['Outfit']">
                Docu<span className="gradient-text">Summarize</span> AI
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v1.0 Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Intelligent PDF Parsing & Image OCR Summarization Assistant
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* AI Mode Indicator */}
          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition-all"
            title="Configure AI API Settings"
          >
            <Key className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline">
              {hasCustomKey ? 'Custom AI Connected' : 'Zero-Config AI Active'}
            </span>
            <span className="inline md:hidden">AI Config</span>
            {hasCustomKey && <CheckCircle className="h-3 w-3 text-emerald-400 ml-1" />}
          </button>

          {/* Quick Assessment Guide */}
          <button
            onClick={onOpenAbout}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/25 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Submission Info</span>
          </button>
        </div>
      </div>
    </header>
  );
};
