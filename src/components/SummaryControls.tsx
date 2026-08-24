import React from 'react';
import { Sliders, Zap, AlignLeft, BookOpen, Layers } from 'lucide-react';
import type { SummaryLength } from '../types';

interface SummaryControlsProps {
  summaryLength: SummaryLength;
  onLengthChange: (length: SummaryLength) => void;
  wordCount: number;
}

export const SummaryControls: React.FC<SummaryControlsProps> = ({
  summaryLength,
  onLengthChange,
  wordCount,
}) => {
  const lengths: { id: SummaryLength; label: string; desc: string; icon: React.ReactNode; ratio: string }[] = [
    {
      id: 'short',
      label: 'Short',
      desc: 'Concise Overview',
      ratio: '~25%',
      icon: <Zap className="h-3.5 w-3.5 text-amber-400" />,
    },
    {
      id: 'medium',
      label: 'Medium',
      desc: 'Balanced Detail',
      ratio: '~50%',
      icon: <AlignLeft className="h-3.5 w-3.5 text-indigo-400" />,
    },
    {
      id: 'long',
      label: 'Long',
      desc: 'Comprehensive Summary',
      ratio: '~75%',
      icon: <BookOpen className="h-3.5 w-3.5 text-purple-400" />,
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-5 border border-slate-800 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
      
      {/* Left Title */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md">
          <Sliders className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-extrabold text-white font-['Outfit']">Dynamic Summary Length & Compression</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Interactive
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Original document length: <strong className="text-slate-200">{wordCount.toLocaleString()} words</strong>
          </p>
        </div>
      </div>

      {/* Length Selector Pills */}
      <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 w-full md:w-auto shadow-inner">
        {lengths.map((item) => {
          const isActive = summaryLength === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onLengthChange(item.id)}
              className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? 'bg-indigo-950/60 text-indigo-200' : 'bg-slate-900 text-slate-500'
                }`}
              >
                {item.ratio}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

