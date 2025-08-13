import html2canvas from 'html2canvas';

export interface ExportOptions {
  width: number;
  height: number;
  backgroundColor?: string;
}

export async function exportToPNG(element: HTMLElement, options: ExportOptions): Promise<void> {
  const { width, height, backgroundColor } = options;
  
  try {
    // Configure html2canvas options for direct capture
    const canvasOptions = {
      width,
      height,
      backgroundColor: backgroundColor || 'transparent',
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      removeContainer: true,
      logging: false,
      imageTimeout: 15000,
      onclone: (clonedDoc: Document) => {
        // Ensure the cloned document has the same theme
        const clonedElement = clonedDoc.querySelector('[data-theme]') as HTMLElement;
        if (clonedElement) {
          clonedElement.setAttribute('data-theme', element.getAttribute('data-theme') || 'light');
        }
        
        // Ensure all content is visible in the clone
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el: Element) => {
          if (el instanceof HTMLElement) {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
          }
        });
      }
    };
    
    // Capture the element directly
    const canvas = await html2canvas(element, canvasOptions);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `tagshot-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export image. Please try again.');
  }
}

// Alternative export function for better quality (uses canvas scaling)
export async function exportToPNGHighQuality(element: HTMLElement, options: ExportOptions): Promise<void> {
  const { width, height, backgroundColor } = options;
  
  // Use higher scale for better quality
  const scale = 3;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  const exportContainer = document.createElement('div');
  exportContainer.style.position = 'absolute';
  exportContainer.style.left = '-9999px';
  exportContainer.style.top = '-9999px';
  exportContainer.style.width = `${scaledWidth}px`;
  exportContainer.style.height = `${scaledHeight}px`;
  exportContainer.style.overflow = 'hidden';
  exportContainer.style.transform = `scale(${scale})`;
  exportContainer.style.transformOrigin = 'top left';
  
  if (backgroundColor) {
    exportContainer.style.backgroundColor = backgroundColor;
  }
  
  // Clone the element content
  const clonedContent = element.cloneNode(true) as HTMLElement;
  clonedContent.style.width = `${width}px`;
  clonedContent.style.height = `${height}px`;
  clonedContent.style.margin = '0';
  clonedContent.style.padding = '0';
  
  // Remove any interactive elements from the clone
  const interactiveElements = clonedContent.querySelectorAll('button, input, select, textarea');
  interactiveElements.forEach(el => el.remove());
  
  exportContainer.appendChild(clonedContent);
  document.body.appendChild(exportContainer);
  
  try {
    const canvasOptions = {
      width: scaledWidth,
      height: scaledHeight,
      backgroundColor: backgroundColor || 'transparent',
      scale: 1, // We're already scaling the container
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      removeContainer: true,
      logging: false,
      imageTimeout: 15000,
      onclone: (clonedDoc: Document) => {
        const clonedElement = clonedDoc.querySelector('[data-theme]') as HTMLElement;
        if (clonedElement) {
          clonedElement.setAttribute('data-theme', element.getAttribute('data-theme') || 'light');
        }
      }
    };
    
    const canvas = await html2canvas(exportContainer, canvasOptions);
    
    // Create a new canvas with the target dimensions
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = width;
    finalCanvas.height = height;
    const ctx = finalCanvas.getContext('2d')!;
    
    // Draw the high-res canvas onto the final canvas with downscaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(canvas, 0, 0, width, height);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `tagshot-${Date.now()}.png`;
    link.href = finalCanvas.toDataURL('image/png');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('High quality export failed:', error);
    throw new Error('Failed to export high quality image. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(exportContainer);
  }
}
