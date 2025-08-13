export interface BannerData {
  tag: string;
  text: string;
  headline?: string;
  time?: string;
  theme: 'light' | 'dark';
}

export function renderBanner(data: BannerData): string {
  const { tag, text, headline, time, theme } = data;
  
  return `
    <div class="template-banner" data-theme="${theme}">
      ${tag ? `<div class="tag">${tag}</div>` : ''}
      
      ${headline ? `<div class="headline">${headline}</div>` : ''}
      
      <div class="text">${text}</div>
      
      ${time ? `<div class="time">${time}</div>` : ''}
    </div>
  `;
}
