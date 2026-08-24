import React from 'react';
import { Sliders, Zap, AlignLeft, BookOpen } from 'lucide-react';
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
  const lengths: { id: SummaryLength; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'short',
      label: 'Short',
      desc: 'Concise (~20-25% length)',
      icon: <Zap className="h-3.5 w-3.5" />,
    },
    {
      id: 'medium',
      label: 'Medium',
      desc: 'Balanced (~45-50% length)',
      icon: <AlignLeft className="h-3.5 w-3.5" />,
    },
    {
      id: 'long',
      label: 'Long',
      desc: 'Comprehensive (~75% length)',
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-700/60 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      
      {/* Left Title */}
      <div className="flex items-center space-x-2">
        <Sliders className="h-4 w-4 text-indigo-400" />
        <div>
          <h3 className="text-sm font-bold text-white font-['Outfit']">Summary Customization Options</h3>
          <p className="text-xs text-slate-400">
            Dynamically adjust detail depth for {wordCount.toLocaleString()} total words
          </p>
        </div>
      </div>

      {/* Length Selector Pills */}
      <div className="flex items-center space-x-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
        {lengths.map((item) => {
          const isActive = summaryLength === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onLengthChange(item.id)}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
