export interface XPostData {
  tag: string;
  text: string;
  name: string;
  handle: string;
  avatar?: string;
  likes?: string;
  reposts?: string;
  replies?: string;
  time?: string;
  theme: 'light' | 'dark';
}

export function renderXPost(data: XPostData): string {
  const { tag, text, name, handle, avatar, likes, reposts, replies, time, theme } = data;
  
  const avatarHtml = avatar 
    ? `<img src="${avatar}" alt="${name}" class="avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
    : '';
  
  const avatarFallback = `<div class="avatar">${name.charAt(0).toUpperCase()}</div>`;
  
  const statsHtml = [likes, reposts, replies].some(Boolean) 
    ? `
      <div class="stats">
        ${likes ? `<div class="stat"><span class="stat-icon">❤️</span> ${likes}</div>` : ''}
        ${reposts ? `<div class="stat"><span class="stat-icon">🔄</span> ${reposts}</div>` : ''}
        ${replies ? `<div class="stat"><span class="stat-icon">💬</span> ${replies}</div>` : ''}
      </div>
    `
    : '';
  
  return `
    <div class="template-xpost" data-theme="${theme}">
      <div class="header">
        ${avatarHtml}
        ${avatarFallback}
        <div class="user-info">
          <div class="name">${name}</div>
          <div class="handle">@${handle}</div>
        </div>
        <div class="verified-badge">✓</div>
      </div>
      
      ${tag ? `<div class="tag">${tag}</div>` : ''}
      
      <div class="content">${text}</div>
      
      <div class="footer">
        <div class="time">${time || '2:34 PM · Aug 13, 2025'}</div>
        ${statsHtml}
      </div>
    </div>
  `;
}
