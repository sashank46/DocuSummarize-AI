import type { SampleDocument } from '../types';

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'sample-pdf-1',
    name: 'Software_Engineering_Technical_Assessment.pdf',
    fileType: 'pdf',
    badgeText: 'Technical PDF',
    description: 'Document Summary Assistant project assessment challenge guidelines and specifications.',
    rawText: `Subject: Technical Assessment Project - Software Engineering Position

Dear Candidate,

Thank you for your interest in the Software Engineer position. We have reviewed your application and would like to proceed with our technical assessment phase.

Project Overview:
Document Summary Assistant is an application that takes any document (PDF or Image) and generates smart, concise summaries with key point extraction.

Required Features:
1. Document Upload:
   - Allow users to upload PDF files and image files (scanned documents).
   - Support drag-and-drop or file picker interface for easy uploads.

2. Text Extraction:
   - PDF Parsing: Extract text from PDFs while maintaining original line formatting.
   - OCR (Optical Character Recognition): For image files, extract legible text using OCR technology (e.g. Tesseract.js).

3. Summary Generation:
   - Automatically generate smart summaries of the document content.
   - Provide flexible options for summary length (short, medium, long).
   - Highlight key points and main ideas, ensuring the summary captures essential insights.

4. Improvement Suggestions:
   - Provide intelligent writing recommendations, readability scores, and structure suggestions.

5. UI/UX & Hosting:
   - Simple, intuitive, mobile-responsive interface.
   - Deploy on a reliable hosting platform (Vercel, Netlify, or Heroku).

Timeline & Evaluation:
- Project Deadline: September 1st, 2025
- Evaluation criteria: Problem-solving approach, code quality, working functionality, and clear documentation.`,
  },
  {
    id: 'sample-image-ocr',
    name: 'Scanned_Medical_Research_Notes.png',
    fileType: 'image',
    badgeText: 'OCR Image',
    description: 'Scanned manuscript note containing medical AI research findings for OCR testing.',
    rawText: `CLINICAL STUDY MEMORANDUM - AI IN DIAGNOSTIC RADIOLOGY

Date: August 2026
Lead Researcher: Dr. E. Vance, Neural Diagnostic Lab

EXECUTIVE FINDINGS:
1. Deep learning convolutional networks achieved 98.4% diagnostic accuracy in early-stage pulmonary nodule detection across 5,000 anonymized chest X-ray scans.
2. Inference latency was reduced to 42 milliseconds per frame using quantized model weights running on edge devices.
3. False positive alerts decreased by 34% compared to baseline traditional radiology workflows.

RECOMMENDATIONS & ACTION ITEMS:
- Initiate Phase 2 clinical integration across regional healthcare centers by Q4.
- Implement automated OCR logging for physician hand-written notes to accelerate dataset annotation.
- Ensure strict HIPAA compliance and zero-retention data privacy standards on all cloud endpoints.`,
  },
  {
    id: 'sample-text-doc',
    name: 'Cloud_Architecture_Proposal.txt',
    fileType: 'text',
    badgeText: 'Architecture Spec',
    description: 'High-availability microservices architecture design proposal.',
    rawText: `CLOUD ARCHITECTURE & DEPLOYMENT STRATEGY PROPOSAL

Abstract:
This document outlines the proposed high-availability cloud infrastructure for next-generation document processing microservices.

Architecture Stack:
1. API Gateway: Edge-routed ingress load balancer with TLS 1.3 encryption and automated rate-limiting.
2. Serverless Execution: Serverless workers for processing PDF parsing and OCR text extraction workloads in parallel.
3. Persistent Storage: Encrypted Object Storage for user uploads with strict 24-hour auto-purge lifecycle policies.

Key Performance Indicators (KPIs):
- End-to-end document processing latency must remain under 3.5 seconds for files under 25MB.
- System uptime target set to 99.99% multi-region redundancy.
- Cost efficiency goal: Reduce cloud compute expenditure by 28% through dynamic auto-scaling.

Security & Compliance:
All customer data in transit and at rest is protected with AES-256 encryption. Access controls follow strict zero-trust principle and RBAC policies.`,
  },
];
