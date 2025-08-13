export interface MessengerData {
  contactName: string;
  contactAvatar?: string;
  messages: Array<{
    text: string;
    isFromMe: boolean;
    time: string;
    senderName?: string;
  }>;
  isTyping?: boolean;
  isOnline?: boolean;
}

export function renderMessenger(data: MessengerData): string {
  const { contactName, contactAvatar, messages, isTyping, isOnline } = data;
  
  const avatarHtml = contactAvatar 
    ? `<img src="${contactAvatar}" alt="${contactName}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">`
    : `<div style="width: 36px; height: 36px; border-radius: 50%; background: #1877F2; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">${contactName.charAt(0).toUpperCase()}</div>`;

  const statusIndicator = isOnline 
    ? '<div style="width: 12px; height: 12px; background: #31A24C; border: 2px solid white; border-radius: 50%; position: absolute; bottom: 0; right: 0;"></div>'
    : '';

  const messagesHtml = messages.map(msg => {
    const isMe = msg.isFromMe;
    const bubbleStyle = isMe 
      ? 'background: #0084FF; color: white; margin-left: auto; margin-right: 8px;'
      : 'background: #E4E6EB; color: #050505; margin-right: auto; margin-left: 8px;';
    
    const senderName = !isMe && msg.senderName ? 
      `<div style="font-size: 12px; font-weight: 600; color: #65676B; margin-bottom: 2px;">${msg.senderName}</div>` : '';

    return `
      <div style="display: flex; margin: 8px 0; ${isMe ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}">
        <div style="max-width: 70%; ${bubbleStyle} padding: 8px 12px; border-radius: 18px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
          ${senderName}
          <div style="font-size: 14px; line-height: 1.4; margin-bottom: 4px;">${msg.text}</div>
          <div style="font-size: 11px; opacity: 0.7; text-align: ${isMe ? 'right' : 'left'};">
            ${msg.time}
          </div>
        </div>
      </div>
    `;
  }).join('');

  const typingIndicator = isTyping ? `
    <div style="display: flex; margin: 8px 0; justify-content: flex-start;">
      <div style="background: #E4E6EB; padding: 8px 12px; border-radius: 18px; display: flex; align-items: center; gap: 4px;">
        <div style="width: 8px; height: 8px; background: #65676B; border-radius: 50%; animation: typing 1.4s infinite ease-in-out;"></div>
        <div style="width: 8px; height: 8px; background: #65676B; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.2s;"></div>
        <div style="width: 8px; height: 8px; background: #65676B; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.4s;"></div>
      </div>
    </div>
  ` : '';

  return `
    <div class="template-messenger" data-theme="light" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FFFFFF; min-height: 100%;">
      <!-- Header -->
      <div style="background: #1877F2; color: white; padding: 12px 16px; display: flex; align-items: center; gap: 12px; position: relative;">
        ${avatarHtml}
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 16px;">${contactName}</div>
          <div style="font-size: 13px; opacity: 0.9;">
            ${isOnline ? 'Active now' : 'Active 2h ago'}
          </div>
        </div>
        ${statusIndicator}
        <div style="display: flex; gap: 16px; color: white;">
          <span style="font-size: 20px;">📞</span>
          <span style="font-size: 20px;">📹</span>
          <span style="font-size: 20px;">ℹ️</span>
        </div>
      </div>

      <!-- Chat Area -->
      <div style="padding: 16px; background: #FFFFFF; min-height: 300px;">
        ${messagesHtml}
        ${typingIndicator}
      </div>

      <!-- Input Area -->
      <div style="background: #F0F2F5; padding: 12px 16px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px; color: #65676B;">😊</span>
        <div style="flex: 1; background: white; border-radius: 20px; padding: 8px 16px; display: flex; align-items: center; gap: 8px; border: 1px solid #E4E6EB;">
          <span style="font-size: 18px; color: #65676B;">📎</span>
          <input type="text" placeholder="Aa" style="border: none; outline: none; flex: 1; font-size: 14px;" readonly>
          <span style="font-size: 18px; color: #65676B;">🎤</span>
        </div>
        <span style="font-size: 20px; color: #1877F2;">📤</span>
      </div>

      <style>
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      </style>
    </div>
  `;
}
