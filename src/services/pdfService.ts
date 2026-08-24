import * as pdfjsLib from 'pdfjs-dist';

// Set up pdf.js worker URL dynamically
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export interface PdfParseResult {
  text: string;
  pageCount: number;
}

export async function extractTextFromPdf(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<PdfParseResult> {
  const arrayBuffer = await file.arrayBuffer();
  
  const loadingTask = pdfjsLib.getDocument({
    data: arrayBuffer,
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
  });

  const pdfDocument = await loadingTask.promise;
  const pageCount = pdfDocument.numPages;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    let lastY: number | null = null;
    let pageText = '';

    for (const item of textContent.items) {
      if ('str' in item) {
        // Detect line breaks based on Y positioning
        const currentY = item.transform[5];
        if (lastY !== null && Math.abs(currentY - lastY) > 5) {
          pageText += '\n';
        } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
          pageText += ' ';
        }
        pageText += item.str;
        lastY = currentY;
      }
    }

    fullText += `--- Page ${pageNum} ---\n${pageText.trim()}\n\n`;
    
    if (onProgress) {
      onProgress(pageNum, pageCount);
    }
  }

  return {
    text: fullText.trim(),
    pageCount,
  };
}
