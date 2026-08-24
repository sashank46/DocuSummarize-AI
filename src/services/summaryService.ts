import type { DocumentSummary, KeyPoint, ImprovementSuggestion } from '../types';

/**
 * Advanced Client-Side Smart Summarization & Text Analytics Engine
 */
export function generateSmartSummary(rawText: string, _customApiKey?: string): DocumentSummary {
  const text = rawText.trim();
  if (!text) {
    return createEmptySummary();
  }

  // Split into sentences and paragraphs
  const paragraphs = text
    .split(/\n\s*\n/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 0);

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && !s.startsWith('--- Page'));

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);

  const charCount = text.length;
  const wordCount = words.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Keyword Frequency Analysis (Stop words excluded)
  const stopWords = new Set([
    'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'are', 'was',
    'were', 'will', 'been', 'about', 'more', 'into', 'their', 'which', 'other',
    'some', 'what', 'when', 'where', 'how', 'than', 'them', 'then', 'should',
    'would', 'could', 'has', 'had', 'can', 'may', 'such', 'page', 'also', 'each'
  ]);

  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

  // Sentence Scoring (TF-IDF & Position weighting)
  const sentenceScores = sentences.map((sentence, idx) => {
    let score = 0;
    const lowerSent = sentence.toLowerCase();

    // Word frequency score
    Object.entries(wordFreq).forEach(([word, count]) => {
      if (lowerSent.includes(word)) {
        score += count * 1.5;
      }
    });

    // Position Boost (first & last sentences of document/paragraphs)
    if (idx === 0) score += 15;
    if (idx === sentences.length - 1) score += 10;
    if (lowerSent.includes('conclusion') || lowerSent.includes('summary') || lowerSent.includes('result')) score += 12;
    if (lowerSent.includes('important') || lowerSent.includes('key') || lowerSent.includes('must') || lowerSent.includes('objective')) score += 10;

    // Sentence length penalty (avoid extremely short or run-ons)
    if (sentence.length < 30 || sentence.length > 300) {
      score *= 0.7;
    }

    return { sentence, score, idx };
  });

  const rankedSentences = [...sentenceScores].sort((a, b) => b.score - a.score);

  // Generate Length Variants
  const shortCount = Math.max(2, Math.min(3, Math.ceil(sentences.length * 0.2)));
  const mediumCount = Math.max(4, Math.min(6, Math.ceil(sentences.length * 0.45)));
  const longCount = Math.max(7, Math.min(12, Math.ceil(sentences.length * 0.75)));

  const getTopInOrder = (count: number) => {
    return rankedSentences
      .slice(0, count)
      .sort((a, b) => a.idx - b.idx)
      .map(item => item.sentence)
      .join(' ');
  };

  const shortSummary = sentences.length <= 3 ? text : getTopInOrder(shortCount);
  const mediumSummary = sentences.length <= 6 ? text : getTopInOrder(mediumCount);
  const longSummary = sentences.length <= 12 ? text : getTopInOrder(longCount);

  // Executive Summary (Overview synthesis)
  const leadSentence = sentences[0] || 'This document contains information for evaluation and analysis.';
  const topKeywordsText = sortedKeywords.slice(0, 4).join(', ');
  const executiveSummary = sentences.length > 2
    ? `${leadSentence} Core themes focused throughout this document include ${topKeywordsText || 'key operational topics'}. ${rankedSentences[0]?.sentence || ''}`
    : text;

  // Extract Key Points
  const keyPoints: KeyPoint[] = [];

  // Core Idea Point
  if (rankedSentences[0]) {
    keyPoints.push({
      id: 'kp-1',
      category: 'core',
      importance: 'high',
      text: rankedSentences[0].sentence.replace(/^[-•*]\s*/, ''),
    });
  }

  // Secondary Insight Points
  rankedSentences.slice(1, 4).forEach((item, index) => {
    const raw = item.sentence.replace(/^[-•*]\s*/, '');
    const isAction = /must|should|require|implement|action|ensure|deliver|submit|plan/i.test(raw);
    keyPoints.push({
      id: `kp-${index + 2}`,
      category: isAction ? 'action' : 'insight',
      importance: index === 0 ? 'high' : 'medium',
      text: raw,
    });
  });

  // Additional Actionable Points from keywords if needed
  if (keyPoints.length < 3 && sentences.length > 1) {
    keyPoints.push({
      id: 'kp-extra',
      category: 'action',
      importance: 'medium',
      text: `Focus on primary key terms: ${sortedKeywords.join(', ')}.`,
    });
  }

  // Generate Improvement Suggestions
  const improvementSuggestions: ImprovementSuggestion[] = [];

  // 1. Sentence Length check
  const longSentences = sentences.filter(s => s.split(' ').length > 30);
  if (longSentences.length > 0) {
    improvementSuggestions.push({
      id: 'sug-1',
      category: 'conciseness',
      title: 'Simplify Long Run-on Sentences',
      originalText: longSentences[0].slice(0, 100) + '...',
      suggestion: 'Break down complex sentences containing over 30 words into concise, punchy statements.',
      rationale: 'Shorter sentences increase readability and retention by up to 40%.',
    });
  }

  // 2. Passive Voice / Passive phrasing check
  const passiveSentences = sentences.filter(s => /\b(is|was|were|been|be|being)\s+\w+ed\b/i.test(s));
  if (passiveSentences.length > 0) {
    improvementSuggestions.push({
      id: 'sug-2',
      category: 'tone',
      title: 'Use Active Voice for Impact',
      originalText: passiveSentences[0].slice(0, 100) + '...',
      suggestion: 'Rephrase passive statements to active subject-action constructions.',
      rationale: 'Active voice creates stronger, more persuasive technical and business communication.',
    });
  }

  // 3. Formatting & Paragraph Structure
  if (paragraphs.length === 1 && wordCount > 120) {
    improvementSuggestions.push({
      id: 'sug-3',
      category: 'structure',
      title: 'Add Paragraph Breaks & Bullet Points',
      suggestion: 'Divide continuous text walls into 2-3 thematic paragraphs or bulleted lists.',
      rationale: 'Visual white space and bullet points help readers scan essential data rapidly.',
    });
  }

  // 4. Clarity & Word Choice
  improvementSuggestions.push({
    id: 'sug-4',
    category: 'clarity',
    title: 'Highlight Key Metrics & Actionable Takeaways',
    suggestion: `Emphasize quantitative metrics and primary terms (${sortedKeywords.slice(0, 3).join(', ')}) in bold text or summary headers.`,
    rationale: 'Executive summaries gain immediate clarity when numerical goals and key deliverables stand out.',
  });

  // Readability Score (Flesch-Kincaid adaptation)
  const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 10;
  const avgCharsPerWord = wordCount > 0 ? charCount / wordCount : 5;
  const rawReadability = Math.max(10, Math.min(100, Math.round(206.835 - (1.015 * avgWordsPerSentence) - (84.6 * (avgCharsPerWord / 5)))));

  // Sentiment Detection
  let sentiment: 'Positive & Optimistic' | 'Technical & Objective' | 'Analytical & Professional' | 'Critical & Urgent' = 'Analytical & Professional';
  if (/success|excellent|growth|great|advantage|profit|improve/i.test(text)) {
    sentiment = 'Positive & Optimistic';
  } else if (/code|system|api|error|function|pdf|data|process|software|technical/i.test(text)) {
    sentiment = 'Technical & Objective';
  } else if (/urgent|issue|problem|critical|fail|deadline|warning/i.test(text)) {
    sentiment = 'Critical & Urgent';
  }

  return {
    executiveSummary,
    shortSummary,
    mediumSummary,
    longSummary,
    keyPoints,
    improvementSuggestions,
    stats: {
      wordCount,
      charCount,
      readingTimeMinutes,
      readabilityScore: rawReadability,
      sentiment,
      topKeywords: sortedKeywords,
    },
  };
}

function createEmptySummary(): DocumentSummary {
  return {
    executiveSummary: 'No document text provided.',
    shortSummary: 'No text extracted.',
    mediumSummary: 'No text extracted.',
    longSummary: 'No text extracted.',
    keyPoints: [],
    improvementSuggestions: [],
    stats: {
      wordCount: 0,
      charCount: 0,
      readingTimeMinutes: 0,
      readabilityScore: 0,
      sentiment: 'Technical & Objective',
      topKeywords: [],
    },
  };
}
