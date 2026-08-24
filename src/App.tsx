import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { FileDropzone } from './components/FileDropzone';
import { SampleSelector } from './components/SampleSelector';
import { SummaryControls } from './components/SummaryControls';
import { SummaryOutput } from './components/SummaryOutput';
import { ApiKeyModal } from './components/ApiKeyModal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import type { ProcessedDocument, SummaryLength, ProcessStage, SampleDocument } from './types';
import { extractTextFromPdf } from './services/pdfService';
import { extractTextFromImage } from './services/ocrService';
import { generateSmartSummary } from './services/summaryService';

export function App() {
  const [processedDoc, setProcessedDoc] = useState<ProcessedDocument | null>(null);
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStage, setProcessStage] = useState<ProcessStage>('idle');
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [customApiKey, setCustomApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#38bdf8'],
    });
  };

  const processTextAndSummarize = async (
    fileName: string,
    fileSize: number,
    fileType: 'pdf' | 'image' | 'text',
    extractedText: string,
    pageCount?: number
  ) => {
    try {
      setProcessStage('analyzing_text');
      setProgressPercent(80);
      setProgressMessage('Analyzing vocabulary, sentence structures, and sentiment...');

      await new Promise((r) => setTimeout(r, 300));

      setProcessStage('generating_summary');
      setProgressPercent(95);
      setProgressMessage('Synthesizing executive summaries and key points...');

      const summary = generateSmartSummary(extractedText, customApiKey);

      setProcessStage('completed');
      setProgressPercent(100);
      setProgressMessage('Summarization completed successfully!');

      const docObj: ProcessedDocument = {
        id: 'doc-' + Date.now(),
        name: fileName,
        size: fileSize,
        fileType,
        rawText: extractedText,
        pageCount,
        summary,
        createdAt: new Date(),
      };

      setProcessedDoc(docObj);
      setIsProcessing(false);
      triggerConfetti();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Summarization failed.');
      setIsProcessing(false);
      setProcessStage('error');
    }
  };

  const handleFileSelected = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    setProgressPercent(10);

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(file.name);

    if (isPdf) {
      setProcessStage('parsing_pdf');
      setProgressMessage('Loading PDF document pages and extracting text streams...');
      try {
        const result = await extractTextFromPdf(file, (current, total) => {
          const pct = Math.round((current / total) * 60) + 10;
          setProgressPercent(pct);
          setProgressMessage(`Parsed ${current} of ${total} PDF pages...`);
        });

        if (!result.text.trim()) {
          throw new Error('No readable text found in PDF. If this is a scanned PDF, try converting page images first.');
        }

        await processTextAndSummarize(file.name, file.size, 'pdf', result.text, result.pageCount);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to parse PDF document.');
        setIsProcessing(false);
        setProcessStage('error');
      }
    } else if (isImage) {
      setProcessStage('running_ocr');
      setProgressMessage('Initializing Tesseract.js OCR engine...');
      try {
        const result = await extractTextFromImage(file, (progress, status) => {
          setProgressPercent(Math.round(progress * 0.7));
          setProgressMessage(status);
        });

        await processTextAndSummarize(file.name, file.size, 'image', result.text);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to run OCR on image.');
        setIsProcessing(false);
        setProcessStage('error');
      }
    } else {
      // Plain text file
      setProcessStage('analyzing_text');
      setProgressMessage('Reading text file content...');
      try {
        const text = await file.text();
        await processTextAndSummarize(file.name, file.size, 'text', text);
      } catch (err) {
        console.error(err);
        setError('Failed to read text file.');
        setIsProcessing(false);
        setProcessStage('error');
      }
    }
  };

  const handleSelectSample = async (sample: SampleDocument) => {
    setError(null);
    setIsProcessing(true);
    setProgressPercent(20);
    setProcessStage(sample.fileType === 'pdf' ? 'parsing_pdf' : sample.fileType === 'image' ? 'running_ocr' : 'analyzing_text');
    setProgressMessage(`Loading ${sample.name}...`);

    await new Promise((r) => setTimeout(r, 400));
    setProgressPercent(60);
    setProgressMessage('Extracting formatted text elements...');

    await new Promise((r) => setTimeout(r, 400));
    await processTextAndSummarize(sample.name, sample.rawText.length * 2, sample.fileType, sample.rawText, sample.fileType === 'pdf' ? 2 : 1);
  };

  const handleReset = () => {
    setProcessedDoc(null);
    setError(null);
    setProcessStage('idle');
    setProgressPercent(0);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-['Inter'] selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        hasCustomKey={Boolean(customApiKey)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Hero Section */}
        {!processedDoc && (
          <div className="text-center space-y-4 max-w-3xl mx-auto py-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
              <span>Smart Document Summarization & OCR Engine</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit'] leading-tight">
              Transform Any PDF or Image into <span className="gradient-text">Smart Summaries</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Extract text, highlight core takeaways, generate customizable short/medium/long summaries, and get instant document writing improvement suggestions.
            </p>
          </div>
        )}

        {/* Upload State vs Result View */}
        {!processedDoc ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <FileDropzone
              onFileSelected={handleFileSelected}
              isProcessing={isProcessing}
              processStage={processStage}
              progressPercent={progressPercent}
              progressMessage={progressMessage}
              error={error}
            />

            {!isProcessing && (
              <SampleSelector onSelectSample={handleSelectSample} disabled={isProcessing} />
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Control Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card rounded-2xl p-4 border border-slate-700/60">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                >
                  <ArrowLeft className="h-4 w-4 text-indigo-400" />
                  <span>Upload Another Document</span>
                </button>

                <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />

                <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Currently viewing report for <strong className="text-white">{processedDoc.name}</strong></span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>New Analysis</span>
              </button>
            </div>

            {/* Customization Options Bar */}
            <SummaryControls
              summaryLength={summaryLength}
              onLengthChange={setSummaryLength}
              wordCount={processedDoc.summary.stats.wordCount}
            />

            {/* Full Summary Dashboard Output */}
            <SummaryOutput document={processedDoc} summaryLength={summaryLength} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={customApiKey}
        onSaveKey={setCustomApiKey}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
