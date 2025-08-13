export { renderXPost, type XPostData } from './xpost';
export { renderBanner, type BannerData } from './banner';
export { renderChat, type ChatData } from './chat';
export { renderPopup, type PopupData } from './popup';
export { renderWhatsApp, type WhatsAppData } from './whatsapp';
export { renderMessenger, type MessengerData } from './messenger';
export { renderChatGPT, type ChatGPTData } from './chatgpt';

export type TemplateType = 'xpost' | 'banner' | 'chat' | 'popup' | 'whatsapp' | 'messenger' | 'chatgpt';

export interface BaseTemplateData {
  tag: string;
  text: string;
  theme: 'light' | 'dark';
}
