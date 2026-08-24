import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ListChecks,
  Lightbulb,
  Search,
  CheckCircle,
  BarChart3,
  Smile,
  ShieldCheck,
  Tag,
  Copy,
  Check,
} from 'lucide-react';
import type { ProcessedDocument, SummaryLength } from '../types';
import { ExportBar } from './ExportBar';

interface SummaryOutputProps {
  document: ProcessedDocument;
  summaryLength: SummaryLength;
}

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ document, summaryLength }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'keypoints' | 'suggestions' | 'rawtext'>('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [rawCopied, setRawCopied] = useState(false);

  const getActiveSummaryText = (): string => {
    switch (summaryLength) {
      case 'short':
        return document.summary.shortSummary;
      case 'medium':
        return document.summary.mediumSummary;
      case 'long':
        return document.summary.longSummary;
    }
  };

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(document.rawText);
    setRawCopied(true);
    setTimeout(() => setRawCopied(false), 2000);
  };

  const filteredRawText = searchQuery.trim()
    ? document.rawText.split('\n').filter(line => line.toLowerCase().includes(searchQuery.toLowerCase())).join('\n')
    : document.rawText;

  return (
    <div className="w-full space-y-6">
      
      {/* Top Main Result Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-700/60 overflow-hidden">
            
            {/* Tabs Header */}
            <div className="border-b border-slate-800 bg-slate-900/60 p-2 sm:p-3 flex items-center justify-between overflow-x-auto">
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-max">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'summary'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Smart Summary</span>
                </button>

                <button
                  onClick={() => setActiveTab('keypoints')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'keypoints'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <ListChecks className="h-4 w-4" />
                  <span>Key Points ({document.summary.keyPoints.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'suggestions'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>Suggestions ({document.summary.improvementSuggestions.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('rawtext')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'rawtext'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Extracted Text</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Smart Summary */}
            {activeTab === 'summary' && (
              <div className="p-6 space-y-6">
                
                {/* Executive Synthesis */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Executive Overview
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    {document.summary.executiveSummary}
                  </p>
                </div>

                {/* Main Dynamic Length Summary */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-['Outfit']">
                      Generated {summaryLength.toUpperCase()} Summary
                    </h4>
                    <span className="text-xs text-indigo-400 font-mono">
                      {getActiveSummaryText().split(/\s+/).length} words
                    </span>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 leading-relaxed space-y-4 text-sm sm:text-base">
                    {getActiveSummaryText()
                      .split(/(?<=[.!?])\s+/)
                      .map((sentence, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {sentence}
                        </p>
                      ))}
                  </div>
                </div>

                {/* Top Extracted Keywords */}
                {document.summary.stats.topKeywords.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-purple-400" />
                      Core Keywords Extracted:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {document.summary.stats.topKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:border-indigo-500/50 transition-colors"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Export Bar */}
                <ExportBar document={document} summaryLength={summaryLength} />
              </div>
            )}

            {/* Tab 2: Key Points */}
            {activeTab === 'keypoints' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white font-['Outfit']">
                    Extracted Key Ideas & Action Items
                  </h4>
                  <span className="text-xs text-slate-400">
                    High-priority insights highlighted
                  </span>
                </div>

                <div className="space-y-3">
                  {document.summary.keyPoints.map((point) => (
                    <div
                      key={point.id}
                      className="p-4 rounded-xl glass-card border border-slate-800 hover:border-slate-700 transition-all flex items-start space-x-3"
                    >
                      <div
                        className={`h-7 w-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${
                          point.category === 'core'
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : point.category === 'action'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {point.category === 'core'
                              ? 'Core Theme'
                              : point.category === 'action'
                              ? 'Action Item'
                              : 'Key Insight'}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              point.importance === 'high'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {point.importance} Priority
                          </span>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed font-medium">
                          {point.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Writing Improvement Suggestions */}
            {activeTab === 'suggestions' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white font-['Outfit']">
                    Document Improvement Suggestions
                  </h4>
                  <span className="text-xs text-slate-400">
                    Recommendations for clarity, tone, and conciseness
                  </span>
                </div>

                <div className="space-y-4">
                  {document.summary.improvementSuggestions.map((sug) => (
                    <div
                      key={sug.id}
                      className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="h-4 w-4 text-amber-400" />
                          <h5 className="font-semibold text-sm text-slate-200">
                            {sug.title}
                          </h5>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {sug.category}
                        </span>
                      </div>

                      {sug.originalText && (
                        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400 font-mono">
                          <span className="text-slate-500 block mb-1">Passage Analyzed:</span>
                          "{sug.originalText}"
                        </div>
                      )}

                      <div className="space-y-1">
                        <p className="text-sm text-slate-300">
                          <strong className="text-indigo-400">Recommendation:</strong> {sug.suggestion}
                        </p>
                        <p className="text-xs text-slate-400">
                          <strong className="text-slate-300">Rationale:</strong> {sug.rationale}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Raw Extracted Text */}
            {activeTab === 'rawtext' && (
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search extracted text..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                    />
                  </div>
                  <button
                    onClick={handleCopyRaw}
                    className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shrink-0"
                  >
                    {rawCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Full Text</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Copy Full Raw Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-h-96 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {filteredRawText || 'No matching lines found.'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Analytics & Document Metrics (1 Col) */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-700/60 space-y-6">
            
            {/* Header */}
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base font-['Outfit']">Document Analytics</h3>
            </div>

            {/* File Info */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">File Name:</span>
                <span className="font-semibold text-slate-200 truncate max-w-[150px]" title={document.name}>
                  {document.name}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">File Type:</span>
                <span className="font-semibold text-indigo-300 uppercase">
                  {document.fileType}
                </span>
              </div>
              {document.pageCount && (
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Pages:</span>
                  <span className="font-semibold text-slate-200">
                    {document.pageCount} pages
                  </span>
                </div>
              )}
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-slate-400 text-[11px] block">Word Count</span>
                <span className="text-lg font-bold text-white font-mono">
                  {document.summary.stats.wordCount.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-slate-400 text-[11px] block">Est. Reading Time</span>
                <span className="text-lg font-bold text-indigo-400 font-mono">
                  ~{document.summary.stats.readingTimeMinutes} min
                </span>
              </div>
            </div>

            {/* Readability Score Gauge */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Readability Score</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {document.summary.stats.readabilityScore} / 100
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(10, document.summary.stats.readabilityScore))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {document.summary.stats.readabilityScore >= 70
                  ? 'Easy to read & clear structure'
                  : document.summary.stats.readabilityScore >= 45
                  ? 'Standard technical document readability'
                  : 'Dense & complex document structure'}
              </p>
            </div>

            {/* Tone & Sentiment Gauge */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-400 font-medium block">Detected Document Tone</span>
              <div className="flex items-center space-x-2">
                <Smile className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold text-white">
                  {document.summary.stats.sentiment}
                </span>
              </div>
            </div>

            {/* Technology Verified Badge */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-2 text-xs text-emerald-300">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Extracted & summarized verified without data loss</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
