export type SummaryLength = 'short' | 'medium' | 'long';
export type DocumentFileType = 'pdf' | 'image' | 'text';
export type ProcessStage = 'idle' | 'parsing_pdf' | 'running_ocr' | 'analyzing_text' | 'generating_summary' | 'completed' | 'error';

export interface ExtractionProgress {
  stage: ProcessStage;
  percent: number;
  message: string;
}

export interface KeyPoint {
  id: string;
  category: 'core' | 'insight' | 'action';
  text: string;
  importance: 'high' | 'medium' | 'low';
}

export interface ImprovementSuggestion {
  id: string;
  category: 'clarity' | 'grammar' | 'structure' | 'tone' | 'conciseness';
  title: string;
  originalText?: string;
  suggestion: string;
  rationale: string;
}

export interface DocumentSummary {
  executiveSummary: string;
  shortSummary: string;
  mediumSummary: string;
  longSummary: string;
  keyPoints: KeyPoint[];
  improvementSuggestions: ImprovementSuggestion[];
  stats: {
    wordCount: number;
    charCount: number;
    readingTimeMinutes: number;
    readabilityScore: number; // 0-100 (Flesch-Kincaid scale)
    sentiment: 'Positive & Optimistic' | 'Technical & Objective' | 'Analytical & Professional' | 'Critical & Urgent';
    topKeywords: string[];
  };
}

export interface ProcessedDocument {
  id: string;
  name: string;
  size: number;
  fileType: DocumentFileType;
  previewUrl?: string;
  rawText: string;
  pageCount?: number;
  summary: DocumentSummary;
  createdAt: Date;
}

export interface SampleDocument {
  id: string;
  name: string;
  fileType: DocumentFileType;
  badgeText: string;
  description: string;
  rawText: string;
}
