# TagShot 🎯

**Turn your text + tags into polished, shareable fake screen images**

A powerful Vite + TypeScript meme toolkit that creates realistic screenshots of social media posts, chat conversations, and more.

## ✨ Features

- **7 Template Types**: X/Tweet, News Banner, Chat Bubble, System Popup, WhatsApp, Facebook Messenger, ChatGPT
- **Draggable Preview System**: Move and resize preview windows anywhere on screen
- **Smart Position Memory**: Preview windows remember their position and size across sessions
- **Advanced Export Options**: PNG export at actual size, high quality, or with transparency
- **Content-Only Export**: Export just the template content without UI elements
- **Theme Support**: Light and dark themes with automatic switching
- **URL State Management**: All settings automatically saved in URL for easy sharing
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Preview**: Instant preview generation with live updates

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/makalin/tagshot.git
cd tagshot

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### GitHub Pages Deployment

1. **Push to GitHub**: Your project will automatically deploy to GitHub Pages
2. **Enable Pages**: Go to Settings > Pages in your repository
3. **Source**: Select "GitHub Actions" as the source
4. **Access**: Your app will be available at `https://yourusername.github.io/tagshot`

## 🎨 Templates

### X/Tweet Post
Create realistic X (Twitter) posts with:
- Profile name, handle, avatar
- Post content and hashtags
- Engagement metrics (likes, reposts, replies)
- Timestamps

### WhatsApp Chat
Authentic WhatsApp conversations with:
- Contact information and online/offline status
- Message bubbles with timestamps and read receipts
- Typing indicators and last seen timestamps
- WhatsApp Web interface styling with green theme
- Message status indicators (✓, ✓✓, ✓✓✓)

### Facebook Messenger
Facebook Messenger chats featuring:
- Contact details and online/offline status
- Message bubbles with sender names and timestamps
- Animated typing indicators with bouncing dots
- Messenger's signature blue theme (#1877F2)
- Professional chat interface styling

### ChatGPT Screen
AI chat interface with:
- User and AI message distinction with avatars
- Code block support with syntax highlighting
- Model selection (GPT-4, GPT-3.5, Claude)
- Streaming indicators with animated dots
- Dark theme matching the real ChatGPT interface

### News Banner
Breaking news style banners with:
- Headlines and content
- Timestamps
- Professional news styling

### Chat Bubble
Simple chat interface with:
- User avatars and names
- Message bubbles
- Timestamps

### System Popup
Operating system alerts with:
- Custom titles and messages
- Button configurations
- System-style appearance

## 🛠️ Usage

1. **Select Template**: Choose from 7 available templates
2. **Fill Details**: Enter text, names, timestamps, etc.
3. **Generate Preview**: Click "Generate Preview" to see your creation
4. **Position Preview**: Drag the preview window anywhere on screen
5. **Export**: Choose your preferred export option:
   - **Export PNG (Actual Size)**: Current preview size
   - **Export PNG (High Quality)**: Custom dimensions (1080x1350)
   - **Export PNG (Transparent)**: High quality with transparency

## 🎯 Draggable Preview System

### **Smart Positioning**
- **Drag anywhere**: Click and drag the blue header to move the preview
- **Resize freely**: Drag the bottom-right corner to resize
- **Position memory**: Preview remembers where you put it
- **Size persistence**: Window size saved across sessions

### **Preview Controls**
- **Move**: Drag the blue header bar
- **Resize**: Drag the bottom-right corner
- **Close**: Click the × button
- **Always on top**: High z-index ensures visibility

### **Export Features**
- **Content-only export**: No UI elements in final images
- **Clean output**: Just your template content
- **Professional quality**: Perfect for sharing and design work
- **Multiple formats**: Actual size, high quality, and transparent options
- **Smart sizing**: Automatic dimension detection and custom sizing

## 🔧 Configuration

### Custom Dimensions
Set custom export dimensions in the form:
- **Width**: 100-4000 pixels
- **Height**: 100-4000 pixels

### Themes
- **Light**: Clean, bright appearance
- **Dark**: Modern, dark mode styling

### URL Parameters
All settings are automatically saved in the URL for easy sharing:
- Template selection
- Text content
- Theme preferences
- Custom dimensions

## 🚀 Deployment

### GitHub Pages (Automatic)
The project includes GitHub Actions for automatic deployment:

```yaml
# .github/workflows/pages.yml
name: Deploy TagShot to Pages
on:
  push:
    branches: [ main ]
```

### Manual Deployment
For other hosting platforms:

```bash
# Build the project
npm run build

# Deploy the 'dist' folder
# The built files are in the dist/ directory
```

## 🛠️ Tech Stack

- **Frontend**: Vite + TypeScript
- **Styling**: CSS with CSS Variables
- **Export**: html2canvas for PNG generation
- **Deployment**: GitHub Actions + GitHub Pages
- **Browser Support**: Modern browsers with ES6+ support

## 📁 Project Structure

```
tagshot/
├── src/
│   ├── templates/          # Template renderers (7 templates)
│   │   ├── xpost.ts       # X/Tweet post template
│   │   ├── banner.ts      # News banner template
│   │   ├── chat.ts        # Chat bubble template
│   │   ├── popup.ts       # System popup template
│   │   ├── whatsapp.ts    # WhatsApp chat template
│   │   ├── messenger.ts   # Facebook Messenger template
│   │   └── chatgpt.ts     # ChatGPT screen template
│   ├── styles/            # CSS styles and themes
│   ├── main.ts            # Main application logic with draggable preview
│   ├── ui.ts              # UI event handlers and form management
│   └── exporter.ts        # PNG export functionality
├── public/                # Static assets and favicon
├── .github/workflows/     # GitHub Actions for deployment
├── index.html             # Main HTML file with all template fields
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration for GitHub Pages
├── tsconfig.json          # TypeScript configuration
├── README.md              # Comprehensive project documentation
└── DEPLOYMENT.md          # Detailed deployment guide
```

## 🔑 Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Generate preview
- **Ctrl/Cmd + S**: Save current state

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Ask questions and share ideas
- **Wiki**: Check the project wiki for detailed guides

## 🐛 Troubleshooting

### **Preview Not Showing**
- Ensure you've clicked "Generate Preview"
- Check browser console for errors
- Try refreshing the page

### **Export Issues**
- Generate a preview first before exporting
- Check that the preview window is visible
- Try different export options (Actual Size vs High Quality)

### **Template Fields Not Visible**
- Select a template from the dropdown
- Template-specific fields appear automatically
- Check that the template selection is working

### **Position Memory Issues**
- Preview position is saved automatically
- Try refreshing the page to restore position
- Check browser localStorage support

## 🎯 Roadmap

- [ ] More social media templates (Instagram, LinkedIn, TikTok)
- [ ] Video export support
- [ ] Custom template builder
- [ ] Batch export functionality
- [ ] Advanced styling options
- [ ] Template marketplace

## 🆕 Latest Updates

### **v2.0 - Draggable Preview System**
- ✨ **Draggable preview windows** with position memory
- 🎯 **Smart resizing** with size persistence
- 📱 **Content-only exports** for professional results
- 🔄 **Real-time preview updates** with instant generation

### **v1.5 - New Messaging Templates**
- 📱 **WhatsApp Chat** with authentic interface
- 💬 **Facebook Messenger** with blue theme
- 🤖 **ChatGPT Screen** with dark mode
- 🎨 **Enhanced styling** for all templates

### **v1.0 - Core Features**
- 🐦 **X/Tweet Post** template
- 📰 **News Banner** template
- 💭 **Chat Bubble** template
- ⚠️ **System Popup** template
- 🌓 **Theme system** with light/dark modes

---

**Made with ❤️ by the TagShot community**

*Turn your ideas into viral content with TagShot! 🎯✨*
