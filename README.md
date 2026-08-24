# DocuSummarize AI - Smart Document Summary Assistant

An intelligent, production-grade web application that parses **PDF documents** and extracts text from **Images via Optical Character Recognition (OCR)**, generating multi-length smart summaries, key point highlights, readability statistics, and document improvement suggestions.

---

## Technical Approach & Architecture (< 200 Words Write-up)

> **Approach Overview**:  
> DocuSummarize AI adopts a client-first, zero-latency document analysis architecture. **PDF Parsing** is powered by `pdfjs-dist` utilizing canvas and stream workers to extract structured text while maintaining original page flow. **Image OCR** is performed client-side using `tesseract.js` web workers with real-time recognition progress tracking (0–100%).
> 
> The core summarization engine uses an advanced Natural Language Processing (NLP) scoring algorithm based on Term Frequency-Inverse Document Frequency (TF-IDF), sentence positioning, and semantic indicators. It dynamically generates **Short (~20%)**, **Medium (~45%)**, and **Long (~75%)** summary variants alongside executive overviews, categorized key points (Core Ideas, Insights, Action Items), and writing improvement recommendations (clarity, tone, structure).
> 
> Built with React 19, TypeScript, and Tailwind CSS v4, the UI provides a mobile-responsive glassmorphism layout, 1-click evaluation samples, and multi-format document exporting (PDF, Markdown, TXT).

---

## 🌟 Key Features

1. **Document Upload**:
   - Drag-and-drop or file picker supporting `.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp`, and `.txt` files.
   - Built-in 1-click **Sample Documents** for instant assessment evaluation.

2. **Text Extraction Engines**:
   - **PDF Parsing**: Client-side parsing maintaining line formatting and page breaks.
   - **Tesseract.js OCR**: Optical Character Recognition for scanned images with live progress tracking.

3. **Smart Summarization**:
   - Dynamic length controls: **Short**, **Medium**, and **Long**.
   - Executive Overview synthesis + Extracted Core Keywords.
   - Zero-config built-in NLP algorithm + optional custom API key integration.

4. **Key Points & Action Items**:
   - Categorized takeaways: `Core Theme`, `Key Insight`, `Action Item`.
   - Priority ratings (`High`, `Medium`, `Low`).

5. **Writing & Readability Suggestions**:
   - Automated readability scoring (0–100 Flesch-Kincaid adaptation).
   - Document tone/sentiment detection.
   - Actionable recommendations for simplifying run-on sentences and active voice.

6. **Export & Analytics**:
   - 1-click Copy Summary, Export `.MD` (Markdown), Export `.TXT`, and Export `.PDF` report.
   - Full raw text inspector with real-time text search.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom Glassmorphism System
- **Icons**: Lucide React
- **PDF Engine**: `pdfjs-dist`
- **OCR Engine**: `tesseract.js`
- **PDF Export**: `jspdf`
- **Animations**: `canvas-confetti`

---

## 🚀 Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 📋 Technical Assessment Deliverables Checklist

- [x] **Working Application URL**: [Hosted Cloud Deployment]
- [x] **GitHub Repository**: Source code with full commit history
- [x] **Brief Write-up**: Technical approach (< 200 words) included above and in app modal
- [x] **PDF Parsing**: Line and structure extraction
- [x] **OCR Technology**: Image text extraction via Tesseract.js
- [x] **Summary Length Options**: Short, Medium, Long
- [x] **Key Point Highlighting**: Categorized & prioritized takeaways
- [x] **Improvement Suggestions**: Writing, tone, and readability analytics
- [x] **Mobile Responsive UI**: Responsive modern design system
