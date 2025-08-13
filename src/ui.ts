export function setupUI(app: any): void {
  console.log('Setting up UI...');
  
  // Get all form elements
  const elements = {
    tag: document.getElementById('tag') as HTMLInputElement,
    template: document.getElementById('template') as HTMLSelectElement,
    text: document.getElementById('text') as HTMLTextAreaElement,
    theme: document.getElementById('theme') as HTMLSelectElement,
    bg: document.getElementById('bg') as HTMLInputElement,
    name: document.getElementById('name') as HTMLInputElement,
    handle: document.getElementById('handle') as HTMLInputElement,
    avatar: document.getElementById('avatar') as HTMLInputElement,
    likes: document.getElementById('likes') as HTMLInputElement,
    reposts: document.getElementById('reposts') as HTMLInputElement,
    replies: document.getElementById('replies') as HTMLInputElement,
    time: document.getElementById('time') as HTMLInputElement,
    headline: document.getElementById('headline') as HTMLInputElement,
    chatName: document.getElementById('chat-name') as HTMLInputElement,
    chatAvatar: document.getElementById('chat-avatar') as HTMLInputElement,
    popupTitle: document.getElementById('popup-title') as HTMLInputElement,
    buttons: document.getElementById('buttons') as HTMLInputElement,
    // WhatsApp fields
    whatsappContact: document.getElementById('whatsapp-contact') as HTMLInputElement,
    whatsappMessages: document.getElementById('whatsapp-messages') as HTMLTextAreaElement,
    whatsappLastSeen: document.getElementById('whatsapp-last-seen') as HTMLInputElement,
    whatsappIsOnline: document.getElementById('whatsapp-online') as HTMLSelectElement,
    // Messenger fields
    messengerContact: document.getElementById('messenger-contact') as HTMLInputElement,
    messengerMessages: document.getElementById('messenger-messages') as HTMLTextAreaElement,
    messengerIsTyping: document.getElementById('messenger-typing') as HTMLSelectElement,
    messengerIsOnline: document.getElementById('messenger-online') as HTMLSelectElement,
    // ChatGPT fields
    chatgptMessages: document.getElementById('chatgpt-messages') as HTMLTextAreaElement,
    chatgptModel: document.getElementById('chatgpt-model') as HTMLSelectElement,
    chatgptIsStreaming: document.getElementById('chatgpt-streaming') as HTMLSelectElement,
    og: document.getElementById('og') as HTMLInputElement,
    width: document.getElementById('width') as HTMLInputElement,
    height: document.getElementById('height') as HTMLInputElement
  };

  // Get action buttons
  const generateBtn = document.getElementById('generate') as HTMLButtonElement;
  const exportPngBtn = document.getElementById('export-png') as HTMLButtonElement;
  const exportActualBtn = document.getElementById('export-actual') as HTMLButtonElement;
  const exportTransparentBtn = document.getElementById('export-transparent') as HTMLButtonElement;
  const copyLinkBtn = document.getElementById('copy-link') as HTMLButtonElement;

  // Check if all required elements exist
  if (!generateBtn || !exportPngBtn || !exportTransparentBtn || !copyLinkBtn) {
    console.error('Required buttons not found');
    return;
  }

  // Setup input event listeners
  Object.entries(elements).forEach(([key, element]) => {
    if (element) {
      element.addEventListener('input', () => {
        const value = element.type === 'number' ? parseInt(element.value) || 0 : element.value;
        app.updateState({ [key]: value });
      });
    }
  });

  // Template change handler
  if (elements.template) {
    elements.template.addEventListener('change', () => {
      app.updateState({ template: elements.template.value as any });
      updateTemplateFieldsVisibility();
    });
  }

  // Action button handlers
  generateBtn.addEventListener('click', () => {
    console.log('Generate button clicked!');
    app.generatePreview();
  });

  exportPngBtn.addEventListener('click', () => {
    app.exportPNGHighQuality(false);
  });

  exportActualBtn.addEventListener('click', () => {
    app.exportPNG(false);
  });

  exportTransparentBtn.addEventListener('click', () => {
    app.exportPNGHighQuality(true);
  });

  copyLinkBtn.addEventListener('click', () => {
    app.copyLink();
  });

  // Update template fields visibility based on selected template
  function updateTemplateFieldsVisibility(): void {
    const template = elements.template.value;
    const templateFields = {
      xpost: document.getElementById('xpost-fields'),
      banner: document.getElementById('banner-fields'),
      chat: document.getElementById('chat-fields'),
      popup: document.getElementById('popup-fields'),
      whatsapp: document.getElementById('whatsapp-fields'),
      messenger: document.getElementById('messenger-fields'),
      chatgpt: document.getElementById('chatgpt-fields')
    };

    Object.entries(templateFields).forEach(([templateName, element]) => {
      if (element) {
        element.style.display = templateName === template ? 'block' : 'none';
      }
    });
  }

  // Initial template fields visibility
  updateTemplateFieldsVisibility();

  // Add some helpful keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      app.generatePreview();
    }
    
    // Ctrl/Cmd + S to export PNG
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      app.exportPNG(false);
    }
  });

  // Auto-save to localStorage every few seconds
  setInterval(() => {
    const state = app.getState();
    localStorage.setItem('tagshot-state', JSON.stringify(state));
  }, 3000);

  // Load from localStorage on page load
  const savedState = localStorage.getItem('tagshot-state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      app.updateState(parsed);
    } catch (error) {
      console.log('Failed to load saved state:', error);
    }
  }
}
