export interface PopupData {
  tag: string;
  text: string;
  title?: string;
  buttons?: string;
  theme: 'light' | 'dark';
}

export function renderPopup(data: PopupData): string {
  const { tag, text, title, buttons, theme } = data;
  
  const buttonList = buttons ? buttons.split('|').map(btn => btn.trim()) : ['OK'];
  
  const buttonsHtml = buttonList.map((btn, index) => {
    const isPrimary = index === 0;
    return `<button class="btn ${isPrimary ? 'primary' : ''}">${btn}</button>`;
  }).join('');
  
  return `
    <div class="template-popup" data-theme="${theme}">
      ${title ? `<div class="title">${title}</div>` : ''}
      
      ${tag ? `<div class="tag">${tag}</div>` : ''}
      
      <div class="body">${text}</div>
      
      <div class="buttons">
        ${buttonsHtml}
      </div>
    </div>
  `;
}
