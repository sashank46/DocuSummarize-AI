import React from 'react';
import { FileText, Image as ImageIcon, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import type { SampleDocument } from '../types';

interface SampleSelectorProps {
  onSelectSample: (sample: SampleDocument) => void;
  disabled?: boolean;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ onSelectSample, disabled }) => {
  return (
    <div className="w-full mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 font-['Outfit']">
            Instant Test Suite: 1-Click Evaluation Samples
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline">Select any preset document below</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_DOCUMENTS.map((sample) => (
          <button
            key={sample.id}
            onClick={() => !disabled && onSelectSample(sample)}
            disabled={disabled}
            className="group relative flex flex-col justify-between p-5 rounded-2xl glass-card glass-card-hover border border-slate-800 text-left transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {sample.fileType === 'pdf' ? (
                    <FileText className="h-3 w-3 mr-1 text-indigo-400" />
                  ) : (
                    <ImageIcon className="h-3 w-3 mr-1 text-purple-400" />
                  )}
                  {sample.badgeText}
                </span>
                <div className="flex items-center space-x-1 text-[10px] text-slate-500 font-mono">
                  <Clock className="h-3 w-3 text-slate-600" />
                  <span>Instant</span>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors line-clamp-1 font-['Outfit']">
                  {sample.name}
                </h5>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                  {sample.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">
              <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-300">Run Engine Assessment</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

