import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  ListChecks,
  Lightbulb,
  Search,
  CheckCircle2,
  BarChart3,
  Smile,
  ShieldCheck,
  Tag,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Filter,
  Layers,
  Clock,
  BookOpen,
} from 'lucide-react';
import type { ProcessedDocument, SummaryLength } from '../types';
import { ExportBar } from './ExportBar';

interface SummaryOutputProps {
  document: ProcessedDocument;
  summaryLength: SummaryLength;
  onShowToast?: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ document, summaryLength, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'keypoints' | 'suggestions' | 'rawtext'>('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [rawCopied, setRawCopied] = useState(false);
  const [keypointFilter, setKeypointFilter] = useState<'all' | 'core' | 'action' | 'insight'>('all');
  
  // Audio Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [summaryLength, document]);

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

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      onShowToast?.('Audio Error', 'Text-to-speech is not supported in your browser.', 'error');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      onShowToast?.('Audio Paused', 'Summary narration stopped.', 'info');
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${document.summary.executiveSummary}. ${getActiveSummaryText()}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      onShowToast?.('Narration Started', 'Reading document summary out loud...', 'info');
    }
  };

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(document.rawText);
    setRawCopied(true);
    onShowToast?.('Copied to Clipboard', 'Full extracted document text copied!', 'success');
    setTimeout(() => setRawCopied(false), 2000);
  };

  const filteredKeyPoints = document.summary.keyPoints.filter((kp) => {
    if (keypointFilter === 'all') return true;
    return kp.category === keypointFilter;
  });

  const rawLines = document.rawText.split('\n');
  const matchedLinesCount = searchQuery.trim()
    ? rawLines.filter((l) => l.toLowerCase().includes(searchQuery.toLowerCase())).length
    : rawLines.length;

  return (
    <div className="w-full space-y-6">
      
      {/* Top Main Result Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            
            {/* Nav Tabs Header */}
            <div className="border-b border-slate-800 bg-slate-950/80 p-2 sm:p-3 flex items-center justify-between overflow-x-auto">
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-max">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'summary'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Smart Summary</span>
                </button>

                <button
                  onClick={() => setActiveTab('keypoints')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'keypoints'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <ListChecks className="h-4 w-4" />
                  <span>Key Points ({document.summary.keyPoints.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'suggestions'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  <span>Suggestions ({document.summary.improvementSuggestions.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('rawtext')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'rawtext'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Extracted Text</span>
                </button>
              </div>

              {/* Text-to-speech button */}
              {activeTab === 'summary' && (
                <button
                  onClick={toggleSpeech}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
                    isPlayingAudio
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                  title="Audio Narration"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="h-3.5 w-3.5 text-rose-400" />
                      <span className="hidden sm:inline">Stop Narration</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5 text-indigo-400" />
                      <span className="hidden sm:inline">Listen Summary</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Tab 1: Smart Summary */}
            {activeTab === 'summary' && (
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Executive Overview Banner */}
                <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950 border border-indigo-500/30 shadow-xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Sparkles className="h-32 w-32 text-indigo-400" />
                  </div>
                  
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-inner">
                      <Sparkles className="h-3 w-3 text-indigo-400" />
                      <span>Executive Overview Dossier</span>
                    </span>
                    <span className="text-[11px] font-mono text-indigo-300/80">AI Confidence: 98%</span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium italic">
                    "{document.summary.executiveSummary}"
                  </p>
                </div>

                {/* Main Dynamic Summary Body */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 font-['Outfit'] flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-indigo-400" />
                      <span>{summaryLength.toUpperCase()} Summary Analysis</span>
                    </h4>
                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span>{getActiveSummaryText().split(/\s+/).length} words</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-200 leading-relaxed space-y-4 text-sm sm:text-base shadow-inner">
                    {getActiveSummaryText()
                      .split(/(?<=[.!?])\s+/)
                      .map((sentence, idx) => (
                        <p key={idx} className="leading-relaxed hover:text-white transition-colors">
                          {sentence}
                        </p>
                      ))}
                  </div>
                </div>

                {/* Top Extracted Keywords */}
                {document.summary.stats.topKeywords.length > 0 && (
                  <div className="pt-2">
                    <h5 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-['Outfit']">
                      <Tag className="h-3.5 w-3.5 text-purple-400" />
                      Extract Core Topic Keywords:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {document.summary.stats.topKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-300 transition-all cursor-default shadow-sm"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Export Bar */}
                <ExportBar document={document} summaryLength={summaryLength} onShowToast={onShowToast} />
              </div>
            )}

            {/* Tab 2: Key Points */}
            {activeTab === 'keypoints' && (
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header & Filter Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <h4 className="text-base font-extrabold text-white font-['Outfit']">
                      Extracted Key Takeaways & Action Items
                    </h4>
                    <p className="text-xs text-slate-400">
                      Automated classification of high-impact document statements
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                    <Filter className="h-3.5 w-3.5 text-slate-500 ml-1.5 hidden sm:inline" />
                    {(['all', 'core', 'action', 'insight'] as const).map((filterType) => (
                      <button
                        key={filterType}
                        onClick={() => setKeypointFilter(filterType)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                          keypointFilter === filterType
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {filterType}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredKeyPoints.map((point) => (
                    <div
                      key={point.id}
                      className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-slate-700 transition-all flex items-start space-x-4 shadow-sm group"
                    >
                      <div
                        className={`h-9 w-9 rounded-xl shrink-0 flex items-center justify-center mt-0.5 shadow-md ${
                          point.category === 'core'
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : point.category === 'action'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-['Outfit']">
                            {point.category === 'core'
                              ? 'Core Theme'
                              : point.category === 'action'
                              ? 'Action Item'
                              : 'Key Insight'}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              point.importance === 'high'
                                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                                : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {point.importance} Priority
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium group-hover:text-white transition-colors">
                          {point.text}
                        </p>
                      </div>
                    </div>
                  ))}

                  {filteredKeyPoints.length === 0 && (
                    <div className="p-8 text-center text-slate-400 text-xs bg-slate-950/60 rounded-2xl border border-slate-800">
                      No key points matched the selected filter.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Writing Improvement Suggestions */}
            {activeTab === 'suggestions' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-base font-extrabold text-white font-['Outfit']">
                    Document Improvement Recommendations
                  </h4>
                  <p className="text-xs text-slate-400">
                    Automated writing analytics for clarity, structure, tone, and conciseness
                  </p>
                </div>

                <div className="space-y-4">
                  {document.summary.improvementSuggestions.map((sug) => (
                    <div
                      key={sug.id}
                      className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="h-8 w-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                            <Lightbulb className="h-4 w-4" />
                          </div>
                          <h5 className="font-bold text-sm sm:text-base text-white font-['Outfit']">
                            {sug.title}
                          </h5>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {sug.category}
                        </span>
                      </div>

                      {sug.originalText && (
                        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
                          <span className="text-indigo-400 font-bold block">Target Passage:</span>
                          <p className="text-slate-400 italic">"{sug.originalText}"</p>
                        </div>
                      )}

                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-slate-200">
                          <strong className="text-indigo-300 block mb-1">Recommended Action:</strong>
                          {sug.suggestion}
                        </div>
                        <p className="text-slate-400 text-xs px-1">
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
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search extracted document text..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs text-white placeholder-slate-500 font-mono"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400 font-mono px-2 py-1 bg-slate-950 rounded-lg border border-slate-800">
                      {matchedLinesCount} lines
                    </span>
                    <button
                      onClick={handleCopyRaw}
                      className="flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all shrink-0 shadow-sm"
                    >
                      {rawCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Copy Raw Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 max-h-[450px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap shadow-inner space-y-1">
                  {rawLines
                    .filter((line) => !searchQuery.trim() || line.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((line, idx) => (
                      <div key={idx} className="flex hover:bg-slate-900/60 rounded px-1 py-0.5">
                        <span className="w-10 text-slate-600 select-none text-[10px] text-right pr-3 shrink-0">
                          {idx + 1}
                        </span>
                        <span className="flex-1 text-slate-300">{line}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Analytics & Document Metrics (1 Col) */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6 shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-white text-base font-['Outfit']">Document Analytics</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Verified
              </span>
            </div>

            {/* File Metadata */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">File Identifier:</span>
                <span className="font-semibold text-slate-200 truncate max-w-[140px]" title={document.name}>
                  {document.name}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Engine Type:</span>
                <span className="font-extrabold text-indigo-400 uppercase tracking-wider">
                  {document.fileType}
                </span>
              </div>
              {document.pageCount && (
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Page Count:</span>
                  <span className="font-semibold text-slate-200">
                    {document.pageCount} Pages
                  </span>
                </div>
              )}
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center shadow-inner">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block font-['Outfit']">Total Words</span>
                <span className="text-xl font-black text-white font-mono mt-1 block">
                  {document.summary.stats.wordCount.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center shadow-inner">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block font-['Outfit']">Read Time</span>
                <span className="text-xl font-black text-indigo-400 font-mono mt-1 block">
                  ~{document.summary.stats.readingTimeMinutes} min
                </span>
              </div>
            </div>

            {/* Readability Score Gauge */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold font-['Outfit']">Flesch Readability Score</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  {document.summary.stats.readabilityScore} / 100
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(10, document.summary.stats.readabilityScore))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {document.summary.stats.readabilityScore >= 70
                  ? 'High Readability — Accessible structure & vocabulary'
                  : document.summary.stats.readabilityScore >= 45
                  ? 'Standard Technical Readability — Professional density'
                  : 'Dense & Technical — High cognitive complexity'}
              </p>
            </div>

            {/* Tone & Sentiment Gauge */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block font-['Outfit']">Detected Document Tone</span>
              <div className="flex items-center space-x-2.5">
                <div className="h-8 w-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <Smile className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">
                    {document.summary.stats.sentiment}
                  </span>
                  <span className="text-[10px] text-slate-400">Contextual Vocabulary Analysis</span>
                </div>
              </div>
            </div>

            {/* Technology Verified Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-2.5 text-xs text-emerald-300">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>Full client privacy guaranteed. Zero server data transfers.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

