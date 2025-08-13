export interface WhatsAppData {
  contactName: string;
  contactAvatar?: string;
  messages: Array<{
    text: string;
    isFromMe: boolean;
    time: string;
    status?: 'sent' | 'delivered' | 'read';
  }>;
  lastSeen?: string;
  isOnline?: boolean;
}

export function renderWhatsApp(data: WhatsAppData): string {
  const { contactName, contactAvatar, messages, lastSeen, isOnline } = data;
  
  const avatarHtml = contactAvatar 
    ? `<img src="${contactAvatar}" alt="${contactName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">`
    : `<div style="width: 40px; height: 40px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">${contactName.charAt(0).toUpperCase()}</div>`;

  const statusIndicator = isOnline 
    ? '<div style="width: 12px; height: 12px; background: #25D366; border: 2px solid white; border-radius: 50%; position: absolute; bottom: 0; right: 0;"></div>'
    : '';

  const lastSeenText = lastSeen ? `last seen ${lastSeen}` : '';

  const messagesHtml = messages.map(msg => {
    const isMe = msg.isFromMe;
    const bubbleStyle = isMe 
      ? 'background: #DCF8C6; margin-left: auto; margin-right: 10px;'
      : 'background: white; margin-right: auto; margin-left: 10px;';
    
    const statusIcon = isMe ? (() => {
      switch(msg.status) {
        case 'sent': return '✓';
        case 'delivered': return '✓✓';
        case 'read': return '✓✓ <span style="color: #34B7F1;">✓</span>';
        default: return '';
      }
    })() : '';

    return `
      <div style="display: flex; margin: 8px 0; ${isMe ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}">
        <div style="max-width: 70%; ${bubbleStyle} padding: 8px 12px; border-radius: 18px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
          <div style="color: #333; font-size: 14px; line-height: 1.4; margin-bottom: 4px;">${msg.text}</div>
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px; font-size: 11px; color: #667781;">
            <span>${msg.time}</span>
            ${statusIcon ? `<span style="margin-left: 4px;">${statusIcon}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="template-whatsapp" data-theme="light" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #E5DDD5; min-height: 100%;">
      <!-- Header -->
      <div style="background: #075E54; color: white; padding: 10px 16px; display: flex; align-items: center; gap: 12px; position: relative;">
        ${avatarHtml}
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 16px;">${contactName}</div>
          <div style="font-size: 13px; opacity: 0.8;">
            ${isOnline ? 'online' : lastSeenText}
          </div>
        </div>
        ${statusIndicator}
        <div style="display: flex; gap: 16px; color: white;">
          <span style="font-size: 20px;">📞</span>
          <span style="font-size: 20px;">📹</span>
          <span style="font-size: 20px;">⋮</span>
        </div>
      </div>

      <!-- Chat Area -->
      <div style="padding: 16px; background: #E5DDD5; min-height: 300px;">
        ${messagesHtml}
      </div>

      <!-- Input Area -->
      <div style="background: #F0F0F0; padding: 12px 16px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px; color: #919191;">😊</span>
        <div style="flex: 1; background: white; border-radius: 20px; padding: 8px 16px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px; color: #919191;">📎</span>
          <input type="text" placeholder="Type a message" style="border: none; outline: none; flex: 1; font-size: 14px;" readonly>
          <span style="font-size: 18px; color: #919191;">🎤</span>
        </div>
        <span style="font-size: 20px; color: #25D366;">📤</span>
      </div>
    </div>
  `;
}
