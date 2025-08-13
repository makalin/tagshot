import { 
  renderXPost, 
  renderBanner, 
  renderChat, 
  renderPopup,
  renderWhatsApp,
  renderMessenger,
  renderChatGPT,
  type TemplateType 
} from './templates';
import { setupUI } from './ui';
import { exportToPNG } from './exporter';
import './styles/base.css';
import './styles/themes.css';

// Debug imports
console.log('Template functions imported:', {
  renderXPost: typeof renderXPost,
  renderBanner: typeof renderBanner,
  renderChat: typeof renderChat,
  renderPopup: typeof renderPopup
});

// Application state
interface AppState {
  tag: string;
  template: TemplateType;
  text: string;
  theme: 'light' | 'dark';
  bg: string;
  name: string;
  handle: string;
  avatar: string;
  likes: string;
  reposts: string;
  replies: string;
  time: string;
  headline: string;
  chatName: string;
  chatAvatar: string;
  popupTitle: string;
  buttons: string;
  // WhatsApp fields
  whatsappContact: string;
  whatsappMessages: string;
  whatsappLastSeen: string;
  whatsappIsOnline: boolean;
  // Messenger fields
  messengerContact: string;
  messengerMessages: string;
  messengerIsTyping: boolean;
  messengerIsOnline: boolean;
  // ChatGPT fields
  chatgptMessages: string;
  chatgptModel: string;
  chatgptIsStreaming: boolean;
  og: string;
  width: number;
  height: number;
}

const initialState: AppState = {
  tag: '#BREAKING',
  template: 'xpost',
  text: 'We turned tags into screenshots. Open source!',
  theme: 'light',
  bg: '#ffffff',
  name: 'Elon Musk',
  handle: 'elonmusk',
  avatar: '',
  likes: '124k',
  reposts: '31k',
  replies: '9,102',
  time: '2:34 PM · Aug 13, 2025',
  headline: 'Massive latency drop across the fleet',
  chatName: 'John Doe',
  chatAvatar: '',
  popupTitle: 'System Alert',
  buttons: 'OK|Cancel',
  // WhatsApp defaults
  whatsappContact: 'John Doe',
  whatsappMessages: 'Hey there!|How are you?|I\'m doing great, thanks!',
  whatsappLastSeen: '2 minutes ago',
  whatsappIsOnline: true,
  // Messenger defaults
  messengerContact: 'Jane Smith',
  messengerMessages: 'Hi!|Hello there!|How\'s it going?',
  messengerIsTyping: false,
  messengerIsOnline: true,
  // ChatGPT defaults
  chatgptMessages: 'Hello, how can I help you today?|I can assist with coding, writing, and more!',
  chatgptModel: 'GPT-4',
  chatgptIsStreaming: false,
  og: '',
  width: 1080,
  height: 1350
};

class TagShotApp {
  private state: AppState;
  public previewElement: HTMLElement;

  constructor() {
    this.state = { ...initialState };
    this.previewElement = document.getElementById('preview') as HTMLElement;
    
    // Debug: Check where the preview element is found
    if (this.previewElement) {
      console.log('🎯 Preview element found in constructor:', this.previewElement);
      console.log('🎯 Preview element parent:', this.previewElement.parentElement);
      console.log('🎯 Preview element position:', this.previewElement.offsetTop, this.previewElement.offsetLeft);
    } else {
      console.error('❌ Preview element not found in constructor!');
    }
  }

  public init(): void {
    console.log('Initializing TagShot app...');
    

    
    // Load state from URL params
    this.loadStateFromURL();
    
    // Setup UI event handlers
    setupUI(this);
    
    // Apply theme
    this.applyTheme();
    
    // Generate initial preview
    this.generatePreview();
    
    console.log('TagShot app initialized successfully');
  }

  public getState(): AppState {
    return { ...this.state };
  }

  public updateState(updates: Partial<AppState>): void {
    // Handle boolean conversions for select elements
    const processedUpdates = { ...updates };
    if ('whatsappIsOnline' in processedUpdates && typeof processedUpdates.whatsappIsOnline === 'string') {
      processedUpdates.whatsappIsOnline = processedUpdates.whatsappIsOnline === 'true';
    }
    if ('messengerIsTyping' in processedUpdates && typeof processedUpdates.messengerIsTyping === 'string') {
      processedUpdates.messengerIsTyping = processedUpdates.messengerIsTyping === 'true';
    }
    if ('messengerIsOnline' in processedUpdates && typeof processedUpdates.messengerIsOnline === 'string') {
      processedUpdates.messengerIsOnline = processedUpdates.messengerIsOnline === 'true';
    }
    if ('chatgptIsStreaming' in processedUpdates && typeof processedUpdates.chatgptIsStreaming === 'string') {
      processedUpdates.chatgptIsStreaming = processedUpdates.chatgptIsStreaming === 'true';
    }
    
    this.state = { ...this.state, ...processedUpdates };
    this.applyTheme();
    this.generatePreview();
    this.updateURL();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  public generatePreview(): void {
    console.log('Generating preview...', this.state);
    

    
    // Simple test first
    if (!this.previewElement) {
      console.error('Preview element not found!');
      return;
    }
    
    console.log('🎯 Preview element found:', this.previewElement);
    console.log('🎯 Preview element ID:', this.previewElement.id);
    console.log('🎯 Preview element innerHTML before:', this.previewElement.innerHTML);
    
    // Test CSS loading
    const testStyle = getComputedStyle(document.documentElement);
    console.log('CSS variables loaded:', {
      '--bg-primary': testStyle.getPropertyValue('--bg-primary'),
      '--text-primary': testStyle.getPropertyValue('--text-primary')
    });
    
    // Test template functions directly
    console.log('Testing template functions...');
    try {
      const testXPost = renderXPost({
        tag: '#TEST',
        text: 'Test message',
        name: 'Test User',
        handle: 'testuser',
        theme: 'light'
      });
      console.log('XPost template test result:', testXPost.substring(0, 100) + '...');
    } catch (error) {
      console.error('XPost template test failed:', error);
    }
    
    // Generate preview using the selected template
    let html = '';
    
    switch (this.state.template) {
      case 'xpost':
        html = renderXPost({
          tag: this.state.tag,
          text: this.state.text,
          name: this.state.name,
          handle: this.state.handle,
          avatar: this.state.avatar,
          likes: this.state.likes,
          reposts: this.state.reposts,
          replies: this.state.replies,
          time: this.state.time,
          theme: this.state.theme
        });
        break;
        
      case 'banner':
        html = renderBanner({
          tag: this.state.tag,
          text: this.state.text,
          headline: this.state.headline,
          time: this.state.time,
          theme: this.state.theme
        });
        break;
        
      case 'chat':
        html = renderChat({
          tag: this.state.tag,
          text: this.state.text,
          name: this.state.chatName,
          avatar: this.state.chatAvatar,
          time: this.state.time,
          theme: this.state.theme
        });
        break;
        
      case 'popup':
        html = renderPopup({
          tag: this.state.tag,
          text: this.state.text,
          title: this.state.popupTitle,
          buttons: this.state.buttons,
          theme: this.state.theme
        });
        break;
        
      case 'whatsapp':
        const whatsappMessages = this.state.whatsappMessages.split('|').map((msg, index) => ({
          text: msg.trim(),
          isFromMe: index % 2 === 0,
          time: this.state.time,
          status: index % 2 === 0 ? 'read' as const : undefined
        }));
        html = renderWhatsApp({
          contactName: this.state.whatsappContact,
          contactAvatar: this.state.avatar,
          messages: whatsappMessages,
          lastSeen: this.state.whatsappLastSeen,
          isOnline: this.state.whatsappIsOnline
        });
        break;
        
      case 'messenger':
        const messengerMessages = this.state.messengerMessages.split('|').map((msg, index) => ({
          text: msg.trim(),
          isFromMe: index % 2 === 0,
          time: this.state.time,
          senderName: index % 2 === 0 ? undefined : this.state.messengerContact
        }));
        html = renderMessenger({
          contactName: this.state.messengerContact,
          contactAvatar: this.state.avatar,
          messages: messengerMessages,
          isTyping: this.state.messengerIsTyping,
          isOnline: this.state.messengerIsOnline
        });
        break;
        
      case 'chatgpt':
        const chatgptMessages = this.state.chatgptMessages.split('|').map((msg, index) => ({
          text: msg.trim(),
          isFromUser: index % 2 === 0,
          timestamp: this.state.time,
          hasCode: msg.includes('code') || msg.includes('function'),
          codeLanguage: msg.includes('code') ? 'javascript' : undefined
        }));
        html = renderChatGPT({
          messages: chatgptMessages,
          model: this.state.chatgptModel,
          isStreaming: this.state.chatgptIsStreaming
        });
        break;
    }
    
    // Create a draggable floating preview window
    this.createDraggablePreview(html);
    
    console.log('Preview generated successfully');
  }
  
  private createDraggablePreview(html: string): void {
    // Remove any existing draggable preview
    const existingPreview = document.getElementById('draggable-preview');
    let savedPosition = { x: 0, y: 0, width: 400, height: 600 };
    
    if (existingPreview) {
      // Save current position and size before removing
      const transform = existingPreview.style.transform;
      const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
      if (match) {
        savedPosition.x = parseFloat(match[1]);
        savedPosition.y = parseFloat(match[2]);
      }
      savedPosition.width = existingPreview.offsetWidth;
      savedPosition.height = existingPreview.offsetHeight;
      existingPreview.remove();
    } else {
      // Try to load saved size from localStorage if no existing preview
      try {
        const savedSize = localStorage.getItem('tagshot-preview-size');
        if (savedSize) {
          const size = JSON.parse(savedSize);
          savedPosition.width = size.width;
          savedPosition.height = size.height;
        }
      } catch (e) {
        console.log('No saved size found');
      }
    }
    
    // Create the draggable preview container
    const previewContainer = document.createElement('div');
    previewContainer.id = 'draggable-preview';
    previewContainer.style.cssText = `
      position: fixed;
      top: 100px;
      right: 50px;
      width: ${savedPosition.width}px;
      height: ${savedPosition.height}px;
      background: white;
      border: 2px solid #1da1f2;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      cursor: move;
      overflow: hidden;
    `;
    
    // Apply saved position if it exists
    if (savedPosition.x !== 0 || savedPosition.y !== 0) {
      previewContainer.style.transform = `translate(${savedPosition.x}px, ${savedPosition.y}px)`;
    } else {
      // Try to load from localStorage if no saved position
      try {
        const savedPos = localStorage.getItem('tagshot-preview-position');
        if (savedPos) {
          const pos = JSON.parse(savedPos);
          previewContainer.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        }
      } catch (e) {
        console.log('No saved position found');
      }
    }
    
    // Create the header with drag handle
    const header = document.createElement('div');
    header.style.cssText = `
      background: #1da1f2;
      color: white;
      padding: 10px 15px;
      font-weight: 600;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
    `;
    header.innerHTML = `
      <span>🎯 Preview</span>
      <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">×</button>
    `;
    
    // Create the content area
    const content = document.createElement('div');
    content.style.cssText = `
      padding: 20px;
      height: calc(100% - 60px);
      overflow-y: auto;
      box-sizing: border-box;
    `;
    content.innerHTML = html;
    
    // Add header and content to container
    previewContainer.appendChild(header);
    previewContainer.appendChild(content);
    
    // Add to page
    document.body.appendChild(previewContainer);
    
    // Make it draggable
    this.makeDraggable(previewContainer, header);
    
    // Make it resizable
    this.makeResizable(previewContainer);
  }
  
  private makeDraggable(element: HTMLElement, handle: HTMLElement): void {
    let isDragging = false;
    let currentX: number;
    let currentY: number;
    let initialX: number;
    let initialY: number;
    let xOffset = 0;
    let yOffset = 0;
    
    const dragStart = (e: MouseEvent) => {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      
      if (e.target === handle || handle.contains(e.target as Node)) {
        isDragging = true;
      }
    };
    
    const dragEnd = () => {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
      
      // Save position to localStorage for persistence
      const position = { x: currentX, y: currentY };
      localStorage.setItem('tagshot-preview-position', JSON.stringify(position));
    };
    
    const drag = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
    };
    
    handle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
  }
  
  private makeResizable(element: HTMLElement): void {
    const resizer = document.createElement('div');
    resizer.style.cssText = `
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      background: linear-gradient(-45deg, transparent 30%, #ccc 30%, #ccc 70%, transparent 70%);
      z-index: 10001;
    `;
    
    let isResizing = false;
    let startX: number, startY: number, startWidth: number, startHeight: number;
    
    const startResize = (e: MouseEvent) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = element.offsetWidth;
      startHeight = element.offsetHeight;
      e.preventDefault();
      e.stopPropagation();
    };
    
    const resize = (e: MouseEvent) => {
      if (!isResizing) return;
      
      e.preventDefault();
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newWidth = Math.max(200, startWidth + deltaX);
      const newHeight = Math.max(200, startHeight + deltaY);
      
      element.style.width = newWidth + 'px';
      element.style.height = newHeight + 'px';
      
      // Update the content area height to match
      const content = element.querySelector('div:last-child') as HTMLElement;
      if (content) {
        content.style.maxHeight = (newHeight - 60) + 'px'; // Subtract header height
      }
    };
    
    const stopResize = () => {
      if (!isResizing) return;
      isResizing = false;
      
      // Save size to localStorage for persistence
      const size = { width: element.offsetWidth, height: element.offsetHeight };
      localStorage.setItem('tagshot-preview-size', JSON.stringify(size));
    };
    
    resizer.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    
    element.appendChild(resizer);
  }

  public async exportPNG(transparent: boolean = false): Promise<void> {
    const draggablePreview = document.getElementById('draggable-preview');
    if (!draggablePreview) {
      alert('Generate a preview first!');
      return;
    }

    try {
      // Find the content area (the div after the header)
      const contentArea = draggablePreview.querySelector('div:last-child') as HTMLElement;
      if (!contentArea) {
        alert('Content not found for export');
        return;
      }

      // Export only the content area without the preview window frame
      await exportToPNG(contentArea, {
        width: contentArea.offsetWidth,
        height: contentArea.offsetHeight,
        backgroundColor: transparent ? undefined : this.state.bg
      });
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  }

  public async exportPNGHighQuality(transparent: boolean = false): Promise<void> {
    const draggablePreview = document.getElementById('draggable-preview');
    if (!draggablePreview) {
      alert('Generate a preview first!');
      return;
    }

    try {
      // Find the content area (the div after the header)
      const contentArea = draggablePreview.querySelector('div:last-child') as HTMLElement;
      if (!contentArea) {
        alert('Content not found for export');
        return;
      }

      // Export only the content area at custom dimensions
      await exportToPNG(contentArea, {
        width: this.state.width,
        height: this.state.height,
        backgroundColor: transparent ? undefined : this.state.bg
      });
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  }

  public copyLink(): void {
    const draggablePreview = document.getElementById('draggable-preview');
    if (!draggablePreview) {
      alert('Generate a preview first!');
      return;
    }
    
    const url = this.buildURL();
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    });
  }

  private buildURL(): string {
    const params = new URLSearchParams();
    
    if (this.state.tag) params.set('t', this.state.tag);
    if (this.state.template) params.set('template', this.state.template);
    if (this.state.text) params.set('text', this.state.text);
    if (this.state.theme) params.set('theme', this.state.theme);
    if (this.state.bg !== '#ffffff') params.set('bg', this.state.bg);
    if (this.state.name) params.set('name', this.state.name);
    if (this.state.handle) params.set('handle', this.state.handle);
    if (this.state.avatar) params.set('avatar', this.state.avatar);
    if (this.state.likes) params.set('likes', this.state.likes);
    if (this.state.reposts) params.set('reposts', this.state.reposts);
    if (this.state.replies) params.set('replies', this.state.replies);
    if (this.state.time) params.set('time', this.state.time);
    if (this.state.headline) params.set('headline', this.state.headline);
    if (this.state.chatName) params.set('chatName', this.state.chatName);
    if (this.state.chatAvatar) params.set('chatAvatar', this.state.chatAvatar);
    if (this.state.popupTitle) params.set('popupTitle', this.state.popupTitle);
    if (this.state.buttons) params.set('buttons', this.state.buttons);
    if (this.state.og) params.set('og', this.state.og);
    if (this.state.width !== 1080) params.set('w', this.state.width.toString());
    if (this.state.height !== 1350) params.set('h', this.state.height.toString());

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }

  private updateURL(): void {
    const url = this.buildURL();
    window.history.replaceState({}, '', url);
  }

  private loadStateFromURL(): void {
    const params = new URLSearchParams(window.location.search);
    
    const updates: Partial<AppState> = {};
    
    if (params.has('t')) updates.tag = params.get('t')!;
    if (params.has('template')) updates.template = params.get('template') as TemplateType;
    if (params.has('text')) updates.text = params.get('text')!;
    if (params.has('theme')) updates.theme = params.get('theme') as 'light' | 'dark';
    if (params.has('bg')) updates.bg = params.get('bg')!;
    if (params.has('name')) updates.name = params.get('name')!;
    if (params.has('handle')) updates.handle = params.get('handle')!;
    if (params.has('avatar')) updates.avatar = params.get('avatar')!;
    if (params.has('likes')) updates.likes = params.get('likes')!;
    if (params.has('reposts')) updates.reposts = params.get('reposts')!;
    if (params.has('replies')) updates.replies = params.get('replies')!;
    if (params.has('time')) updates.time = params.get('time')!;
    if (params.has('headline')) updates.headline = params.get('headline')!;
    if (params.has('chatName')) updates.chatName = params.get('chatName')!;
    if (params.has('chatAvatar')) updates.chatAvatar = params.get('chatAvatar')!;
    if (params.has('popupTitle')) updates.popupTitle = params.get('popupTitle')!;
    if (params.has('buttons')) updates.buttons = params.get('buttons')!;
    if (params.has('og')) updates.og = params.get('og')!;
    if (params.has('w')) updates.width = parseInt(params.get('w')!);
    if (params.has('h')) updates.height = parseInt(params.get('h')!);

    if (Object.keys(updates).length > 0) {
      this.state = { ...this.state, ...updates };
      
      // Update UI elements
      this.updateUIFromState();
      
      // Try to fetch Open Graph data if provided
      if (updates.og) {
        this.fetchOpenGraphData(updates.og);
      }
    }
  }

  private updateUIFromState(): void {
    // Update form fields
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
      og: document.getElementById('og') as HTMLInputElement,
      width: document.getElementById('width') as HTMLInputElement,
      height: document.getElementById('height') as HTMLInputElement
    };

    // Update each field
    Object.entries(elements).forEach(([key, element]) => {
      if (element && this.state[key as keyof AppState] !== undefined) {
        element.value = this.state[key as keyof AppState] as string;
      }
    });

    // Update template-specific field visibility
    this.updateTemplateFields();
  }

  private updateTemplateFields(): void {
    const templateFields = {
      xpost: document.getElementById('xpost-fields'),
      banner: document.getElementById('banner-fields'),
      chat: document.getElementById('chat-fields'),
      popup: document.getElementById('popup-fields')
    };

    Object.entries(templateFields).forEach(([template, element]) => {
      if (element) {
        element.style.display = template === this.state.template ? 'block' : 'none';
      }
    });
  }

  private async fetchOpenGraphData(url: string): Promise<void> {
    try {
      // This is a best-effort attempt - many sites block CORS
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.contents) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                    doc.querySelector('title')?.textContent;
        
        const description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                          doc.querySelector('meta[name="description"]')?.getAttribute('content');
        
        if (title) {
          this.updateState({ text: title });
          const textElement = document.getElementById('text') as HTMLTextAreaElement;
          if (textElement) textElement.value = title;
        }
        
        if (description) {
          // Could use description for other fields if needed
          console.log('OG Description:', description);
        }
      }
    } catch (error) {
      console.log('Open Graph fetch failed (this is normal for many sites):', error);
    }
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new TagShotApp();
  
  // Make sure the preview element exists before initializing
  if (app.previewElement) {
    app.init();
  }
  
  // Make app globally accessible for testing
  (window as any).tagShotApp = app;
});
