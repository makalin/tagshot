export interface ChatData {
  tag: string;
  text: string;
  name?: string;
  avatar?: string;
  time?: string;
  theme: 'light' | 'dark';
}

export function renderChat(data: ChatData): string {
  const { tag, text, name, avatar, time, theme } = data;
  
  const avatarHtml = avatar 
    ? `<img src="${avatar}" alt="${name || 'User'}" class="avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
    : '';
  
  const avatarFallback = `<div class="avatar">${(name || 'U').charAt(0).toUpperCase()}</div>`;
  
  return `
    <div class="template-chat" data-theme="${theme}">
      <div class="header">
        ${avatarHtml}
        ${avatarFallback}
        <div class="sender">${name || 'User'}</div>
      </div>
      
      ${tag ? `<div class="tag">${tag}</div>` : ''}
      
      <div class="message">${text}</div>
      
      ${time ? `<div class="time">${time}</div>` : ''}
    </div>
  `;
}
