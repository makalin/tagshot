export interface ChatGPTData {
  messages: Array<{
    text: string;
    isFromUser: boolean;
    timestamp: string;
    hasCode?: boolean;
    codeLanguage?: string;
  }>;
  model?: string;
  isStreaming?: boolean;
}

export function renderChatGPT(data: ChatGPTData): string {
  const { messages, model = 'GPT-4', isStreaming = false } = data;
  
  const messagesHtml = messages.map(msg => {
    const isUser = msg.isFromUser;
    
    const avatar = isUser 
      ? '<div style="width: 30px; height: 30px; border-radius: 50%; background: #10A37F; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">U</div>'
      : '<div style="width: 30px; height: 30px; border-radius: 50%; background: #10A37F; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">C</div>';

    let contentHtml = msg.text;
    
    // Handle code blocks if present
    if (msg.hasCode && msg.codeLanguage) {
      contentHtml = `
        <div style="margin: 8px 0;">
          <div style="background: #1E1E1E; border-radius: 8px; padding: 12px; margin: 8px 0; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 13px; line-height: 1.4; overflow-x: auto;">
            <div style="color: #CCCCCC; margin-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">${msg.codeLanguage}</div>
            <pre style="margin: 0; color: #E6E6E6;">${msg.text}</pre>
          </div>
        </div>
      `;
    }

    return `
      <div style="display: flex; gap: 16px; margin: 24px 0; align-items: flex-start;">
        ${avatar}
        <div style="flex: 1; max-width: 800px;">
          <div style="font-size: 14px; line-height: 1.6; color: ${isUser ? 'white' : '#ECECF1'};">
            ${contentHtml}
          </div>
          <div style="font-size: 11px; color: #8E8EA0; margin-top: 8px; opacity: 0.7;">
            ${msg.timestamp}
          </div>
        </div>
      </div>
    `;
  }).join('');

  const streamingIndicator = isStreaming ? `
    <div style="display: flex; gap: 16px; margin: 24px 0; align-items: flex-start;">
      <div style="width: 30px; height: 30px; border-radius: 50%; background: #10A37F; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">C</div>
      <div style="flex: 1; max-width: 800px;">
        <div style="display: flex; align-items: center; gap: 8px; color: #ECECF1;">
          <div style="width: 4px; height: 4px; background: #10A37F; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
          <div style="width: 4px; height: 4px; background: #10A37F; border-radius: 50%; animation: pulse 1.5s infinite 0.2s;"></div>
          <div style="width: 4px; height: 4px; background: #10A37F; border-radius: 50%; animation: pulse 1.5s infinite 0.4s;"></div>
        </div>
      </div>
    </div>
  ` : '';

  return `
    <div class="template-chatgpt" data-theme="dark" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #343541; min-height: 100%; color: white;">
      <!-- Header -->
      <div style="background: #202123; padding: 16px; border-bottom: 1px solid #4A4B53; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 32px; height: 32px; background: #10A37F; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">C</div>
          <div>
            <div style="font-weight: 600; font-size: 16px;">ChatGPT</div>
            <div style="font-size: 12px; color: #8E8EA0;">${model}</div>
          </div>
        </div>
        <div style="display: flex; gap: 16px; color: #8E8EA0;">
          <span style="font-size: 18px;">📝</span>
          <span style="font-size: 18px;">⚙️</span>
          <span style="font-size: 18px;">⋮</span>
        </div>
      </div>

      <!-- Chat Area -->
      <div style="padding: 24px; background: #343541; min-height: 400px;">
        ${messagesHtml}
        ${streamingIndicator}
      </div>

      <!-- Input Area -->
      <div style="background: #343541; padding: 24px; border-top: 1px solid #4A4B53;">
        <div style="background: #40414F; border: 1px solid #565869; border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 18px; color: #8E8EA0;">📎</span>
          <textarea placeholder="Message ChatGPT..." style="border: none; outline: none; background: transparent; color: white; flex: 1; font-size: 14px; resize: none; min-height: 20px; font-family: inherit;" readonly></textarea>
          <span style="font-size: 18px; color: #10A37F; cursor: pointer;">📤</span>
        </div>
        <div style="font-size: 11px; color: #8E8EA0; text-align: center; margin-top: 8px;">
          ChatGPT can make mistakes. Consider checking important information.
        </div>
      </div>

      <style>
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      </style>
    </div>
  `;
}
