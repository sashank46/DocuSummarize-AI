import { createWorker } from 'tesseract.js';

export interface OcrResult {
  text: string;
  confidence: number;
}

export async function extractTextFromImage(
  file: File | string,
  onProgress?: (progress: number, status: string) => void
): Promise<OcrResult> {
  const worker = await createWorker('eng');

  if (onProgress) {
    onProgress(10, 'Initializing OCR Engine...');
  }

  try {
    const ret = await worker.recognize(file, {}, {
      // Progress logger
    });

    if (onProgress) {
      onProgress(90, 'Finalizing OCR Text Extraction...');
    }

    const cleanedText = ret.data.text
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    await worker.terminate();

    if (onProgress) {
      onProgress(100, 'OCR Complete!');
    }

    return {
      text: cleanedText || 'No legible text could be extracted from this image.',
      confidence: Math.round(ret.data.confidence),
    };
  } catch (error) {
    await worker.terminate();
    throw new Error(error instanceof Error ? error.message : 'OCR Recognition failed.');
  }
}
