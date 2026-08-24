import React from 'react';
import { FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import type { SampleDocument } from '../types';

interface SampleSelectorProps {
  onSelectSample: (sample: SampleDocument) => void;
  disabled?: boolean;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ onSelectSample, disabled }) => {
  return (
    <div className="w-full mt-6">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="h-4 w-4 text-indigo-400" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-['Outfit']">
          Or Test With Sample Documents (1-Click Instant Evaluation)
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SAMPLE_DOCUMENTS.map((sample) => (
          <button
            key={sample.id}
            onClick={() => !disabled && onSelectSample(sample)}
            disabled={disabled}
            className="group flex flex-col justify-between p-4 rounded-xl glass-card glass-card-hover border border-slate-700/60 text-left transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {sample.fileType === 'pdf' ? (
                    <FileText className="h-3 w-3 mr-1" />
                  ) : (
                    <ImageIcon className="h-3 w-3 mr-1" />
                  )}
                  {sample.badgeText}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Sample</span>
              </div>

              <h5 className="font-semibold text-sm text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-1">
                {sample.name}
              </h5>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {sample.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-end text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
              <span>Run Assessment Test →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
